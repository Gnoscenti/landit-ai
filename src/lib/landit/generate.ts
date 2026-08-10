import { createServerFn } from "@tanstack/react-start";
import { LANDIT_SYSTEM_PROMPT, buildUserPrompt } from "./prompt";

export type GenerateInput = {
  resume: string;
  jobDescription: string;
  company?: string;
};

export type GenerateResult =
  | { ok: true; artifact: string; model: string }
  | { ok: false; error: string };

export const generateApplicationPack = createServerFn({ method: "POST" })
  .validator((input: GenerateInput) => {
    if (!input?.resume?.trim() || input.resume.trim().length < 40) {
      throw new Error("Please paste a fuller resume (at least a few lines of experience).");
    }
    if (!input?.jobDescription?.trim() || input.jobDescription.trim().length < 40) {
      throw new Error("Please paste the full job description.");
    }
    if (input.resume.length > 20000 || input.jobDescription.length > 20000) {
      throw new Error("Input is too long. Please shorten and try again.");
    }
    return {
      resume: input.resume.trim(),
      jobDescription: input.jobDescription.trim(),
      company: input.company?.trim() || undefined,
    };
  })
  .handler(async ({ data }): Promise<GenerateResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error: "AI is not available in this environment right now. Try again later.",
      };
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
            content: buildUserPrompt(data.resume, data.jobDescription, data.company),
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Generation failed (${res.status}). ${text.slice(0, 120)}`,
      };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      model?: string;
    };
    const artifact = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!artifact) {
      return { ok: false, error: "No content returned. Please try again." };
    }

    return { ok: true, artifact, model: body.model ?? "grok-4.5" };
  });
