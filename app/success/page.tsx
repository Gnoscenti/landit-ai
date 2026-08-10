"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PAYMENTS_MODE, grantPurchase, type PaymentsMode } from "@/lib/payments";

function SuccessInner() {
  const sp = useSearchParams();
  const plan = sp.get("plan") === "lifetime" ? "lifetime" : "pro";
  const modeRaw = sp.get("mode") || PAYMENTS_MODE;
  const mode = (["demo", "test", "live"].includes(modeRaw) ? modeRaw : PAYMENTS_MODE) as PaymentsMode;
  const [ok, setOk] = useState(false);

  useEffect(() => {
    grantPurchase(plan as "pro" | "lifetime", mode);
    setOk(true);
  }, [plan, mode]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-4 py-3">
        <Link href="/" className="font-semibold">
          LandIt AI
        </Link>
      </header>
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">You're unlocked</h1>
        <p className="mt-3 text-muted">
          {mode === "demo" ? (
            <>
              Demo checkout for <strong className="text-fg">{plan}</strong>. No real money moved.
              Packs are ready in this browser{ok ? " now" : ""}.
            </>
          ) : (
            <>
              Payment received for <strong className="text-fg">{plan}</strong>. Packs unlocked
              {ok ? " now" : ""}.
            </>
          )}
        </p>
        <ol className="mt-8 text-left text-sm text-muted space-y-2 rounded-xl border border-border bg-surface p-5">
          <li>
            <strong className="text-fg">1.</strong> Open the app and paste resume + job description
          </li>
          <li>
            <strong className="text-fg">2.</strong> Generate your full pack
          </li>
          <li>
            <strong className="text-fg">3.</strong> Edit and apply yourself
          </li>
        </ol>
        <Link
          href="/tool"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-fg"
        >
          Generate my pack <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-muted">Loading…</div>}>
      <SuccessInner />
    </Suspense>
  );
}
