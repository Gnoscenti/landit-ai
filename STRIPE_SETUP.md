# Stripe Payment Links — LandIt AI (go live)

**Blocker:** No Stripe connector is available in this environment. You create links in the Stripe Dashboard (2 minutes), then set Vercel env vars.

Commercial Preflight is documented in `SHIP_LOG.md` and **owner-approved** for live connection once links exist.

## Products

| Plan | Price | Env var |
| --- | --- | --- |
| Pro — 3 packs | **$9** one-time | `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO` |
| Lifetime | **$39** one-time | `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_LIFETIME` |

## Create links (Stripe Dashboard)

1. Open [https://dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links) (use **Test** mode first if you want).
2. **+ New** → Product: `LandIt AI Pro` · Price **$9.00** USD · One-time.
3. After completion → **Don’t show confirmation page** → redirect to:
   ```
   https://landit-ai-omega.vercel.app/success?plan=pro&mode=live
   ```
   (For test mode use `mode=test`.)
4. Create second link: `LandIt AI Lifetime` · **$39.00** · redirect:
   ```
   https://landit-ai-omega.vercel.app/success?plan=lifetime&mode=live
   ```
5. Copy each Payment Link URL (`https://buy.stripe.com/...`).

## Vercel project env (landit-ai)

Project: `landit-ai` · Team: Blaine's projects

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_PAYMENTS_MODE` | `live` (or `test` while testing) |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PRO` | `https://buy.stripe.com/...` ($9) |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_LIFETIME` | `https://buy.stripe.com/...` ($39) |
| `XAI_API_KEY` | Your xAI key (server) for generation |

Apply to **Production** (and Preview if desired). **Redeploy** after saving env.

## How unlock works after pay

Stripe redirects to `/success?plan=…&mode=live`. The success page **grants packs in the browser** (`localStorage`). Good enough for V0 Payment Links; later add webhooks + auth for multi-device.

## Paste links back here

Reply with the two `buy.stripe.com` URLs (or set them in Vercel yourself) and we can flip live / confirm the domain.
