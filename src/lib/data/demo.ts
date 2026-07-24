import type { HomeData, ProductCard } from '$lib/types';

/**
 * Snapshot of the real Obscurio Books catalog (refreshed 2026-07-23, post
 * dropship-archive). Used as a fallback so the homepage renders before the
 * Storefront API token is wired — once SHOPIFY_STOREFRONT_ACCESS_TOKEN is set,
 * live data takes over automatically. Only kept (non-archived) products appear.
 */

const cdn = 'https://cdn.shopify.com/s/files/1/0766/1328/8128/files';

export const DEMO_HOME: HomeData = {
	hero: {
		title: "Curator's Choice",
		subtitle: 'Hand-picked books and studio finds',
		linkText: 'Browse the collection',
		href: '/collections/books',
		images: [
			`${cdn}/9780765311788-HD.jpg?v=1781553231`,
			`${cdn}/9780765376671-HD.jpg?v=1781590283`,
			`${cdn}/9781635574043-HD.jpg?v=1781595098`,
			`${cdn}/16071dfb66dd87576b0830f85a128bd6.jpg?v=1781840750`
		]
	},
	shelves: [
		{
			handle: 'books',
			title: 'Bestsellers',
			subtitle: "This year's most-read titles",
			products: [
				{ handle: 'mistborn-the-final-empire', title: 'Mistborn: The Final Empire', vendor: 'Brandon Sanderson', price: '23.99', compareAt: null, image: `${cdn}/9780765311788-HD.jpg?v=1781553231` },
				{ handle: 'the-hobbit-the-enchanting-prelude-to-the-lord-of-the-rings', title: 'The Hobbit', vendor: 'J. R. R. Tolkien', price: '11.00', compareAt: null, image: `${cdn}/9780345339683-HD.jpg?v=1781590250` },
				{ handle: 'the-fellowship-of-the-ring-the-lord-of-the-rings-part-one', title: 'The Fellowship of the Ring', vendor: 'J. R. R. Tolkien', price: '8.99', compareAt: null, image: `${cdn}/9780345339706-HD.jpg?v=1781590253` },
				{ handle: 'red-rising', title: 'Red Rising', vendor: 'Pierce Brown', price: '18.00', compareAt: null, image: `${cdn}/9780345539809-HD.jpg?v=1781590263` },
				{ handle: 'the-name-of-the-wind', title: 'The Name of the Wind', vendor: 'Patrick Rothfuss', price: '10.99', compareAt: null, image: `${cdn}/9780756404741-HD.jpg?v=1781590272` },
				{ handle: 'the-poppy-war', title: 'The Poppy War', vendor: 'R. F. Kuang', price: '22.00', compareAt: null, image: `${cdn}/9780062662583-HD.jpg?v=1781594792` },
				{ handle: 'ready-player-one', title: 'Ready Player One', vendor: 'Ernest Cline', price: '20.00', compareAt: null, image: `${cdn}/9780307887443-HD.jpg?v=1781590582` },
				{ handle: 'the-wise-mans-fear', title: "The Wise Man's Fear", vendor: 'Patrick Rothfuss', price: '11.99', compareAt: null, image: `${cdn}/9780756407919-HD.jpg?v=1781590277` }
			]
		},
		{
			handle: 'epic-fantasy',
			title: 'Epic Fantasy',
			subtitle: 'Doorstoppers worth the wrist ache',
			products: [
				{ handle: 'the-way-of-kings-book-one-of-the-stormlight-archive', title: 'The Way of Kings', vendor: 'Brandon Sanderson', price: '25.99', compareAt: null, image: `${cdn}/9780765376671-HD.jpg?v=1781590283` },
				{ handle: 'words-of-radiance-book-two-of-the-stormlight-archive', title: 'Words of Radiance', vendor: 'Brandon Sanderson', price: '27.99', compareAt: null, image: `${cdn}/9781250166531-HD.jpg?v=1781590286` },
				{ handle: 'oathbringer-book-three-of-the-stormlight-archive', title: 'Oathbringer', vendor: 'Brandon Sanderson', price: '29.99', compareAt: null, image: `${cdn}/9781250297143-HD.jpg?v=1781590290` },
				{ handle: 'wind-and-truth-book-five-of-the-stormlight-archive', title: 'Wind and Truth', vendor: 'Brandon Sanderson', price: '39.99', compareAt: null, image: `${cdn}/9781250319180-HD.jpg?v=1781590295` },
				{ handle: 'elantris-a-cosmere-novel', title: 'Elantris', vendor: 'Brandon Sanderson', price: '11.99', compareAt: null, image: `${cdn}/9780765350374-HD.jpg?v=1781595048` },
				{ handle: 'warbreaker-a-cosmere-novel', title: 'Warbreaker', vendor: 'Brandon Sanderson', price: '11.99', compareAt: null, image: `${cdn}/9780765360038-HD.jpg?v=1781595051` }
			]
		},
		{
			handle: 'romantasy',
			title: 'Romantasy',
			subtitle: 'Court intrigue and slow burns',
			products: [
				{ handle: 'house-of-earth-and-blood', title: 'House of Earth and Blood', vendor: 'Sarah J. Maas', price: '32.00', compareAt: null, image: `${cdn}/9781635574043-HD.jpg?v=1781595098` },
				{ handle: 'house-of-sky-and-breath', title: 'House of Sky and Breath', vendor: 'Sarah J. Maas', price: '19.00', compareAt: null, image: `${cdn}/9781639731756-HD.jpg?v=1781595131` },
				{ handle: 'house-of-flame-and-shadow', title: 'House of Flame and Shadow', vendor: 'Sarah J. Maas', price: '32.00', compareAt: null, image: `${cdn}/9781635574104-HD.jpg?v=1781595101` },
				{ handle: 'heir-of-fire', title: 'Heir of Fire', vendor: 'Sarah J. Maas', price: '19.00', compareAt: null, image: `${cdn}/9781639730995-HD.jpg?v=1781595113` },
				{ handle: 'queen-of-shadows', title: 'Queen of Shadows', vendor: 'Sarah J. Maas', price: '19.00', compareAt: null, image: `${cdn}/9781639731015-HD.jpg?v=1781595116` },
				{ handle: 'kingdom-of-ash', title: 'Kingdom of Ash', vendor: 'Sarah J. Maas', price: '21.00', compareAt: null, image: `${cdn}/9781639731077-HD.jpg?v=1781595125` }
			]
		},
		{
			handle: 'art-supplies-oddities',
			title: "The Maker's Shelf",
			subtitle: 'Candles, art sets, and curios from the studio',
			products: [
				{ handle: 'vibrant-172-piece-colored-pencil-set-perfect-for-adult-coloring-drawing-and-crafting-with-metallic-shades', title: '172 Colored Pencils with Metallics', vendor: 'Obscurio Books', price: '41.11', compareAt: null, image: `${cdn}/172-Colored-Pencils-Shuttle-Art-Soft-Core-Color-Pencil-Set-for-Adult-Coloring-Books-Artist-Drawing-Sketching-Crafting_d1cbc1e8-f506-45b6-b9fe-92b672cb712a.f395bca36e02af3b7281a772c85e.jpg?v=1781821004` },
				{ handle: '120-colored-pencils-set', title: '120 Colored Pencils in Presentation Tin', vendor: 'Obscurio Books', price: '80.71', compareAt: null, image: `${cdn}/16071dfb66dd87576b0830f85a128bd6.jpg?v=1781840750` },
				{ handle: '162-piece-mega-wood-box-artist-kit-with-painting-drawing-art-supplies-for-adults-24-each-watercolors-oil-pastels-pencils-60-crayons-2-brushes-art-kit-for-adults-gift-set', title: '162-Piece Mega Art Set in Wood Box', vendor: 'Obscurio Books', price: '74.52', compareAt: null, image: `${cdn}/46a4eeac6d08f20102b55e986bd04e34.jpg?v=1781840750` },
				{ handle: 'reading-light-with-stand', title: 'Reading Light with Stand', vendor: 'Obscurio Books', price: '49.99', compareAt: null, image: `${cdn}/c8c8a15b4c76b2d5760c3f16db84.jpg?v=1781559143` },
				{ handle: 'travel-candle-with-matches-pomme-cider', title: 'Travel Candle — Pomme Cider', vendor: 'Obscurio Books', price: '22.99', compareAt: null, image: `${cdn}/58f0d46d4a49a76613cdd7429c61.png?v=1781568922` }
			]
		}
	],
	live: false
};

/* ── Demo helpers (fallback mode) ───────────────────────────────────────── */

/** Titles for collections we know about, for fallback PLP headers. */
export const DEMO_COLLECTION_TITLES: Record<string, { title: string; description: string }> = {
	books: { title: 'Books', description: 'Fantasy, sci-fi, classics, and the strange in between.' },
	'epic-fantasy': { title: 'Epic Fantasy', description: 'Sprawling worlds and doorstopper sagas.' },
	romantasy: { title: 'Romantasy', description: 'Fantasy with the romance turned all the way up.' },
	'sci-fi': { title: 'Sci-Fi', description: 'Space, machines, and futures near and far.' },
	classics: { title: 'Classics', description: 'The canon, and the strange corners of it.' },
	'tabletop-role-playing': { title: 'Tabletop Role-Playing', description: 'Rulebooks, settings, and screens for the table.' },
	'board-games': { title: 'Board Games', description: 'Sealed boxes and out-of-print finds.' },
	collectibles: { title: 'Collectibles', description: 'Pins, playmats, deck boxes, and curiosities.' },
	'art-supplies-oddities': { title: "The Maker's Shelf", description: 'Candles, art sets, and curios from the studio.' },
	candles: { title: 'Candles', description: 'Small-batch scents and travel tins.' },
	'make-it-yourself': { title: 'Make It Yourself', description: 'Craft kits for slow evenings.' },
	featured: { title: 'Featured', description: 'Curiosities chosen by hand.' }
};

export function demoAllProducts(): ProductCard[] {
	const seen = new Set<string>();
	const all: ProductCard[] = [];
	for (const shelf of DEMO_HOME.shelves) {
		for (const p of shelf.products) {
			if (!seen.has(p.handle)) {
				seen.add(p.handle);
				all.push(p);
			}
		}
	}
	return all;
}

export function demoCollection(handle: string): ProductCard[] {
	const shelf = DEMO_HOME.shelves.find((s) => s.handle === handle);
	if (shelf) return shelf.products;
	if (handle === 'featured') return demoAllProducts().slice(0, 8);
	return [];
}

export function demoSearch(q: string): ProductCard[] {
	const needle = q.trim().toLowerCase();
	if (!needle) return [];
	return demoAllProducts().filter(
		(p) => p.title.toLowerCase().includes(needle) || p.vendor.toLowerCase().includes(needle)
	);
}

export function demoProduct(handle: string): ProductCard | undefined {
	return demoAllProducts().find((p) => p.handle === handle);
}
