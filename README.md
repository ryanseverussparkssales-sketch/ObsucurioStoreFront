# Obscurio Books — SvelteKit Storefront

Headless Shopify storefront for **Obscurio Books**, rebuilt from the v0 prototype
in the studio's SvelteKit style (Edelhaus design system, ported from LeadOS).
Homepage layout inspired by the ThriftBooks mobile home: search-first header,
hero feature card, stacked promo banners, horizontal product shelves.

## Stack

- SvelteKit 2 · Svelte 5 (runes only) · TypeScript strict
- Tailwind CSS v4 (`@tailwindcss/vite`) + Edelhaus tokens in `src/app.css`
- Shopify **Storefront API** (2025-07) via server load functions — no client fetch waterfalls
- Fonts: Bodoni* (self-hosted, SIL OFL) → Playfair Display fallback · Cormorant SC labels · Inter UI

## Getting started

```bash
npm install
cp .env.example .env   # add your Storefront API token
npm run dev
```

### Storefront API token

The Admin API token used elsewhere will NOT work here — the storefront needs a
**Storefront API access token**:

1. Shopify admin → Settings → Apps and sales channels → Develop apps
2. Create (or open) an app → Configuration → Storefront API → enable
   `unauthenticated_read_product_listings`
3. API credentials → copy the Storefront API access token into `.env` as
   `SHOPIFY_STOREFRONT_TOKEN`

**No token? No problem.** The homepage falls back to a baked-in snapshot of the
real catalog (`src/lib/data/demo.ts`), so the site always renders. Once the
token is present, live data takes over automatically — no code changes.

## Where things live

```
src/
  app.css                    Edelhaus design tokens + base styles
  lib/
    types.ts                 ProductCard / HomeShelf / HomeData
    server/shopify.ts        Storefront API client + home query (server-only)
    data/demo.ts             Catalog snapshot fallback
    components/
      Header.svelte          Hamburger + wordmark + wishlist/cart
      SearchBar.svelte       Search field + brass submit
      HeroCard.svelte        Feature card w/ cover collage
      PromoBanner.svelte     Stacked banner (brass | card | crimson variants)
      ProductCard.svelte     Cover, title, vendor, price
      ProductCarousel.svelte Shelf heading + scroll-snap rail
  routes/
    +layout.svelte           Shell: header, footer
    +error.svelte            404 / error page
    +page.server.ts          Home load (edge-cached 60s when live)
    +page.svelte             Homepage composition
    collections/[handle]/    PLP — responsive product grid
    products/[handle]/       PDP — gallery, variant select, add-to-cart action
    cart/                    Cart — qty update / remove actions, checkout handoff
    search/                  Search results (?q=)
    wishlist/                Stub (needs customer accounts)
    society/                 Newsletter landing (form is a placeholder)
```

## Cart

Cookie-backed Storefront API cart (`obscurio_cart`, httpOnly, 2 weeks):
product page `?/add` action creates the cart or appends a line; `/cart` has
`?/update` and `?/remove` actions (all progressive-enhanced with `use:enhance`,
so they work without JS too). Checkout hands off to Shopify's hosted
`checkoutUrl`. In fallback mode (no token) add-to-cart explains itself instead
of failing silently.

## Conventions (per SVELTE_RULES)

- Svelte 5 runes only — `$state`, `$derived`, `$props`; no legacy `$:`
- `let x: T = $state(init)` — annotate the variable, never the rune
- Server-only code in `src/lib/server/`; secrets via `$env/dynamic/private`
- Data loads in `+page.server.ts` — pages arrive with data, no flash
- Keyed `{#each}` blocks everywhere

## Verify

```bash
npm run check   # svelte-check — passes 0 errors / 0 warnings
npm run build   # production build — passes
```

## Next steps

- Wishlist backed by customer accounts (Storefront customer API)
- Society signup → email provider (Resend, Klaviyo, or Shopify Email)
- Collection pagination past 24 items (cursor is already in the query shape)
- Deploy: `vercel deploy --prod` (adapter-auto picks the Vercel adapter)
