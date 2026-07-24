export interface ProductCard {
	handle: string;
	title: string;
	vendor: string;
	price: string; // min variant price, e.g. "23.99"
	compareAt?: string | null;
	image: string | null;
	imageAlt?: string;
}

export interface HomeShelf {
	handle: string; // collection handle
	title: string; // display title
	subtitle: string; // one-liner under the title
	products: ProductCard[];
}

export interface CollectionPage {
	handle: string;
	title: string;
	description: string;
	products: ProductCard[];
	live: boolean;
}

export interface VariantInfo {
	id: string; // gid://shopify/ProductVariant/...
	title: string;
	price: string;
	compareAt: string | null;
	available: boolean;
}

export interface ProductDetail {
	handle: string;
	title: string;
	vendor: string;
	descriptionHtml: string;
	images: Array<{ url: string; alt: string }>;
	variants: VariantInfo[];
	live: boolean;
}

export interface CartLine {
	id: string; // cart line id
	quantity: number;
	variantTitle: string;
	productTitle: string;
	productHandle: string;
	image: string | null;
	price: string; // per-unit
	lineTotal: string;
}

export interface CartInfo {
	id: string;
	checkoutUrl: string;
	totalQuantity: number;
	subtotal: string;
	lines: CartLine[];
}

export interface HomeData {
	hero: {
		title: string;
		subtitle: string;
		linkText: string;
		href: string;
		images: string[]; // collage images
	};
	shelves: HomeShelf[];
	live: boolean; // true when data came from the Storefront API
}
