import { env } from '$env/dynamic/private';
import type {
	CartInfo,
	CollectionPage,
	HomeData,
	HomeShelf,
	ProductCard,
	ProductDetail
} from '$lib/types';
import {
	DEMO_HOME,
	DEMO_COLLECTION_TITLES,
	demoCollection,
	demoProduct,
	demoSearch
} from '$lib/data/demo';

/**
 * Shopify Storefront API client.
 *
 * Env (see .env.example) — matches the names the store already uses:
 *   SHOPIFY_STORE_DOMAIN            e.g. vercel-store-a45cd659.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN Storefront API access token (NOT the Admin token)
 *
 * When the token is missing or the API errors, we fall back to the baked-in
 * demo snapshot (real Obscurio catalog data) so the site always renders.
 */

const API_VERSION = '2025-07';

async function storefront<T>(
	fetcher: typeof fetch,
	query: string,
	variables: Record<string, unknown> = {}
): Promise<T> {
	const domain = env.SHOPIFY_STORE_DOMAIN;
	const token = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
	if (!domain || !token) throw new Error('storefront-not-configured');

	const res = await fetcher(`https://${domain}/api/${API_VERSION}/graphql.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': token
		},
		body: JSON.stringify({ query, variables })
	});

	if (!res.ok) throw new Error(`storefront ${res.status}`);
	const json = (await res.json()) as { data?: T; errors?: unknown[] };
	if (json.errors?.length) {
		console.error('[shopify] graphql errors:', JSON.stringify(json.errors).slice(0, 500));
		throw new Error('storefront-graphql-error');
	}
	if (!json.data) throw new Error('storefront-empty');
	return json.data;
}

/* ── Home page data ─────────────────────────────────────────────────────── */

// Shelves shown on the homepage, in order. Handles are real collections.
const SHELVES: Array<{ handle: string; title: string; subtitle: string }> = [
	{ handle: 'books', title: 'Bestsellers', subtitle: "This year's most-read titles" },
	{ handle: 'epic-fantasy', title: 'Epic Fantasy', subtitle: 'Doorstoppers worth the wrist ache' },
	{ handle: 'romantasy', title: 'Romantasy', subtitle: 'Court intrigue and slow burns' },
	{ handle: 'tabletop-role-playing', title: 'Tabletop Role-Playing', subtitle: 'Rulebooks, settings, and screens' },
	{ handle: 'board-games', title: 'Board Games', subtitle: 'Sealed boxes and out-of-print finds' },
	{ handle: 'collectibles', title: 'Collectibles', subtitle: 'Pins, playmats, and curiosities' },
	{ handle: 'art-supplies-oddities', title: "The Maker's Shelf", subtitle: 'Candles, art sets, and curios from the studio' }
];

// Collage source for the hero — books always has stock, so it never looks thin.
const HERO_COLLECTION = 'books';

const SHELF_FRAGMENT = /* GraphQL */ `
	fragment ShelfFields on Collection {
		handle
		title
		products(first: 8) {
			nodes {
				handle
				title
				vendor
				featuredImage {
					url(transform: { maxWidth: 480 })
					altText
				}
				priceRange {
					minVariantPrice {
						amount
					}
				}
				compareAtPriceRange {
					minVariantPrice {
						amount
					}
				}
			}
		}
	}
`;

interface GqlProduct {
	handle: string;
	title: string;
	vendor: string;
	featuredImage: { url: string; altText: string | null } | null;
	priceRange: { minVariantPrice: { amount: string } };
	compareAtPriceRange: { minVariantPrice: { amount: string } } | null;
}
interface GqlShelf {
	handle: string;
	title: string;
	products: { nodes: GqlProduct[] };
}

function toCard(p: GqlProduct): ProductCard {
	const price = Number(p.priceRange.minVariantPrice.amount);
	const compare = Number(p.compareAtPriceRange?.minVariantPrice.amount ?? 0);
	return {
		handle: p.handle,
		title: p.title,
		vendor: p.vendor,
		price: price.toFixed(2),
		compareAt: compare > price ? compare.toFixed(2) : null,
		image: p.featuredImage?.url ?? null,
		imageAlt: p.featuredImage?.altText ?? p.title
	};
}

export async function getHomeData(fetcher: typeof fetch): Promise<HomeData> {
	// Build one query with an alias per shelf, so the shelf list stays data-driven.
	// Handles are our own trusted constants — safe to inline.
	const aliases = SHELVES.map(
		(s, i) => `s${i}: collection(handle: "${s.handle}") { ...ShelfFields }`
	).join('\n\t\t\t');
	const query = /* GraphQL */ `
		query HomePage {
			hero: collection(handle: "${HERO_COLLECTION}") { ...ShelfFields }
			${aliases}
		}
		${SHELF_FRAGMENT}
	`;

	try {
		const data = await storefront<Record<string, GqlShelf | null>>(fetcher, query);

		const shelves: HomeShelf[] = SHELVES.map((meta, i) => ({
			handle: meta.handle,
			title: meta.title,
			subtitle: meta.subtitle,
			products: (data[`s${i}`]?.products.nodes ?? []).map(toCard)
		})).filter((s) => s.products.length > 0);

		const heroImages = (data.hero?.products.nodes ?? [])
			.map((p) => p.featuredImage?.url)
			.filter((u): u is string => Boolean(u))
			.slice(0, 4);

		return {
			hero: {
				title: "Curator's Choice",
				subtitle: 'Hand-picked books and studio finds',
				linkText: 'Browse the collection',
				href: '/collections/books',
				images: heroImages.length ? heroImages : DEMO_HOME.hero.images
			},
			shelves: shelves.length ? shelves : DEMO_HOME.shelves,
			live: true
		};
	} catch (err) {
		if ((err as Error).message !== 'storefront-not-configured') {
			console.error('[shopify] falling back to demo data:', err);
		}
		return DEMO_HOME;
	}
}

/* ── Collection page ────────────────────────────────────────────────────── */

const COLLECTION_QUERY = /* GraphQL */ `
	query CollectionPage($handle: String!, $first: Int!) {
		collection(handle: $handle) {
			handle
			title
			description
			products(first: $first) {
				nodes {
					handle
					title
					vendor
					featuredImage {
						url(transform: { maxWidth: 480 })
						altText
					}
					priceRange {
						minVariantPrice {
							amount
						}
					}
					compareAtPriceRange {
						minVariantPrice {
							amount
						}
					}
				}
			}
		}
	}
`;

export async function getCollection(
	fetcher: typeof fetch,
	handle: string
): Promise<CollectionPage | null> {
	try {
		const data = await storefront<{
			collection: (GqlShelf & { description: string }) | null;
		}>(fetcher, COLLECTION_QUERY, { handle, first: 24 });
		if (!data.collection) return null;
		return {
			handle,
			title: data.collection.title,
			description: data.collection.description ?? '',
			products: data.collection.products.nodes.map(toCard),
			live: true
		};
	} catch {
		const products = demoCollection(handle);
		const meta = DEMO_COLLECTION_TITLES[handle];
		if (!products.length && !meta) return null;
		return {
			handle,
			title: meta?.title ?? handle,
			description: meta?.description ?? '',
			products,
			live: false
		};
	}
}

/* ── Product detail ─────────────────────────────────────────────────────── */

const PRODUCT_QUERY = /* GraphQL */ `
	query ProductPage($handle: String!) {
		product(handle: $handle) {
			handle
			title
			vendor
			descriptionHtml
			images(first: 8) {
				nodes {
					url(transform: { maxWidth: 900 })
					altText
				}
			}
			variants(first: 100) {
				nodes {
					id
					title
					availableForSale
					price {
						amount
					}
					compareAtPrice {
						amount
					}
				}
			}
		}
	}
`;

interface GqlProductDetail {
	handle: string;
	title: string;
	vendor: string;
	descriptionHtml: string;
	images: { nodes: Array<{ url: string; altText: string | null }> };
	variants: {
		nodes: Array<{
			id: string;
			title: string;
			availableForSale: boolean;
			price: { amount: string };
			compareAtPrice: { amount: string } | null;
		}>;
	};
}

export async function getProduct(
	fetcher: typeof fetch,
	handle: string
): Promise<ProductDetail | null> {
	try {
		const data = await storefront<{ product: GqlProductDetail | null }>(fetcher, PRODUCT_QUERY, {
			handle
		});
		if (!data.product) return null;
		const p = data.product;
		return {
			handle: p.handle,
			title: p.title,
			vendor: p.vendor,
			descriptionHtml: p.descriptionHtml,
			images: p.images.nodes.map((i) => ({ url: i.url, alt: i.altText ?? p.title })),
			variants: p.variants.nodes.map((v) => {
				const price = Number(v.price.amount);
				const compare = Number(v.compareAtPrice?.amount ?? 0);
				return {
					id: v.id,
					title: v.title,
					price: price.toFixed(2),
					compareAt: compare > price ? compare.toFixed(2) : null,
					available: v.availableForSale
				};
			}),
			live: true
		};
	} catch {
		const card = demoProduct(handle);
		if (!card) return null;
		return {
			handle: card.handle,
			title: card.title,
			vendor: card.vendor,
			descriptionHtml:
				'<p>Full description arrives with the live catalog — connect the Storefront API token to load it.</p>',
			images: card.image ? [{ url: card.image, alt: card.title }] : [],
			variants: [
				{
					id: `demo:${card.handle}`,
					title: 'Default',
					price: card.price,
					compareAt: card.compareAt ?? null,
					available: false
				}
			],
			live: false
		};
	}
}

/* ── Search ─────────────────────────────────────────────────────────────── */

const SEARCH_QUERY = /* GraphQL */ `
	query SearchProducts($q: String!, $first: Int!) {
		products(first: $first, query: $q) {
			nodes {
				handle
				title
				vendor
				featuredImage {
					url(transform: { maxWidth: 480 })
					altText
				}
				priceRange {
					minVariantPrice {
						amount
					}
				}
				compareAtPriceRange {
					minVariantPrice {
						amount
					}
				}
			}
		}
	}
`;

export async function searchProducts(
	fetcher: typeof fetch,
	q: string
): Promise<{ products: ProductCard[]; live: boolean }> {
	if (!q.trim()) return { products: [], live: true };
	try {
		const data = await storefront<{ products: { nodes: GqlProduct[] } }>(fetcher, SEARCH_QUERY, {
			q,
			first: 24
		});
		return { products: data.products.nodes.map(toCard), live: true };
	} catch {
		return { products: demoSearch(q), live: false };
	}
}

/* ── Cart ───────────────────────────────────────────────────────────────── */

const CART_FIELDS = /* GraphQL */ `
	fragment CartFields on Cart {
		id
		checkoutUrl
		totalQuantity
		cost {
			subtotalAmount {
				amount
			}
		}
		lines(first: 50) {
			nodes {
				id
				quantity
				merchandise {
					... on ProductVariant {
						title
						price {
							amount
						}
						product {
							title
							handle
							featuredImage {
								url(transform: { maxWidth: 240 })
							}
						}
					}
				}
			}
		}
	}
`;

interface GqlCart {
	id: string;
	checkoutUrl: string;
	totalQuantity: number;
	cost: { subtotalAmount: { amount: string } };
	lines: {
		nodes: Array<{
			id: string;
			quantity: number;
			merchandise: {
				title: string;
				price: { amount: string };
				product: { title: string; handle: string; featuredImage: { url: string } | null };
			};
		}>;
	};
}

function toCart(c: GqlCart): CartInfo {
	return {
		id: c.id,
		checkoutUrl: c.checkoutUrl,
		totalQuantity: c.totalQuantity,
		subtotal: Number(c.cost.subtotalAmount.amount).toFixed(2),
		lines: c.lines.nodes.map((l) => ({
			id: l.id,
			quantity: l.quantity,
			variantTitle: l.merchandise.title,
			productTitle: l.merchandise.product.title,
			productHandle: l.merchandise.product.handle,
			image: l.merchandise.product.featuredImage?.url ?? null,
			price: Number(l.merchandise.price.amount).toFixed(2),
			lineTotal: (Number(l.merchandise.price.amount) * l.quantity).toFixed(2)
		}))
	};
}

export async function getCart(fetcher: typeof fetch, cartId: string): Promise<CartInfo | null> {
	try {
		const data = await storefront<{ cart: GqlCart | null }>(
			fetcher,
			`${CART_FIELDS} query GetCart($id: ID!) { cart(id: $id) { ...CartFields } }`,
			{ id: cartId }
		);
		return data.cart ? toCart(data.cart) : null;
	} catch {
		return null;
	}
}

export async function createCart(
	fetcher: typeof fetch,
	variantId: string,
	quantity: number
): Promise<CartInfo | null> {
	try {
		const data = await storefront<{ cartCreate: { cart: GqlCart | null } }>(
			fetcher,
			`${CART_FIELDS} mutation CreateCart($lines: [CartLineInput!]!) {
				cartCreate(input: { lines: $lines }) { cart { ...CartFields } }
			}`,
			{ lines: [{ merchandiseId: variantId, quantity }] }
		);
		return data.cartCreate.cart ? toCart(data.cartCreate.cart) : null;
	} catch {
		return null;
	}
}

export async function addCartLine(
	fetcher: typeof fetch,
	cartId: string,
	variantId: string,
	quantity: number
): Promise<CartInfo | null> {
	try {
		const data = await storefront<{ cartLinesAdd: { cart: GqlCart | null } }>(
			fetcher,
			`${CART_FIELDS} mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
				cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
			}`,
			{ cartId, lines: [{ merchandiseId: variantId, quantity }] }
		);
		return data.cartLinesAdd.cart ? toCart(data.cartLinesAdd.cart) : null;
	} catch {
		return null;
	}
}

export async function updateCartLine(
	fetcher: typeof fetch,
	cartId: string,
	lineId: string,
	quantity: number
): Promise<CartInfo | null> {
	try {
		const data = await storefront<{ cartLinesUpdate: { cart: GqlCart | null } }>(
			fetcher,
			`${CART_FIELDS} mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
				cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
			}`,
			{ cartId, lines: [{ id: lineId, quantity }] }
		);
		return data.cartLinesUpdate.cart ? toCart(data.cartLinesUpdate.cart) : null;
	} catch {
		return null;
	}
}

export async function removeCartLine(
	fetcher: typeof fetch,
	cartId: string,
	lineId: string
): Promise<CartInfo | null> {
	try {
		const data = await storefront<{ cartLinesRemove: { cart: GqlCart | null } }>(
			fetcher,
			`${CART_FIELDS} mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
				cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
			}`,
			{ cartId, lineIds: [lineId] }
		);
		return data.cartLinesRemove.cart ? toCart(data.cartLinesRemove.cart) : null;
	} catch {
		return null;
	}
}
