import type { Cookies } from '@sveltejs/kit';

const CART_COOKIE = 'obscurio_cart';

export function getCartId(cookies: Cookies): string | null {
	return cookies.get(CART_COOKIE) ?? null;
}

export function setCartId(cookies: Cookies, cartId: string): void {
	cookies.set(CART_COOKIE, cartId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 14 // 2 weeks
	});
}

export function clearCartId(cookies: Cookies): void {
	cookies.delete(CART_COOKIE, { path: '/' });
}
