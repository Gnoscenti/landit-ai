"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import {
  PAYMENTS_MODE,
  PRICING,
  grantPurchase,
  paymentLinkFor,
} from "@/lib/payments";

type Plan = "pro" | "lifetime";

function CheckoutInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const initial = sp.get("plan") === "lifetime" ? "lifetime" : "pro";
  const [plan, setPlan] = useState<Plan>(initial as Plan);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
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
        router.push(`/success?plan=${plan}&mode=demo`);
        return;
      }
      const link = paymentLinkFor(plan);
      if (!link) {
        setErr(
          `Stripe Payment Link missing for ${plan}. Set NEXT_PUBLIC_STRIPE_PAYMENT_LINK_${plan === "lifetime" ? "LIFETIME" : "PRO"} on Vercel.`,
        );
        return;
      }
      window.location.href = link;
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-4 py-3">
        <Link href="/" className="font-semibold">
          ← LandIt AI
        </Link>
      </header>
      <main className="mx-auto max-w-lg px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Checkout · {PAYMENTS_MODE} mode
        </p>
        <h1 className="mt-2 text-3xl font-bold">Unlock application packs</h1>
        <p className="mt-2 text-muted text-sm">
          {PAYMENTS_MODE === "demo"
            ? "Demo mode: no real charge. Completing unlocks packs in this browser."
            : "You will complete payment securely on Stripe."}
        </p>
        <div className="mt-8 space-y-3">
          {(["pro", "lifetime"] as Plan[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className={`w-full rounded-xl border p-4 text-left ${
                plan === p ? "border-primary bg-primary/10" : "border-border bg-surface"
              }`}
            >
              <div className="font-semibold">
                {p === "pro" ? `Pro — $${PRICING.pro.price}` : `Lifetime — $${PRICING.lifetime.price}`}
              </div>
              <div className="text-sm text-muted mt-1">
                {p === "pro" ? PRICING.pro.description : PRICING.lifetime.description}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <div className="flex justify-between items-baseline">
            <span className="text-muted">Total</span>
            <span className="text-2xl font-bold">${details.price}</span>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={handlePay}
            className="mt-6 w-full rounded-full bg-primary py-3 font-semibold text-primary-fg disabled:opacity-50"
          >
            {busy
              ? "Working…"
              : PAYMENTS_MODE === "demo"
                ? `Complete demo checkout — $${details.price}`
                : `Pay $${details.price} with Stripe`}
          </button>
          {err && <p className="mt-3 text-sm text-danger">{err}</p>}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Or{" "}
          <Link href="/tool" className="text-primary underline">
            use your free pack
          </Link>
        </p>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted">Loading checkout…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
