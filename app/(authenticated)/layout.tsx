'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/integrations/firebase/client'
import { PlanProvider } from '@/hooks/usePlan'
import { SettingsProvider, useSettings } from '@/hooks/useSettings'
import { ReminderRunner } from '@/components/ReminderRunner'
import { AppShell } from '@/components/AppShell'
import { hasExistingPlan, changeStartDate } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarDays } from 'lucide-react'
import { toast } from 'sonner'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push('/auth?next=/today')
      }
      setLoading(false)
    })

    return () => unsub()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <SettingsProvider userId={user.uid}>
      <PlanBoundary email={user.email ?? ''} userId={user.uid}>
        {children}
      </PlanBoundary>
    </SettingsProvider>
  )
}

function PlanBoundary({
  email,
  userId,
  children,
}: {
  email: string
  userId: string
  children: React.ReactNode
}) {
  const { settings } = useSettings()
  const [checkingPlan, setCheckingPlan] = useState(true)
  const [showStartModal, setShowStartModal] = useState(false)
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    hasExistingPlan(userId).then((exists) => {
      if (!exists) setShowStartModal(true)
      setCheckingPlan(false)
    })
  }, [userId])

  async function confirmStartDate() {
    setSeeding(true)
    try {
      await changeStartDate(userId, startDate)
      setShowStartModal(false)
      toast.success('Plan created! Your 120-day journey starts ' + startDate)
    } catch (e) {
      toast.error('Could not create your plan. Please try again.')
    } finally {
      setSeeding(false)
    }
  }

  if (checkingPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <PlanProvider userId={userId} paused={settings.paused}>
      {/* Blur overlay + modal when no plan exists yet */}
      {showStartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">When do you start?</h2>
                <p className="text-xs text-muted-foreground">Pick your Day 1 for the 120-day plan</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="plan-start">Start date</Label>
              <Input
                id="plan-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Your plan will run from this date for 120 days. You can change it later in Settings.
              </p>
            </div>

            <Button
              className="mt-5 w-full"
              disabled={seeding || !startDate}
              onClick={confirmStartDate}
            >
              {seeding ? 'Creating your plan…' : 'Start my plan'}
            </Button>
          </div>
        </div>
      )}

      <AppShell email={email}>
        <ReminderRunner />
        {children}
      </AppShell>
    </PlanProvider>
  )
}
