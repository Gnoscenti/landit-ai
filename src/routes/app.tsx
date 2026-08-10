import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { generateApplicationPack } from "@/lib/landit/generate";
import {
  canGenerate,
  consumeCredit,
  readAccess,
  type AccessRecord,
} from "@/lib/landit/payments";

export const Route = createFileRoute("/app")({
  component: AppPage,
});

function AppPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [artifact, setArtifact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [access, setAccess] = useState<AccessRecord | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setAccess(readAccess());
  }, []);

  const accessLabel = !access
    ? "Free pack available"
    : access.plan === "lifetime"
      ? "Lifetime · unlimited"
      : access.plan === "free"
        ? "Free pack used"
        : `${access.creditsRemaining} pack${access.creditsRemaining === 1 ? "" : "s"} left`;

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCopied(false);

    const gate = canGenerate();
    if (!gate.ok) {
      setError(gate.reason ?? "No credits left.");
      return;
    }

    setLoading(true);
    try {
      const result = await generateApplicationPack({
        data: { resume, jobDescription, company },
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      consumeCredit();
      setAccess(readAccess());
      setArtifact(result.artifact);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copyAll() {
    if (!artifact) return;
    await navigator.clipboard.writeText(artifact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-dvh bg-bg">
      <SiteHeader compact />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">
              Build your application pack
            </h1>
            <p className="mt-1 text-sm text-muted">
              Paste real experience only. Edit the output before you apply.
            </p>
          </div>
          <div className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            {accessLabel}
          </div>
        </div>

        <div className="mt-4 rounded-[var(--radius)] border border-border bg-surface/60 px-4 py-3 text-xs text-muted">
          <strong className="text-fg">Disclaimer:</strong> Career writing help only — not a
          guarantee of interviews or offers. Not professional career counseling. Never invent
          credentials. If you're in crisis about work/finances, contact local support services.
          Privacy: inputs are processed to generate your pack; keep a local copy of outputs.
        </div>

        <form onSubmit={onGenerate} className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Field
              label="Your resume / background"
              hint="Paste text from your resume or LinkedIn About + experience."
            >
              <textarea
                required
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                rows={12}
                placeholder="Experience, skills, education…"
                className="w-full resize-y rounded-[var(--radius)] border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
            <Field label="Company (optional)">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Health"
                className="w-full rounded-[var(--radius)] border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
          </div>
          <div className="space-y-4">
            <Field
              label="Job description"
              hint="Paste the full posting for best ATS keyword matching."
            >
              <textarea
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={14}
                placeholder="Paste the full job description…"
                className="w-full resize-y rounded-[var(--radius)] border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-2">
            <Button type="submit" size="lg" disabled={loading} className="sm:min-w-[220px]">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate pack
                </>
              )}
            </Button>
            {error?.includes("Free pack") || error?.includes("credits") ? (
              <Link to="/checkout" search={{ plan: "pro" }}>
                <Button type="button" variant="outline" size="lg">
                  Unlock more packs
                </Button>
              </Link>
            ) : null}
          </div>
        </form>

        {error ? (
          <div className="mt-6 rounded-[var(--radius)] border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        ) : null}

        {artifact ? (
          <section className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold">Your pack</h2>
              <Button type="button" variant="secondary" size="sm" onClick={copyAll}>
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy all"}
              </Button>
            </div>
            <article className="mt-4 whitespace-pre-wrap rounded-[var(--radius-lg)] border border-border bg-surface p-5 text-sm leading-relaxed text-fg sm:p-6">
              {artifact}
            </article>
            <p className="mt-4 text-sm text-muted">
              <strong className="text-fg">Next:</strong> edit for your voice, export to your docs,
              apply on the employer site. Paste LinkedIn fields yourself — we don't automate
              LinkedIn.
            </p>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}
