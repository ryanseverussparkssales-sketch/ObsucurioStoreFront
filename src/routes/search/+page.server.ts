import type { PageServerLoad } from './$types';
import { searchProducts } from '$lib/server/shopify';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const q = url.searchParams.get('q') ?? '';
	const results = await searchProducts(fetch, q);
	return { q, ...results };
};
