# SHIP_LOG — LandIt AI

## What was built

LandIt AI: consumer job-search artifact product. User pastes resume + job description and receives a finished application pack (ATS score, optimized resume, cover letter, LinkedIn rewrite, keywords, interview prep, next action).

People problem: **#7 Job search**.

## Live payment status (2026-08-10)

| Item | Status |
| --- | --- |
| Commercial Preflight | Complete in this file |
| Owner approval to connect live processor | **Approved** (owner directed go-live steps) |
| Stripe Payment Links $9 / $39 | **BLOCKED** — no Stripe connector; create in Dashboard per `STRIPE_SETUP.md` |
| `VITE_PAYMENTS_MODE=live` | **Not set on production** until links exist |
| Domain `landit-ai-omega.vercel.app` | Existing Vercel project `landit-ai`; must redeploy this codebase + env |

**Default in code remains `demo`** so we never pretend live charges work without links.

## Files

- `src/routes/*`, `src/lib/landit/*`, `src/styles.css`, components
- `SHIP_LOG.md`, `LAUNCH_POST.md`, `README.md`, `.env.example`, `STRIPE_SETUP.md`, `startup.sh`

## Commercial Preflight

### Offer

| Field | Decision |
| --- | --- |
| Target | Job seeker under time pressure |
| Artifact | Full application pack |
| Free | 1 pack |
| Pro | **$9** / 3 packs |
| Lifetime | **$39** unlimited |
| Trust | Not a job guarantee; no invented experience |
| Refund | 7-day pack revision/refund if unusable |

### Unit economics (rough)

AI ~$0.05–0.25/pack; Stripe ~$0.57 on $9; target 75%+ margin.

### Flow

Landing → checkout (Stripe or demo) → success (grants access) → `/app`.

## Env vars

See `.env.example` + `STRIPE_SETUP.md`.

## Safety

Career writing help; disclaimers; no LinkedIn automation.
