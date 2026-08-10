import { NextResponse } from "next/server";
import { LANDIT_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resume = String(body.resume || "").trim();
    const jobDescription = String(body.jobDescription || "").trim();
    const company = body.company ? String(body.company).trim() : undefined;

    if (resume.length < 40 || jobDescription.length < 40) {
      return NextResponse.json(
        { ok: false, error: "Please paste a fuller resume and job description." },
        { status: 400 },
      );
    }
    if (resume.length > 20000 || jobDescription.length > 20000) {
      return NextResponse.json(
        { ok: false, error: "Input is too long. Please shorten and try again." },
        { status: 400 },
      );
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "AI is not available in this environment right now." },
        { status: 503 },
      );
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.4,
        max_tokens: 3500,
        messages: [
          { role: "system", content: LANDIT_SYSTEM_PROMPT },
          {
            role: "user",
            content: buildUserPrompt(resume, jobDescription, company),
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: `Generation failed (${res.status}). ${text.slice(0, 120)}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    const artifact = data.choices?.[0]?.message?.content?.trim() || "";
    if (!artifact) {
      return NextResponse.json(
        { ok: false, error: "No content returned. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, artifact, model: data.model || "grok-4.5" });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Server error" },
      { status: 500 },
    );
  }
}
