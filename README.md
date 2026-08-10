# LandIt AI

Consumer AI for job seekers: paste **resume + job description** → get a finished **application pack** (ATS score, tailored resume, cover letter, LinkedIn rewrite, interview prep).

## Product rules

- Finished artifact, not open-ended chat  
- Never invent experience  
- Consumer pricing (free pack / $9 / $39)  
- Payments: `demo` by default until Commercial Preflight is approved for live Stripe  

## Scripts

```bash
npm run dev       # 0.0.0.0:8080
npm run build
npm run typecheck
```

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Landing + pricing |
| `/checkout` | Demo (or Stripe link) unlock |
| `/success` | Post-payment next steps |
| `/app` | Intake form + generator |

## Env

Copy `.env.example`. See `SHIP_LOG.md` for Commercial Preflight and payment modes.

`XAI_API_KEY` powers generation (server-only).

## Deploy

Vercel-compatible TanStack Start build. Point domain (e.g. `landit-ai-omega.vercel.app`) at the project after publish.
