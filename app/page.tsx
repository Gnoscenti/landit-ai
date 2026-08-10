import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Linkedin,
  MessageSquare,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { PAYMENTS_MODE, PRICING } from "@/lib/payments";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border sticky top-0 bg-bg/90 backdrop-blur z-40">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="h-8 w-8 rounded-lg bg-primary text-primary-fg flex items-center justify-center text-sm font-bold">
              L
            </span>
            LandIt AI
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/tool" className="text-sm text-muted hover:text-fg hidden sm:inline">
              Open app
            </Link>
            <Link
              href="/checkout?plan=pro"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg"
            >
              Get packs
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted mb-6">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Job search relief · not endless AI chat
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            You're sending applications into the void.
            <span className="block text-primary mt-2">Get materials that match the job.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted text-lg">
            Paste your resume and any job description. Get an ATS match score, tailored resume,
            cover letter, LinkedIn rewrite, and interview prep — from your real experience only.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tool"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-fg"
            >
              Start free (1 pack) <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/checkout?plan=pro"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 font-semibold"
            >
              Unlock packs — ${PRICING.pro.price}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            ~60 seconds · no card for free pack
            {PAYMENTS_MODE === "demo" ? " · payments in demo mode until Stripe links set" : ""}
          </p>
        </section>

        <section className="border-y border-border bg-surface/50 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Generic applications get filtered. Rewriting every one takes hours.
            </h2>
            <p className="mt-4 text-muted">
              LandIt turns the grind into one finished application pack you can act on today.
            </p>
          </div>
        </section>

        <section className="py-16 mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold">What you hold when you're done</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Target, t: "ATS match score", d: "Strong matches and keyword gaps." },
              { icon: FileText, t: "Optimized resume", d: "Reframed from your real experience." },
              { icon: MessageSquare, t: "Cover letter", d: "Role-specific and ready to edit." },
              { icon: Linkedin, t: "LinkedIn rewrite", d: "Headline + About — you paste it." },
              { icon: CheckCircle2, t: "Interview prep", d: "Questions + STAR from your background." },
              { icon: Shield, t: "Never invents", d: "Hard rule: no fabricated experience." },
            ].map((f) => (
              <div key={f.t} className="flex gap-3 rounded-xl border border-border bg-surface p-5">
                <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{f.t}</h3>
                  <p className="text-sm text-muted mt-1">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="py-16 mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold">Simple pricing</h2>
          <p className="text-center text-muted mt-2">Free pack first. Pay when you need more.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <PriceCard name="Free" price="$0" blurb="1 full pack" href="/tool" cta="Start free" features={["Full multi-output pack", "ATS score"]} />
            <PriceCard name="Pro" price="$9" blurb="3 packs · one-time" href="/checkout?plan=pro" cta="Unlock 3 packs" featured features={["3 full packs", "One-time payment"]} />
            <PriceCard name="Lifetime" price="$39" blurb="Unlimited · founder" href="/checkout?plan=lifetime" cta="Get lifetime" features={["Unlimited packs", "Future updates"]} />
          </div>
          <p className="mt-6 text-center text-xs text-muted max-w-2xl mx-auto">
            Not a job guarantee. Career writing help only. 7-day pack revision/refund if unusable.
            We do not automate LinkedIn (ToS risk) — we generate copy you paste yourself.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        LandIt AI · © {new Date().getFullYear()} · Career writing help
      </footer>
    </div>
  );
}

function PriceCard({
  name, price, blurb, features, cta, href, featured,
}: {
  name: string; price: string; blurb: string; features: string[]; cta: string; href: string; featured?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl border p-6 ${featured ? "border-primary bg-primary/5" : "border-border bg-surface"}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-fg">
          Best value
        </div>
      )}
      <div className="text-sm text-muted">{name}</div>
      <div className="text-3xl font-bold mt-2">{price}</div>
      <p className="text-sm text-muted mt-1">{blurb}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-8 block w-full rounded-full py-2.5 text-center text-sm font-semibold ${
          featured ? "bg-primary text-primary-fg" : "border border-border"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
