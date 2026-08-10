/** Payment mode ladder — live only after Commercial Preflight approval + Stripe links */
export type PaymentsMode = "demo" | "test" | "live";

export const PAYMENTS_MODE: PaymentsMode =
  (import.meta.env.VITE_PAYMENTS_MODE as PaymentsMode | undefined) ?? "demo";

export const PRICING = {
  free: { label: "Free", price: 0, description: "1 full application pack" },
  pro: {
    label: "Pro",
    price: 9,
    description: "3 application packs — one-time",
    credits: 3,
  },
  lifetime: {
    label: "Lifetime Access",
    price: 39,
    description: "Unlimited packs + future updates (founder deal)",
  },
} as const;

export const ACCESS_STORAGE_KEY = "landit_access_v1";

export type AccessRecord = {
  plan: "free" | "pro" | "lifetime";
  creditsRemaining: number;
  purchasedAt: string;
  mode: PaymentsMode;
};

export function readAccess(): AccessRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACCESS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AccessRecord;
  } catch {
    return null;
  }
}

export function writeAccess(record: AccessRecord) {
  localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(record));
}

/** Grant paid access after demo checkout or Stripe success redirect */
export function grantPurchase(
  plan: "pro" | "lifetime",
  mode: PaymentsMode = PAYMENTS_MODE,
): AccessRecord {
  const record: AccessRecord = {
    plan,
    creditsRemaining: plan === "lifetime" ? 9999 : PRICING.pro.credits,
    purchasedAt: new Date().toISOString(),
    mode,
  };
  writeAccess(record);
  return record;
}

/** @deprecated use grantPurchase */
export function grantDemoPurchase(plan: "pro" | "lifetime"): AccessRecord {
  return grantPurchase(plan, "demo");
}

export function consumeCredit(): AccessRecord | null {
  const current = readAccess();
  if (!current) {
    const free: AccessRecord = {
      plan: "free",
      creditsRemaining: 0,
      purchasedAt: new Date().toISOString(),
      mode: PAYMENTS_MODE,
    };
    writeAccess(free);
    return free;
  }
  if (current.plan === "lifetime") return current;
  if (current.creditsRemaining <= 0) return null;
  const next = {
    ...current,
    creditsRemaining: current.creditsRemaining - 1,
  };
  writeAccess(next);
  return next;
}

export function canGenerate(): { ok: boolean; reason?: string } {
  const access = readAccess();
  if (!access) {
    return { ok: true };
  }
  if (access.plan === "lifetime") return { ok: true };
  if (access.creditsRemaining > 0) return { ok: true };
  if (access.plan === "free" && access.creditsRemaining === 0) {
    return {
      ok: false,
      reason: "Free pack used. Unlock more packs to continue.",
    };
  }
  return { ok: false, reason: "No credits left. Unlock a pack to continue." };
}

export function paymentLinkFor(plan: "pro" | "lifetime"): string | undefined {
  if (plan === "lifetime") {
    return import.meta.env.VITE_STRIPE_PAYMENT_LINK_LIFETIME as string | undefined;
  }
  return import.meta.env.VITE_STRIPE_PAYMENT_LINK_PRO as string | undefined;
}
