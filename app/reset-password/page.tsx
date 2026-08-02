import { lazy, Suspense } from "react";

export const metadata = {
  title: "Reset password — A2Z DSA Tracker",
  description: "Reset your password to regain access to your DSA tracker.",
};

const ResetPasswordContent = lazy(() => import("@/components/ResetPasswordContent"));

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
