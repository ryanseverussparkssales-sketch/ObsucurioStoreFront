import type { PageServerLoad } from './$types';
import { getHomeData } from '$lib/server/shopify';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const home = await getHomeData(fetch);

	if (home.live) {
		// Cache live storefront data at the edge for a minute
		setHeaders({ 'cache-control': 'public, max-age=60, stale-while-revalidate=300' });
	}

	return { home };
};
