import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  PAYMENTS_MODE,
  grantPurchase,
  type PaymentsMode,
} from "@/lib/landit/payments";

export const Route = createFileRoute("/success")({
  validateSearch: (search: Record<string, unknown>): { plan?: string; mode?: string } => ({
    plan: typeof search.plan === "string" ? search.plan : undefined,
    mode: typeof search.mode === "string" ? search.mode : undefined,
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { plan: planRaw = "pro", mode: modeRaw = PAYMENTS_MODE } = Route.useSearch();
  const plan = planRaw === "lifetime" ? "lifetime" : "pro";
  const mode = (["demo", "test", "live"].includes(modeRaw)
    ? modeRaw
    : PAYMENTS_MODE) as PaymentsMode;
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    grantPurchase(plan, mode);
    setGranted(true);
  }, [plan, mode]);

  return (
    <div className="min-h-dvh bg-bg">
      <SiteHeader compact />
      <main className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">You're unlocked</h1>
        <p className="mt-3 text-muted">
          {mode === "demo" ? (
            <>
              Demo checkout complete for <strong className="text-fg">{plan}</strong>. No real
              money moved. Packs are available in this browser — open the app and generate your
              materials.
            </>
          ) : (
            <>
              Payment received for <strong className="text-fg">{plan}</strong>. Your packs are
              unlocked in this browser{granted ? " now" : ""}. Open the app to generate.
            </>
          )}
        </p>
        <ol className="mt-8 space-y-3 rounded-[var(--radius-lg)] border border-border bg-surface p-5 text-left text-sm text-muted">
          <li>
            <strong className="text-fg">1.</strong> Open the app and paste resume + job description
          </li>
          <li>
            <strong className="text-fg">2.</strong> Generate your full pack (score, resume, letter,
            LinkedIn, interview prep)
          </li>
          <li>
            <strong className="text-fg">3.</strong> Edit in your voice, then apply yourself
          </li>
        </ol>
        <Link to="/app" className="mt-8 inline-block">
          <Button size="lg">
            Generate my pack
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
