import { createFileRoute, Link } from "@tanstack/react-router";
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
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { PAYMENTS_MODE, PRICING } from "@/lib/landit/payments";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_55%)]" />
          <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-14 text-center sm:px-6 sm:pb-24 sm:pt-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <Zap className="h-3.5 w-3.5 text-primary" />
              Job search relief · not another endless AI chat
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              You're sending applications into the void.
              <span className="mt-2 block text-primary">Get materials that match the job.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
              Paste your resume and any job description. In under a minute you hold an ATS match
              score, tailored resume, cover letter, LinkedIn rewrite, and interview prep — written
              from your real experience only.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/app">
                <Button size="lg" className="w-full min-w-[200px] sm:w-auto">
                  Start free (1 pack)
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/checkout" search={{ plan: "pro" }}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Unlock packs — ${PRICING.pro.price}
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              ~60 seconds · plain language · no credit card for the free pack
              {PAYMENTS_MODE === "demo" ? " · payments in demo mode" : ""}
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-surface/50 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Generic applications get filtered. Rewriting every one takes hours.
            </h2>
            <p className="mt-4 text-muted">
              ATS systems screen for keywords. Recruiters skim for fit. You're tired, under
              pressure, and still pasting the same resume everywhere. LandIt turns that grind into
              one finished application pack you can act on today.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">
              Three steps. Truthful. Optimized for machines and humans.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Paste your resume",
                  desc: "Your real experience only. We never invent jobs, metrics, or skills.",
                },
                {
                  step: "02",
                  title: "Paste the job description",
                  desc: "The full posting. We pull language employers and ATS systems care about.",
                },
                {
                  step: "03",
                  title: "Get the full pack",
                  desc: "Score, resume, cover letter, LinkedIn About, keywords, interview prep, next action.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-[var(--radius-lg)] border border-border bg-surface p-6"
                >
                  <div className="text-xs font-bold tracking-wider text-primary">{item.step}</div>
                  <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface/40 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold">
              What you hold when you're done
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "ATS match score",
                  desc: "See strong matches and keyword gaps before you apply.",
                },
                {
                  icon: FileText,
                  title: "Optimized resume",
                  desc: "Reframed bullets and summary — still 100% your experience.",
                },
                {
                  icon: MessageSquare,
                  title: "Cover letter",
                  desc: "Role-specific letter ready to paste and edit.",
                },
                {
                  icon: Linkedin,
                  title: "LinkedIn rewrite",
                  desc: "Headline + About aligned to the role (copy into LinkedIn yourself).",
                },
                {
                  icon: CheckCircle2,
                  title: "Interview prep",
                  desc: "Likely questions and STAR prompts from your real background.",
                },
                {
                  icon: Shield,
                  title: "Truth-first rules",
                  desc: "No fabricated experience. Career help, not a magic job guarantee.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="flex gap-4 rounded-[var(--radius-lg)] border border-border bg-bg p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-primary/15 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">
              Simple pricing for people under pressure
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">
              One clear pack. No enterprise sales. Pay when the free pack is used.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <PriceCard
                name={PRICING.free.label}
                price={`$${PRICING.free.price}`}
                blurb={PRICING.free.description}
                cta="Start free"
                to="/app"
                features={["Full multi-output pack", "ATS score + recommendations"]}
              />
              <PriceCard
                name={PRICING.pro.label}
                price={`$${PRICING.pro.price}`}
                blurb={PRICING.pro.description}
                cta="Unlock 3 packs"
                to="/checkout"
                plan="pro"
                featured
                features={[
                  "3 full application packs",
                  "Same full outputs each time",
                  "One-time payment",
                ]}
              />
              <PriceCard
                name={PRICING.lifetime.label}
                price={`$${PRICING.lifetime.price}`}
                blurb={PRICING.lifetime.description}
                cta="Get lifetime"
                to="/checkout"
                plan="lifetime"
                features={[
                  "Unlimited packs",
                  "Future product updates",
                  "Best if you're actively applying",
                ]}
              />
            </div>
            <p className="mt-6 text-center text-xs text-muted">
              Satisfaction: if a pack is unusable, request one free revision or refund of that pack
              within 7 days (demo mode: contact via launch channel). Not legal, medical, or hiring
              advice — and never a promise of interviews.
            </p>
          </div>
        </section>

        <section className="border-t border-border bg-surface/40 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold">Trust boundaries</h2>
            <ul className="mt-8 space-y-4 text-sm text-muted">
              <li>
                <strong className="text-fg">What this is:</strong> writing and career preparation
                help. You edit and submit applications yourself.
              </li>
              <li>
                <strong className="text-fg">What this is not:</strong> a guarantee of ATS pass rates,
                interviews, or job offers. Not a recruiter, lawyer, or career counselor substitute.
              </li>
              <li>
                <strong className="text-fg">Privacy:</strong> resume and job text are sent to generate
                your pack. We do not require an account for the free pack. Do not paste secrets
                (SSN, passwords). Prefer not to store outputs server-side in this version — keep a
                local copy.
              </li>
              <li>
                <strong className="text-fg">LinkedIn:</strong> we generate copy you can paste into
                LinkedIn. We do not automate LinkedIn logins, connection requests, or scraping
                (against LinkedIn rules and risky for your account).
              </li>
            </ul>

            <div className="mt-12 space-y-4">
              <h3 className="font-display text-lg font-semibold">FAQ</h3>
              {[
                {
                  q: "Is this just ChatGPT with a form?",
                  a: "No. Outputs are structured for ATS + applications with hard rules: never invent experience, always include score, letter, LinkedIn, and interview prep.",
                },
                {
                  q: "Will it invent experience?",
                  a: "No. It only reframes what you provide. If something is missing, it notes the gap.",
                },
                {
                  q: "What happens after I pay?",
                  a: "You land on a success page, then open the app to generate packs. In demo mode, checkout simulates payment so you can test the full flow before live Stripe.",
                },
                {
                  q: "Can I edit the output?",
                  a: "Yes — always. Copy, revise in your own voice, and submit yourself.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-[var(--radius)] border border-border bg-bg p-4"
                >
                  <h4 className="font-semibold">{item.q}</h4>
                  <p className="mt-2 text-sm text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="font-display text-2xl font-semibold">
            Stop sending the same resume everywhere
          </h2>
          <p className="mt-3 text-muted">Tailor the next application in minutes.</p>
          <Link to="/app" className="mt-8 inline-block">
            <Button size="lg">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted sm:flex-row sm:px-6">
          <div className="font-semibold text-fg">LandIt AI</div>
          <div>Career writing help · Not a job guarantee · © {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}

function PriceCard({
  name,
  price,
  blurb,
  features,
  cta,
  to,
  plan,
  featured,
}: {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  cta: string;
  to: "/app" | "/checkout";
  plan?: "pro" | "lifetime";
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[var(--radius-lg)] border p-6 ${
        featured
          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_40%,transparent)]"
          : "border-border bg-surface"
      }`}
    >
      {featured ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-fg">
          Best value
        </div>
      ) : null}
      <div className="text-sm font-medium text-muted">{name}</div>
      <div className="mt-2 font-display text-3xl font-bold">{price}</div>
      <p className="mt-1 text-sm text-muted">{blurb}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>
      {to === "/checkout" ? (
        <Link to="/checkout" search={{ plan }} className="mt-8 block">
          <Button className="w-full" variant={featured ? "default" : "outline"}>
            {cta}
          </Button>
        </Link>
      ) : (
        <Link to="/app" className="mt-8 block">
          <Button className="w-full" variant={featured ? "default" : "outline"}>
            {cta}
          </Button>
        </Link>
      )}
    </div>
  );
}
