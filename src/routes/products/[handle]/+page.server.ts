import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { addCartLine, createCart, getProduct } from '$lib/server/shopify';
import { getCartId, setCartId } from '$lib/server/cart-cookie';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	const product = await getProduct(fetch, params.handle);
	if (!product) throw error(404, 'Product not found');

	if (product.live) {
		setHeaders({ 'cache-control': 'public, max-age=60, stale-while-revalidate=300' });
	}

	return { product };
};

export const actions: Actions = {
	add: async ({ request, fetch, cookies }) => {
		const form = await request.formData();
		const variantId = String(form.get('variantId') ?? '');
		const quantity = Math.max(1, Math.min(10, Number(form.get('quantity') ?? 1) || 1));

		if (!variantId) return fail(400, { message: 'Pick a variant first.' });
		if (variantId.startsWith('demo:')) {
			return fail(400, {
				message: 'Cart is available once the Storefront API token is configured.'
			});
		}

		const cartId = getCartId(cookies);
		const cart = cartId
			? ((await addCartLine(fetch, cartId, variantId, quantity)) ??
				(await createCart(fetch, variantId, quantity)))
			: await createCart(fetch, variantId, quantity);

		if (!cart) return fail(502, { message: "Couldn't reach the cart — try again." });

		setCartId(cookies, cart.id);
		return { added: true, totalQuantity: cart.totalQuantity };
	}
};
