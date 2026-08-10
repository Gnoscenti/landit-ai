"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Copy, Loader2, Sparkles } from "lucide-react";
import {
  canGenerate,
  consumeCredit,
  readAccess,
  type AccessRecord,
} from "@/lib/payments";

export default function AppPage() {
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
        : `${access.creditsRemaining} pack(s) left`;

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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Generation failed.");
        return;
      }
      consumeCredit();
      setAccess(readAccess());
      setArtifact(data.artifact);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-semibold">
          LandIt AI
        </Link>
        <span className="text-xs border border-border rounded-full px-3 py-1 text-muted">
          {accessLabel}
        </span>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold">Build your application pack</h1>
        <p className="text-sm text-muted mt-1">
          Paste real experience only. Edit the output before you apply.
        </p>
        <div className="mt-4 rounded-lg border border-border bg-surface/60 px-4 py-3 text-xs text-muted">
          <strong className="text-fg">Disclaimer:</strong> Career writing help only — not a guarantee
          of interviews. Never invent credentials. Keep a local copy of outputs.
        </div>
        <form onSubmit={onGenerate} className="mt-8 grid gap-6 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Your resume / background</span>
            <textarea
              required
              rows={12}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              placeholder="Experience, skills, education…"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Job description</span>
            <textarea
              required
              rows={12}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              placeholder="Paste the full job description…"
            />
          </label>
          <label className="block lg:col-span-2">
            <span className="text-sm font-semibold">Company (optional)</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-2 w-full max-w-md rounded-lg border border-border bg-bg px-3 py-2 text-sm"
              placeholder="e.g. Acme Health"
            />
          </label>
          <div className="lg:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-fg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate pack
                </>
              )}
            </button>
            {(error?.includes("Free pack") || error?.includes("credits")) && (
              <Link
                href="/checkout?plan=pro"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 font-semibold"
              >
                Unlock more packs
              </Link>
            )}
          </div>
        </form>
        {error && (
          <div className="mt-6 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
        {artifact && (
          <section className="mt-10">
            <div className="flex justify-between items-center gap-3">
              <h2 className="text-xl font-semibold">Your pack</h2>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(artifact);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy all"}
              </button>
            </div>
            <article className="mt-4 whitespace-pre-wrap rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed">
              {artifact}
            </article>
          </section>
        )}
      </main>
    </div>
  );
}
