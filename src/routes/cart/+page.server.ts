import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getCart, removeCartLine, updateCartLine } from '$lib/server/shopify';
import { clearCartId, getCartId } from '$lib/server/cart-cookie';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const cartId = getCartId(cookies);
	if (!cartId) return { cart: null };

	const cart = await getCart(fetch, cartId);
	if (!cart) clearCartId(cookies); // expired or invalid — start fresh next add
	return { cart };
};

export const actions: Actions = {
	update: async ({ request, fetch, cookies }) => {
		const cartId = getCartId(cookies);
		if (!cartId) return fail(400, { message: 'No cart yet.' });

		const form = await request.formData();
		const lineId = String(form.get('lineId') ?? '');
		const quantity = Math.max(0, Math.min(10, Number(form.get('quantity') ?? 1) || 0));
		if (!lineId) return fail(400, { message: 'Missing line.' });

		const cart =
			quantity === 0
				? await removeCartLine(fetch, cartId, lineId)
				: await updateCartLine(fetch, cartId, lineId, quantity);

		if (!cart) return fail(502, { message: "Couldn't update the cart — try again." });
		return { updated: true };
	},

	remove: async ({ request, fetch, cookies }) => {
		const cartId = getCartId(cookies);
		if (!cartId) return fail(400, { message: 'No cart yet.' });

		const form = await request.formData();
		const lineId = String(form.get('lineId') ?? '');
		if (!lineId) return fail(400, { message: 'Missing line.' });

		const cart = await removeCartLine(fetch, cartId, lineId);
		if (!cart) return fail(502, { message: "Couldn't update the cart — try again." });
		return { updated: true };
	}
};
