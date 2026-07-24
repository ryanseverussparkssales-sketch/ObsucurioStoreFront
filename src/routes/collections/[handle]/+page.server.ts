import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCollection } from '$lib/server/shopify';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const collection = await getCollection(fetch, params.handle);
	if (!collection) throw error(404, 'Collection not found');

	if (collection.live) {
		setHeaders({ 'cache-control': 'public, max-age=60, stale-while-revalidate=300' });
	}

	return { collection };
};
