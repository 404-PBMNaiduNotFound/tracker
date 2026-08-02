# DSA Striver's Companion

PROMPT: Build the Complete "120-Day Striver A2Z DSA Tracker" Application (Full Combined Spec, with Login & Cloud Sync)

ROLE

Act as three people at once while building this:

A DSA Mentor — the app must reflect how real DSA prep actually works (topic-order integrity matters, revision matters, skipping days shouldn't silently lose syllabus).

A student preparing for placements — the app must be fast to use daily (under 2 minutes to check in), usable one-handed on mobile, and never punishing (no guilt-tripping UI, just clarity).

An application developer — production-quality single-page app, persistent storage, no data loss, predictable state transitions, clean and accessible UI.

CONTEXT

I am following a 120-day roadmap (starting Aug 1) to complete Striver's A2Z DSA Sheet — 474 problems across 18 sections, in this exact order: Basics (54), Sorting Techniques (7), Arrays (40), Binary Search (32), Strings – Basic (15), Linked List (31), Recursion – Pattern-wise (25), Bit Manipulation (18), Stack & Queues (30), Sliding Window & Two Pointer (12), Heaps (17), Greedy (15), Binary Trees (38), Binary Search Trees (16), Graphs (53), Dynamic Programming (55), Tries (7), Strings – Advanced (9). Every one of these topics/sections must be represented in the seeded data — do not omit any.

CORE DATA MODEL

Build around a Day object:

Day {
  id, dayNumber, date (mutable — recalculated on reschedule),
  topic, subtopics[],
  problems: [{ name, difficulty, platform, link, takeUForwardLink, estTime, done: bool, isHard: bool }],
  checklist: [{ label, done: bool }],
  status: "pending" | "in_progress" | "completed" | "postponed" | "merged" | "revision",
  notes, revisionNotes,
  aiExplainer: { summary, keyPoints[], hardProblemInsights[], generatedAt, cached: bool },
  chatThread: [{ role: "user" | "ai", message, timestamp }],
  weekNumber (derived),
}


Maintain this as an ordered, dynamically extendable array of Day objects (starts at 120 days but can grow — see Revision Day insertion below). The core invariant: topic sequence and full 474-problem set always stay intact and in order; dates are derived labels on top of the fixed sequence, never the source of truth.

PART A — CORE TRACKER FEATURES (must all be present)

A1. Daily Checklist & Progress Tracking

Today's view shows: topic, subtopics, full problem list with checkboxes, a completion checklist (watch video, read notes, understand brute force, derive better approach, code, optimize, dry run, submit, read editorial, revise yesterday, push to GitHub, update notes), and a progress bar (X/Y problems done, %).

Checking/unchecking persists immediately — no save button.

Partial completion is a valid, clearly shown state (e.g. "3/6 done").

A2. "What's Left" / Backlog View

One screen showing everything incomplete today plus a rolling backlog of incomplete items from past days — nothing silently disappears.

A3. Postpone / Reschedule (with cascade)

"Postpone today's task" moves an incomplete Day to a new date (default next day, or a custom chosen date).

Cascade rule: every subsequent day shifts forward by the same gap automatically — topic order preserved, only dates move. Show a preview ("This pushes 119 remaining days forward by 1 day, new end date: [date]") before committing.

A4. Merge Tomorrow into Today

"I finished early — pull in tomorrow's topic" merges tomorrow's Day content into today's (today becomes a combined day).

Every day after that collapses forward by one day (dates shift earlier, total plan shortens by one day). Show a confirmation preview before applying.

A5. Delete

Delete a single problem from a day, delete a whole day (choice: shrink schedule by 1 day and shift everything after it forward, OR keep an empty placeholder date), or reset all progress (hard confirmation, e.g. type "DELETE").

A6. Topic-Wise View

Grouped by the 18 sections, each showing total problems, completed count, progress bar, and which days map to it. Expandable to show every day/problem inside.

A7. Week-Wise View

Grouped by week number (Week 1 = Days 1–7, etc.), each day shown with a status indicator (✅ done / ⏳ pending / ⏸ postponed / 🔀 merged / 🔁 revision) and week-level progress %.

A8. Detail Drill-Down (any day, any topic, past/present/future)

Clicking any day or topic opens a detail panel: full topic breakdown, subtopics, every problem (name/difficulty/platform/both links/est. time), checklist, notes, revision reminders — viewable for any day at any time (future days read-only unless jumping ahead intentionally).

A9. Overall Progress Dashboard

Total problems done / 474, days completed / total (dynamic), current streak, days postponed, auto-recalculated projected finish date, Easy/Medium/Hard split completed.

A10. Missed-Day / Missed-Week Handling

1–3 consecutive missed/incomplete days: no special action — sits in Backlog (A2), user manages via postpone.

7+ consecutive missed days (or 7+ cumulative pending days): auto-insert a Revision Day:

Content = recap list pulled from all completed topics so far + 1–2 flagged/harder problems per completed section (capped to a normal day's load).

Inserted right after the gap; every later day cascades forward by one (same logic as A3/A4). Plan length and end date extend — never delete/skip a real topic day.

Show a notification: "You missed a full week — added a Revision Day on [date], pushed remaining days forward by 1. New finish date: [date]."

Auto-check on app load (compare today vs. last-active date in storage) plus a manual "Add Revision Day Now" button.

A11. Persistence

All state (including AI explainer cache and chat threads — see Part B) survives refresh, via window.storage (persistent key-value store — not localStorage/sessionStorage). Store the Day array under one key with a schema version field for safe future migrations. Show a "last synced" indicator.

PART B — AI FEATURES (new, must appear on EVERY single day — not just Revision Days)

B1. AI Topic Explainer — on every Day's detail view

Every day (regular topic day and revision day) must have an "Explain this topic" panel with three tiers:

Quick AI Summary — via Puter.js (puter.ai.chat(...), free, no API key): a short, plain-language brief for that day's main topic — core concept (3–5 sentences), key intuition/pattern to recognize, and 2–3 must-remember points (complexity, common trick, when to use this pattern vs. another). Generate on-demand or on first view; cache per day in storage so it's not regenerated every visit; show loading state; include a manual "Regenerate" button.

Harder Problems Deep-Dive — for that day's flagged hard problems, a short AI note per problem giving the key unlocking insight/pattern (not the full solution — a nudge, not an answer key).

Ask ChatGPT Handoff — button that (a) builds a structured, copyable prompt (topic, subtopics, that day's problems, and desired explanation style: intuition / dry run / complexity / common mistakes / interview follow-ups) shown in a "Copy Prompt" box, and (b) an "Open in ChatGPT" button opening https://chat.openai.com/?q=<url-encoded-prompt> pre-filled with that prompt. Available from every day's detail view AND from the Topic-Wise view (one click = generate a section-wide explainer prompt).

B2. Live AI Chat Area — for doubts & clarifications, on every day

In addition to the static explainer above, each Day's detail view (and a global chat accessible from anywhere) must include a persistent chat box: user types a question about that topic/problem, sent to puter.ai.chat(...) with the day's topic/problems as context, response streams back in a normal chat UI (message bubbles, scrollable history).

Chat history per day is saved (chatThread in the Day object) so past Q&A isn't lost on revisit.

Include a "Clear chat" option per day, and keep the AI's answers scoped to DSA/interview-prep tone (concise, uses examples, offers complexity analysis when relevant).

Cache/store, don't auto-regenerate: chat only fires on user-sent messages, never automatically.

B3. TakeUForward Link on Every Problem

Every problem entry across the entire seeded dataset must include both: its original platform link (LeetCode/GFG/etc.) and a takeUForwardLink pointing to that problem's page/article on takeuforward.org (from the A2Z sheet). Display both links clearly on each problem row (e.g., small icon-buttons: "Solve ↗" and "TUF Article ↗"), not just one.

PART D — AUTHENTICATION & CLOUD DATABASE (multi-device sync)

D1. Login

Add a login/signup screen before the app loads: "Continue with Google" (Google OAuth) or email + password signup/login (with basic validation, password hashing on the backend, and a "forgot password" flow).

Once logged in, all data (Days array, AI explainer cache, chat threads, progress, postpone/merge/revision history) is tied to that user account, not the browser — so opening the app on a phone, laptop, or any other device and logging in with the same account restores the exact same state.

Include a simple account menu: logged-in email/name, "Log out", and "Delete my account & data" (hard confirmation).

D2. Database

Use an AI-provisioned/managed backend database (e.g. Supabase, Convex, Firebase, or an equivalent "prompt it and it creates the schema/tables itself" service) instead of manually designing and standing up a database — the goal is: describe the data model in the prompt, let the backend platform auto-create the necessary tables/collections (users, days, problems, checklist_items, ai_explainers, chat_messages, revision_events) and auth (Google + email/password) itself, with no manual DB setup step required from me.

Replace the earlier window.storage persistence approach with this real backend database once login exists — window.storage was only a placeholder for the local-artifact-only version; the production version must read/write per-user data from the cloud DB on every state change (checklist toggle, postpone, merge, delete, revision insert, AI cache, chat message), so progress is always in sync and durable across devices/sessions.

Data must load per logged-in user on app start (fetch that user's full Day array + caches from the DB), and every mutation (checklist check, postpone, merge, delete, AI regenerate, chat send) must write back to the DB immediately — no local-only state that can get lost.

Handle basic sync/loading states: "Loading your progress…" on login, and clear error/retry UI if a DB read/write fails.

D3. Update to Part A11 (Persistence)

Supersede the earlier window.storage-only persistence instruction: use the cloud database (D2) as the single source of truth once authentication is added. Local optimistic UI updates are still fine for snappy feel (Part C), but must always confirm-sync to the DB in the background, tied to the logged-in user's account.

Single-page app with clear navigation: Today | Backlog | Topic View | Week View | Progress | Ask AI.

Every destructive/cascading action (postpone, merge, delete, revision-day insert) shows a clear preview of consequences before confirming.

Accessibility: proper semantic HTML, sufficient color contrast (WCAG AA minimum), keyboard-navigable (tab order, focus states visible), aria-labels on icon-only buttons, readable font sizes, no color-only status indicators (pair icons/text with color).

Responsive & mobile-first: must work cleanly on phone (primary daily-use device) and desktop — collapsible nav on small screens, touch-friendly tap targets.

Clean visual hierarchy: motivating but not gamified-childish — a serious prep tool. Use progress bars, subtle status colors, and a consistent design system (spacing, typography scale).

Fast perceived performance: skeleton/loading states for AI content, instant optimistic UI updates for checkbox/status toggles (don't wait on storage round-trip to reflect the click).

Graceful empty/error states (e.g., first load with no saved state auto-seeds Day 1–120 from the base roadmap; AI failures show a retry option, not a broken panel).

WHAT NOT TO DO

Don't hardcode dates as source of truth — topic sequence is the source of truth; dates are derived and recalculated.

Don't lose any problem or topic during postpone/merge/delete unless the user explicitly deleted that specific item.

Don't use browser localStorage/sessionStorage — use window.storage only.

Don't make cascading changes silently — always confirm first.

Don't let a missed week silently skip a topic — always insert a Revision Day and extend the calendar.

Don't spam AI calls — cache explanations per day/topic; only regenerate or chat on explicit user action.

Don't restrict the AI explainer to Revision Days only — it must be present on every single day.

Don't omit any of the 18 A2Z sections or shrink the 474-problem total when seeding data.

Don't store user progress only in the browser once login exists — it must be in the cloud database, tied to the user's account, so it's accessible from any device.

Don't require manual database schema setup — use an AI-provisioned backend that creates the schema/tables/auth from this prompt's description of the data model.

DELIVERABLE

A full-stack application (frontend + auth + cloud database) implementing all of Part A, Part B, Part C, and Part D together — full tracker functionality, missed-week auto-revision with calendar extension, per-day AI explainer (three tiers) on every day, a live AI chat area for doubts on every day, TakeUForward + original platform links on every problem, an accessible/polished/mobile-friendly UI, and Google or email+password login backed by an auto-provisioned cloud database so progress syncs across any device — seeded with the complete, correctly ordered 18-section / 474-problem Striver A2Z structure, starting August 1. Treat the day count as dynamically extendable, not fixed at 120.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dsapreparationtracker.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e0a6fd21-88bc-4a9f-aeef-188c749dc792).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
"# learndsa" 
