"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { useProblemCompletions } from "@/hooks/useProblemCompletions";
import {
  loadUserProfile,
  saveUserProfile,
  saveAvatarBase64,
  saveBannerBase64,
  type CodingProfiles,
  type CustomLink,
  type CompletedProblemSnapshot,
} from "@/lib/db";
import { ALL_PROBLEMS } from "@/lib/problems";
import { SubmissionHeatmap } from "@/components/SubmissionHeatmap";
import { BadgesGrid } from "@/components/BadgesGrid";
import { computeBadges, currentStreak } from "@/lib/gamification";
import { dayProgress, todayIso, formatDate } from "@/lib/plan";
import { DayDetail } from "@/components/DayDetail";
import { LeetCodeCalendarWidget } from "@/components/LeetCodeCalendarWidget";
import { CodeModal } from "@/components/CodeModal";
import {
  getInactivityDays,
  getRandomQuote,
  recordActivity,
  type MotivationalQuote,
} from "@/lib/userActivity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
  Flame,
  Globe,
  Image as ImageIcon,
  Pencil,
  Plus,
  Quote,
  RefreshCw,
  Share2,
  Sparkles,
  Trash2,
  UserCircle2,
  ListTodo,
  Calendar as CalendarIcon,
  Rocket,
  HeartHandshake,
  X,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Platform Metadata ────────────────────────────────────────────────────────
const PLATFORMS: {
  key: Exclude<keyof CodingProfiles, "customLinks">;
  label: string;
  placeholder: string;
  color: string;
  bgColor: string;
}[] = [
    {
      key: "leetcode",
      label: "LeetCode",
      placeholder: "https://leetcode.com/yourname",
      color: "#FFA116",
      bgColor: "rgba(255,161,22,0.12)",
    },
    {
      key: "codeforces",
      label: "Codeforces",
      placeholder: "https://codeforces.com/profile/yourname",
      color: "#1F8ACB",
      bgColor: "rgba(31,138,203,0.12)",
    },
    {
      key: "codechef",
      label: "CodeChef",
      placeholder: "https://www.codechef.com/users/yourname",
      color: "#5B4638",
      bgColor: "rgba(91,70,56,0.12)",
    },
    {
      key: "atcoder",
      label: "AtCoder",
      placeholder: "https://atcoder.jp/users/yourname",
      color: "#8BC4E8",
      bgColor: "rgba(139,196,232,0.12)",
    },
    {
      key: "hackerrank",
      label: "HackerRank",
      placeholder: "https://www.hackerrank.com/profile/yourname",
      color: "#00EA64",
      bgColor: "rgba(0,234,100,0.12)",
    },
    {
      key: "gfg",
      label: "GeeksforGeeks",
      placeholder: "https://www.geeksforgeeks.org/user/yourname",
      color: "#2F8D46",
      bgColor: "rgba(47,141,70,0.12)",
    },
    {
      key: "github",
      label: "GitHub",
      placeholder: "https://github.com/yourname",
      color: "#6E7681",
      bgColor: "rgba(110,118,129,0.12)",
    },
  ];

async function compressImageToDataUrl(file: File, maxPx = 128, quality = 0.5): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = maxPx;
        canvas.height = maxPx;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, maxPx, maxPx);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function compressBannerToDataUrl(file: File, width = 900, height = 300, quality = 0.6): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Failed to load banner image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ThemedTooltip({ hint, children }: { hint: string; children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs rounded-xl border border-white/15 bg-popover/95 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-2xl">
          {hint}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function MergedTodayProfile() {
  const { user } = useAuth();
  const { days, loading } = usePlan();
  const { completed: pbCompleted, submissions } = useProblemCompletions();

  // Active Tab state: "today" | "profile" | "calendar"
  const [activeTab, setActiveTab] = useState<"today" | "profile" | "calendar">("today");

  // Selected date from calendar click
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Selected problem for CodeModal viewer in Solved tab
  const [selectedProblemForModal, setSelectedProblemForModal] = useState<string | null>(null);

  // Profile Drawer Edit toggle
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Sync tab from URL params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "profile") {
        setActiveTab("profile");
        setShowProfileCard(true);
      } else if (tab === "calendar" || tab === "solved") {
        setActiveTab("calendar");
      } else if (tab === "today") {
        setActiveTab("today");
      }
    }
  }, []);

  // Motivational Quote State
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote>(getRandomQuote());

  // Profile local state
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");
  const [codingProfiles, setCodingProfiles] = useState<CodingProfiles>({});
  const [editingProfiles, setEditingProfiles] = useState(false);
  const [draftProfiles, setDraftProfiles] = useState<CodingProfiles>({});
  const [draftCustomLinks, setDraftCustomLinks] = useState<CustomLink[]>([]);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Record visit activity on mount
  useEffect(() => {
    recordActivity();
  }, []);

  // Load user profile from DB
  // Load user profile from local storage and DB
  useEffect(() => {
    const localAvatar = typeof window !== "undefined" ? localStorage.getItem("local_avatar_url") : null;
    const localBanner = typeof window !== "undefined" ? localStorage.getItem("local_banner_url") : null;
    if (localAvatar) setPhotoURL(localAvatar);
    if (localBanner) setBannerURL(localBanner);

    if (!user) {
      setLoadingProfile(false);
      return;
    }
    setLoadingProfile(true);
    loadUserProfile(user.uid)
      .then((p) => {
        setDisplayName(p.displayName ?? user.displayName ?? "");
        setBio(p.bio ?? "");
        if (p.photoURL) setPhotoURL(p.photoURL);
        if (p.bannerURL) setBannerURL(p.bannerURL);
        setCodingProfiles(p.codingProfiles ?? {});
        setDraftCustomLinks(p.codingProfiles?.customLinks ?? []);
      })
      .finally(() => setLoadingProfile(false));
  }, [user]);

  // Today's Day selection logic
  const iso = todayIso();
  const todayDay = days.find((d) => d.date === iso && !d.skipped);
  const futureFallback = days.find((d) => d.date > iso && !d.skipped);
  const pastFallback = days.filter((d) => d.date < iso && !d.skipped).at(-1);
  const currentDay = todayDay ?? futureFallback ?? pastFallback ?? days[0];

  // Selected Day from Calendar click or default current day
  const displayedDay = useMemo(() => {
    if (!selectedCalendarDate) return currentDay;
    return days.find((d) => d.date === selectedCalendarDate) ?? currentDay;
  }, [days, selectedCalendarDate, currentDay]);

  const isExactlyToday = displayedDay?.date === iso;
  const isPast = displayedDay ? displayedDay.date < iso : false;

  // Calculate user inactivity gap
  const inactivityInfo = useMemo(() => getInactivityDays(days), [days]);

  // Streak & Solved Stats
  const streakCount = useMemo(() => currentStreak(days), [days]);

  // Solved problems snapshots
  const completedProblems = useMemo<CompletedProblemSnapshot[]>(() => {
    const seen = new Set<string>();
    const list: CompletedProblemSnapshot[] = [];

    for (const day of days) {
      for (const p of day.problems) {
        if (p.done && p.link && p.link.trim() !== "" && !seen.has(p.name)) {
          seen.add(p.name);
          const sub = submissions[p.name];
          list.push({
            name: p.name,
            platform: p.platform,
            difficulty: p.difficulty,
            link: p.link,
            ...(sub ? { code: sub.code, submissionLink: sub.link } : {}),
          });
        }
      }
    }

    for (const fp of ALL_PROBLEMS) {
      if (pbCompleted.has(fp.name) && fp.link && fp.link.trim() !== "" && !seen.has(fp.name)) {
        seen.add(fp.name);
        const sub = submissions[fp.name];
        list.push({
          name: fp.name,
          platform: fp.platform,
          difficulty: fp.difficulty,
          link: fp.link,
          ...(sub ? { code: sub.code, submissionLink: sub.link } : {}),
        });
      }
    }

    return list;
  }, [days, pbCompleted, submissions]);

  const stats = useMemo(() => {
    const byPlatform: Record<string, number> = {};
    for (const p of completedProblems) {
      byPlatform[p.platform] = (byPlatform[p.platform] ?? 0) + 1;
    }
    return { total: completedProblems.length, byPlatform };
  }, [completedProblems]);

  const badges = useMemo(() => computeBadges(days), [days]);

  // Heatmap dataset
  const { heatmapData, detailMap } = useMemo(() => {
    const dateMap = new Map<string, any[]>();

    for (const day of days) {
      const doneProbs = day.problems.filter((p) => p.done);
      if (doneProbs.length > 0) {
        const existing = dateMap.get(day.date) ?? [];
        dateMap.set(day.date, [...existing, ...doneProbs]);
      }
    }

    for (const [probName, sub] of Object.entries(submissions)) {
      if (sub.submittedAt) {
        const dateStr = sub.submittedAt.slice(0, 10);
        const existing = dateMap.get(dateStr) ?? [];
        if (!existing.some((p) => p.name === probName)) {
          dateMap.set(dateStr, [...existing, { name: probName, done: true, platform: "Problems Tab" }]);
        }
      }
    }

    const hData: { date: string; solved: number }[] = [];
    const dMap: Record<string, any[]> = {};

    dateMap.forEach((probs, dateStr) => {
      hData.push({ date: dateStr, solved: probs.length });
      dMap[dateStr] = probs;
    });

    for (const day of days) {
      if (!day.skipped && !dateMap.has(day.date)) {
        hData.push({ date: day.date, solved: 0 });
      }
    }

    return { heatmapData: hData, detailMap: dMap };
  }, [days, submissions]);

  // Avatar upload
  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingAvatar(true);
      try {
        const dataUrl = await compressImageToDataUrl(file);
        setPhotoURL(dataUrl);
        if (typeof window !== "undefined") {
          localStorage.setItem("local_avatar_url", dataUrl);
        }
        if (user) {
          await saveAvatarBase64(user.uid, dataUrl).catch(() => { });
        }
        toast.success("Profile picture updated!");
      } catch (err) {
        toast.error("Upload failed", { description: (err as Error).message });
      } finally {
        setUploadingAvatar(false);
        e.target.value = "";
      }
    },
    [user]
  );

  // Banner upload
  const handleBannerChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingBanner(true);
      try {
        const dataUrl = await compressBannerToDataUrl(file);
        setBannerURL(dataUrl);
        if (typeof window !== "undefined") {
          localStorage.setItem("local_banner_url", dataUrl);
        }
        if (user) {
          await saveBannerBase64(user.uid, dataUrl).catch(() => { });
        }
        toast.success("Profile banner updated!");
      } catch (err) {
        toast.error("Banner upload failed", { description: (err as Error).message });
      } finally {
        setUploadingBanner(false);
        e.target.value = "";
      }
    },
    [user]
  );

  // Save basic profile info
  const saveBasicInfo = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    try {
      const publicStats = {
        totalSolved: stats.total,
        byPlatform: stats.byPlatform,
        lastUpdated: new Date().toISOString(),
      };

      await updateProfile(auth.currentUser!, { displayName });
      await saveUserProfile(user.uid, {
        displayName,
        bio,
        publicStats,
        completedProblems,
      });
      toast.success("Profile saved!");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }, [user, displayName, bio, stats, completedProblems]);

  // Save coding profiles handles
  const saveCodingProfiles = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    try {
      const merged: CodingProfiles = { ...draftProfiles, customLinks: draftCustomLinks };
      await saveUserProfile(user.uid, { codingProfiles: merged });
      setCodingProfiles(merged);
      setEditingProfiles(false);
      toast.success("Coding profiles saved!");
    } catch (err) {
      toast.error("Save failed", { description: (err as Error).message });
    } finally {
      setSaving(false);
    }
  }, [user, draftProfiles, draftCustomLinks]);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/profile/${user?.uid}` : "";
  const copyShareLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link");
    }
  }, [shareUrl]);

  const userNameDisplay = displayName || user?.displayName || user?.email?.split("@")[0] || "Developer";
  const initials = userNameDisplay[0]?.toUpperCase() ?? "D";

  if (loading || loadingProfile) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hidden File Inputs for Avatar & Cover Banner Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        onChange={handleBannerChange}
        className="hidden"
      />

      {/* ── Top Header Section: 2 Column Layout (Left: 2 Stacked Rows for Motivation & Profile | Right: LeetCode Calendar Widget) ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        {/* Left Side (2/3 width on desktop): 2 Stacked Rows (Motivation Card + Profile Overview Card) */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-4">
          {/* Row 1: Motivational Callout & Daily Quote — compact height */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-emerald-500/10 p-3 sm:p-4 backdrop-blur-md shadow-xl shrink-0 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {inactivityInfo.isLongAbsence ? (
                  <div className="rounded-2xl bg-amber-500/20 p-2 text-amber-400 shrink-0 border border-amber-500/30">
                    <Rocket className="size-5 animate-pulse" />
                  </div>
                ) : (
                  <div className="rounded-2xl bg-emerald-500/20 p-2 text-emerald-400 shrink-0 border border-emerald-500/30">
                    <HeartHandshake className="size-5" />
                  </div>
                )}
                <div>
                  {inactivityInfo.isLongAbsence ? (
                    <h3 className="text-base font-bold text-amber-300 tracking-tight">
                      After a long time, welcome back, {userNameDisplay}! 👋
                    </h3>
                  ) : (
                    <h3 className="text-base font-bold text-foreground tracking-tight">
                      Welcome back, {userNameDisplay}! ⚡
                    </h3>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Build your DSA streak! Target: Solve today's core problems
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400 shrink-0">
                <Flame className="size-3.5 text-orange-500 animate-pulse" />
                <span>{streakCount} Day Streak</span>
              </div>
            </div>

            {/* Daily Quote Card */}
            <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-md p-3 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-primary">
                <span className="flex items-center gap-1">
                  <Quote className="size-3 text-primary" /> Daily Motivation
                </span>
                <ThemedTooltip hint="Refresh for a new daily motivational quote">
                  <button
                    onClick={() => setCurrentQuote(getRandomQuote())}
                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Refresh
                  </button>
                </ThemedTooltip>
              </div>
              <p className="text-xs italic text-foreground/90 line-clamp-1">"{currentQuote.quote}"</p>
              <p className="text-[10px] text-right font-semibold text-muted-foreground">— {currentQuote.author}</p>
            </div>
          </div>

          {/* Row 2: User Profile Overview Card (Banner Backdrop & Overlapping Avatar) — larger height */}
          <div className="rounded-3xl border border-white/15 bg-card/80 backdrop-blur-xl shadow-xl flex-1 relative overflow-hidden flex flex-col justify-between min-h-[220px] sm:min-h-[260px]">
            {/* Cover Banner Backdrop */}
            <div
              onClick={() => bannerInputRef.current?.click()}
              className="h-36 sm:h-44 w-full bg-gradient-to-r from-primary/30 via-purple-600/20 to-emerald-500/20 relative overflow-hidden rounded-t-3xl border-b border-white/10 cursor-pointer group"
              title="Click to change Cover Banner"
            >
              {bannerURL ? (
                <img src={bannerURL} alt="banner" className="size-full object-cover" />
              ) : (
                <div className="size-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/25 via-background/40 to-background/90" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]">
                <Camera className="size-4 text-primary" />
                <span>Upload Banner</span>
              </div>
            </div>

            {/* Profile Avatar & Info Row (Half Overlapping Banner) */}
            <div className="p-4 sm:p-5 pt-0 relative flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Photo Avatar — half overlaps banner */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="-mt-12 sm:-mt-14 ml-2 flex size-24 sm:size-28 shrink-0 overflow-hidden rounded-full border-[5px] border-card bg-card shadow-2xl items-center justify-center z-10 cursor-pointer group relative"
                  title="Click to change Profile Photo"
                >
                  {photoURL ? (
                    <img src={photoURL} alt="avatar" className="size-full object-cover" />
                  ) : (
                    <span className="text-3xl font-extrabold text-primary">{initials}</span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-full">
                    <Camera className="size-5" />
                  </div>
                </div>

                <div className="min-w-0 pt-2">
                  <h4 className="text-sm sm:text-base font-bold text-foreground truncate">{userNameDisplay}</h4>
                  <p className="text-xs text-muted-foreground truncate">{bio || "SDE Aspirant · DSA Prep Tracker"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2">
                <ThemedTooltip hint="Copy shareable public profile link to clipboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs px-3 gap-1.5 rounded-xl border-white/10"
                    onClick={copyShareLink}
                  >
                    {copied ? <Check className="size-3.5 text-emerald-400" /> : <Share2 className="size-3.5 text-primary" />}
                    <span>{copied ? "Copied" : "Share Profile"}</span>
                  </Button>
                </ThemedTooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (1/3 width on desktop): LeetCode Monthly Calendar Widget (Combined height) */}
        <div className="lg:col-span-1 h-full">
          <LeetCodeCalendarWidget
            heatmapData={heatmapData}
            streakCount={streakCount}
            selectedDate={selectedCalendarDate}
            onSelectDate={(dStr) => {
              setSelectedCalendarDate(dStr);
              setActiveTab("today");
              toast.info(`Viewing problems for ${formatDate(dStr)}`);
            }}
          />
        </div>
      </section>

      {/* ── Collapsible Full Profile Photo, Banner & Handles Editor (Shown when Edit Handles is clicked) ── */}
      {showProfileCard && (
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-card/80 backdrop-blur-xl p-6 shadow-2xl space-y-5 animate-fade-in-down">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <UserCircle2 className="size-5 text-primary" />
              <span>Developer Profile & Coding Handles Editor</span>
            </h3>
            <Button variant="ghost" size="sm" className="size-7 p-0" onClick={() => setShowProfileCard(false)}>
              <X className="size-4" />
            </Button>
          </div>

          {/* Photo Avatar & Banner Image Upload Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-background/40 p-4">
              <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Camera className="size-3.5 text-primary" /> Profile Photo (Avatar)
              </Label>
              <div className="flex items-center gap-3">
                <div className="size-12 overflow-hidden rounded-full border border-primary/40 bg-muted shrink-0 flex items-center justify-center">
                  {photoURL ? <img src={photoURL} alt="avatar" className="size-full object-cover" /> : <span className="font-bold">{initials}</span>}
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl" onClick={() => fileInputRef.current?.click()} disabled={uploadingAvatar}>
                  Upload Avatar Photo
                </Button>
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-background/40 p-4">
              <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <ImageIcon className="size-3.5 text-primary" /> Profile Cover Banner
              </Label>
              <div className="flex items-center gap-3">
                <div className="h-12 w-24 overflow-hidden rounded-xl border border-white/10 bg-muted shrink-0">
                  {bannerURL ? <img src={bannerURL} alt="banner" className="size-full object-cover" /> : <div className="size-full bg-gradient-to-r from-primary/30 to-purple-600/30" />}
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl" onClick={() => bannerInputRef.current?.click()} disabled={uploadingBanner}>
                  Upload Banner Image
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Info: Display Name & Bio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="dp-name" className="text-xs font-semibold text-muted-foreground">Display Name</Label>
              <Input
                id="dp-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                className="bg-background/40 border-white/10 rounded-xl text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dp-bio" className="text-xs font-semibold text-muted-foreground">Bio / Target Goal</Label>
              <Input
                id="dp-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="SDE Aspirant · Target SDE 1 role..."
                className="bg-background/40 border-white/10 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button size="sm" className="gap-2 rounded-xl" onClick={saveBasicInfo} disabled={saving}>
              {saving ? <RefreshCw className="size-4 animate-spin" /> : <Check className="size-4" />}
              Save Profile Details
            </Button>
          </div>
        </section>
      )}

      {/* ── 21st.dev Segmented Tab Navigation ── */}
      <nav className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex rounded-2xl border border-white/10 bg-card/80 p-1.5 backdrop-blur-xl shadow-lg">
          <button
            onClick={() => setActiveTab("today")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 select-none",
              activeTab === "today"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <ListTodo className="size-4" />
            <span>Today's Workspace</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("profile");
              setShowProfileCard(true);
            }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 select-none",
              activeTab === "profile"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <UserCircle2 className="size-4" />
            <span>Developer Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 select-none",
              activeTab === "calendar"
                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md font-bold"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            <CalendarIcon className="size-4" />
            <span>Solved</span>
          </button>
        </div>

        {/* Selected Date Reset Banner */}
        {selectedCalendarDate && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 font-semibold">
            <span>Calendar View: {formatDate(selectedCalendarDate)}</span>
            <button
              onClick={() => setSelectedCalendarDate(null)}
              className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 hover:bg-emerald-500/30 transition-colors text-white"
            >
              <RotateCcw className="size-3" />
              <span>Back to Today</span>
            </button>
          </div>
        )}
      </nav>

      {/* ── TAB 1: TODAY'S WORKSPACE (Topic Details First + Problems ONCE) ── */}
      {activeTab === "today" && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Day Detail Component handles Topic Details first, then Today's Core Problems, Contests, and Checklist */}
          {displayedDay && (
            <DayDetail
              day={displayedDay}
              readOnly={!isExactlyToday && !isPast}
              lateMode={isPast && !isExactlyToday}
            />
          )}
        </div>
      )}

      {/* ── TAB 2: DEVELOPER PROFILE & PLATFORM HANDLES ── */}
      {activeTab === "profile" && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Coding Platforms Handles */}
          <section className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="size-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Coding Profiles & Links</h3>
              </div>

              {!editingProfiles ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-xl border-white/10"
                  onClick={() => {
                    setDraftProfiles({ ...codingProfiles });
                    setDraftCustomLinks(codingProfiles.customLinks ?? []);
                    setEditingProfiles(true);
                  }}
                >
                  <Pencil className="size-3.5" /> Edit Handles
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProfiles(false)}>
                    <X className="size-4" />
                  </Button>
                  <Button size="sm" className="gap-2 rounded-xl" onClick={saveCodingProfiles} disabled={saving}>
                    <Check className="size-4" /> Save Handles
                  </Button>
                </div>
              )}
            </div>

            {editingProfiles ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PLATFORMS.map((p) => (
                    <div key={p.key} className="space-y-1">
                      <Label htmlFor={`cp-${p.key}`} style={{ color: p.color }} className="text-xs font-semibold">
                        {p.label}
                      </Label>
                      <Input
                        id={`cp-${p.key}`}
                        value={draftProfiles[p.key] ?? ""}
                        onChange={(e) => setDraftProfiles((prev) => ({ ...prev, [p.key]: e.target.value }))}
                        placeholder={p.placeholder}
                        className="bg-background/40 border-white/10 rounded-xl text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Custom Links Edit */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-foreground">Custom Links</span>
                    <button
                      type="button"
                      onClick={() => setDraftCustomLinks((prev) => [...prev, { label: "", url: "" }])}
                      className="flex items-center gap-1 rounded-md border border-dashed border-primary/60 px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Plus className="size-3.5" /> Add link
                    </button>
                  </div>
                  <div className="space-y-2">
                    {draftCustomLinks.map((cl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          value={cl.label}
                          onChange={(e) =>
                            setDraftCustomLinks((prev) => {
                              const next = [...prev];
                              next[idx] = { ...next[idx], label: e.target.value };
                              return next;
                            })
                          }
                          placeholder="Label (e.g. Portfolio)"
                          className="w-36 shrink-0 bg-background/40 border-white/10 text-sm"
                        />
                        <Input
                          value={cl.url}
                          onChange={(e) =>
                            setDraftCustomLinks((prev) => {
                              const next = [...prev];
                              next[idx] = { ...next[idx], url: e.target.value };
                              return next;
                            })
                          }
                          placeholder="https://..."
                          className="bg-background/40 border-white/10 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setDraftCustomLinks((prev) => prev.filter((_, i) => i !== idx))}
                          className="shrink-0 rounded-md p-1.5 text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PLATFORMS.map((p) => {
                  const url = codingProfiles[p.key];
                  return (
                    <div
                      key={p.key}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 p-3 backdrop-blur-md transition-all hover:border-primary/50"
                      style={{ background: url ? p.bgColor : "rgba(255,255,255,0.02)" }}
                    >
                      <span className="text-xs font-bold w-24 shrink-0" style={{ color: p.color }}>
                        {p.label}
                      </span>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary hover:underline truncate"
                        >
                          <ExternalLink className="size-3 shrink-0" />
                          <span className="truncate">{url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground/60 italic">Not linked</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Badges & Achievements */}
          <section className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 shadow-xl">
            <BadgesGrid badges={badges} />
          </section>

          {/* Platform Solved Breakdown Stats */}
          <section className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Platform Problem Breakdown</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(stats.byPlatform).map(([platform, count]) => (
                <div key={platform} className="rounded-2xl border border-white/10 bg-background/40 p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{platform}</p>
                  <p className="mt-1 font-extrabold text-2xl tabular-nums text-primary">{count}</p>
                </div>
              ))}
              {Object.keys(stats.byPlatform).length === 0 && (
                <p className="col-span-full text-xs text-muted-foreground italic">
                  No problems completed yet. Mark problems done on your Today checklist to build your stats!
                </p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── TAB 3: SOLVED DAYS GREEN HEATMAP CALENDAR ── */}
      {activeTab === "calendar" && (
        <div className="space-y-6 animate-fade-in-up">
          <section className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Flame className="size-5 text-emerald-400" />
                  <span>Solved Days Activity Heatmap</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  Days with solved problems are highlighted in green. Click any square to view solved problems for that day.
                </p>
              </div>
            </div>

            {/* Submission Heatmap Grid */}
            <SubmissionHeatmap data={heatmapData} detailMap={detailMap} />
          </section>

          {/* All Completed Problems Archive */}
          <section className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-foreground">All Solved Problems Archive</h3>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                {completedProblems.length} Problems Solved
              </span>
            </div>

            {completedProblems.length === 0 ? (
              <p className="text-xs text-muted-foreground italic p-4 text-center border border-dashed border-white/10 rounded-2xl">
                No completed problems yet. Submit code solutions on your daily workspace to build your solved archive!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {completedProblems.map((p, idx) => (
                  <div
                    key={`${p.name}-${idx}`}
                    className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-3 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                        {p.platform}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {p.difficulty}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-foreground line-clamp-2">{p.name}</h4>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                      {p.code ? (
                        <button
                          onClick={() => setSelectedProblemForModal(p.name)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 text-[11px] font-bold transition-colors"
                          title="Click to view stored code solution"
                        >
                          <Code2 className="size-3.5 text-emerald-400" />
                          <span>View Code</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Marked Done</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Code Modal for viewing stored solutions from Solved tab */}
      <CodeModal
        open={!!selectedProblemForModal}
        onOpenChange={(open) => !open && setSelectedProblemForModal(null)}
        problemName={selectedProblemForModal ?? ""}
        existingSubmission={selectedProblemForModal ? submissions[selectedProblemForModal] : undefined}
        onSave={async () => { }}
        readOnly={true}
      />
    </div>
  );
}
