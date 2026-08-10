import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  PAYMENTS_MODE,
  PRICING,
  grantPurchase,
  paymentLinkFor,
} from "@/lib/landit/payments";

type Plan = "pro" | "lifetime";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): { plan?: Plan } => {
    if (search.plan === "lifetime") return { plan: "lifetime" };
    if (search.plan === "pro") return { plan: "pro" };
    return {};
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const search = Route.useSearch();
  const [plan, setPlan] = useState<Plan>(search.plan === "lifetime" ? "lifetime" : "pro");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const details = useMemo(
    () => (plan === "lifetime" ? PRICING.lifetime : PRICING.pro),
    [plan],
  );

  async function handlePay() {
    setBusy(true);
    setErr(null);
    try {
      if (PAYMENTS_MODE === "demo") {
        grantPurchase(plan, "demo");
        await navigate({
          to: "/success",
          search: { plan, mode: "demo" },
        });
        return;
      }

      const link = paymentLinkFor(plan);
      if (!link) {
        setErr(
          `Stripe Payment Link missing for ${plan}. Create it in Stripe Dashboard, set VITE_STRIPE_PAYMENT_LINK_${plan === "lifetime" ? "LIFETIME" : "PRO"} on Vercel, then redeploy. See STRIPE_SETUP.md.`,
        );
        return;
      }
      // Append client_reference / after_completion is configured on the Payment Link success URL
      window.location.href = link;
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg">
      <SiteHeader compact />
      <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Checkout · {PAYMENTS_MODE} mode
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold">Unlock application packs</h1>
        <p className="mt-2 text-muted">
          {PAYMENTS_MODE === "demo"
            ? "Demo mode: no real charge. Completing checkout unlocks packs in this browser so you can test the full flow."
            : PAYMENTS_MODE === "test"
              ? "Test mode: use Stripe test cards. You will be redirected to Stripe."
              : "Live mode: real payment via Stripe. You will be redirected to complete checkout securely."}
        </p>

        <div className="mt-8 space-y-3">
          <PlanOption
            selected={plan === "pro"}
            onSelect={() => setPlan("pro")}
            title={`${PRICING.pro.label} — $${PRICING.pro.price}`}
            desc={PRICING.pro.description}
          />
          <PlanOption
            selected={plan === "lifetime"}
            onSelect={() => setPlan("lifetime")}
            title={`${PRICING.lifetime.label} — $${PRICING.lifetime.price}`}
            desc={PRICING.lifetime.description}
          />
        </div>

        <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-muted">Total</span>
            <span className="font-display text-2xl font-bold">${details.price}</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            One-time. You receive: {details.description}. Then generate packs in the app.
          </p>
          <Button className="mt-6 w-full" size="lg" disabled={busy} onClick={handlePay}>
            {busy
              ? "Working…"
              : PAYMENTS_MODE === "demo"
                ? `Complete demo checkout — $${details.price}`
                : `Pay $${details.price} with Stripe`}
          </Button>
          {err ? (
            <p className="mt-3 text-sm text-danger">{err}</p>
          ) : (
            <p className="mt-3 text-center text-xs text-muted">
              {PAYMENTS_MODE === "live"
                ? "Secure checkout on Stripe. After pay you return to LandIt unlocked."
                : PAYMENTS_MODE === "demo"
                  ? "Commercial Preflight approved for live; flip env to live once Payment Links exist."
                  : "Configure Payment Links to go live."}
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Or{" "}
          <Link to="/app" className="text-primary underline-offset-2 hover:underline">
            use your free pack
          </Link>{" "}
          first.
        </p>
      </main>
    </div>
  );
}

function PlanOption({
  selected,
  onSelect,
  title,
  desc,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[var(--radius-lg)] border p-4 text-left transition-colors ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-surface hover:bg-surface-2"
      }`}
    >
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted">{desc}</div>
    </button>
  );
}
