# Deploy — GitHub + Vercel

The repo is committed and ready. These are the two commands + one dashboard
step to get it live. Run them from your own machine (they need your GitHub /
Vercel auth, which the build session didn't have).

## 1. Push to GitHub

From the project root (this folder already has a git history and an initial
commit):

```bash
# create the repo and push in one go (needs the GitHub CLI, `gh auth login`)
gh repo create obscurio-storefront --private --source=. --remote=origin --push

# — OR — if you made the empty repo in the GitHub UI:
git remote add origin https://github.com/<you>/obscurio-storefront.git
git push -u origin main
```

## 2. Deploy to Vercel

Easiest path — import the GitHub repo in the Vercel dashboard:

1. vercel.com → Add New… → Project → import `obscurio-storefront`
2. Framework preset auto-detects **SvelteKit** — leave build settings default
3. Add the env vars below → Deploy

Or from the CLI:

```bash
npm i -g vercel
vercel link          # pick your team + a project name
vercel --prod        # first deploy
```

## 3. Environment variables (Vercel → Settings → Environment Variables)

| Name | Value | Notes |
|------|-------|-------|
| `PUBLIC_SHOPIFY_STORE_DOMAIN` | `vercel-store-a45cd659.myshopify.com` | your `.myshopify.com` domain |
| `SHOPIFY_STOREFRONT_TOKEN` | *(your token)* | **Storefront** API access token, not the Admin one |

### Getting the Storefront token

Shopify admin → Settings → Apps and sales channels → Develop apps → your app →
Configuration → **Storefront API** → enable `unauthenticated_read_product_listings`
(and `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`
for cart) → API credentials → copy the **Storefront API access token**.

Without the token the site still renders from the baked-in catalog snapshot
(`src/lib/data/demo.ts`). With it, live products load automatically — no code
change.

## Notes

- The Bodoni* display fonts are committed under `static/fonts/`, so a
  git-connected deploy serves them; the display face renders exactly as designed
  (Playfair Display is only the fallback if the OTFs are missing).
- `main` is the production branch. Every push to it triggers a Vercel
  production deploy once the project is git-connected.
