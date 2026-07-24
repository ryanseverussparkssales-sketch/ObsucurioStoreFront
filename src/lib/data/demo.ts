import type { HomeData, ProductCard } from '$lib/types';

/**
 * Snapshot of the real Obscurio Books catalog (pulled 2026-07-23 via Admin API).
 * Used as a fallback so the homepage renders before the Storefront API token
 * is configured — swap-free: once SHOPIFY_STOREFRONT_TOKEN is set, live data
 * takes over automatically.
 */

const cdn = 'https://cdn.shopify.com/s/files/1/0766/1328/8128/files';

export const DEMO_HOME: HomeData = {
	hero: {
		title: "Curator's Choice",
		subtitle: '8 featured curiosities, chosen by hand',
		linkText: 'Browse the featured shelf',
		href: '/collections/featured',
		images: [
			`${cdn}/9780765311788-HD.jpg?v=1781553231`,
			`${cdn}/87fa059f4c0ebe42c8a58148f7d3.jpg?v=1781551767`,
			`${cdn}/9741757520180_.pic_hd.jpg?v=1781556200`,
			`${cdn}/8b4927034770a6b04b9e9738102b.png?v=1781551864`
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
				{ handle: 'a-storm-of-swords', title: 'A Storm of Swords', vendor: 'George R. R. Martin', price: '10.99', compareAt: null, image: `${cdn}/9780553573428-HD.jpg?v=1781590267` },
				{ handle: 'a-clash-of-kings', title: 'A Clash of Kings', vendor: 'George R. R. Martin', price: '10.99', compareAt: null, image: `${cdn}/9780553579901-HD.jpg?v=1781590270` },
				{ handle: 'the-wise-mans-fear', title: "The Wise Man's Fear", vendor: 'Patrick Rothfuss', price: '11.99', compareAt: null, image: `${cdn}/9780756407919-HD.jpg?v=1781590277` }
			]
		},
		{
			handle: 'occult',
			title: 'Tarot & Divination',
			subtitle: 'Decks, pendulums, and quiet rituals',
			products: [
				{ handle: 'kledery-tarot-cards-for-beginners-classic-tarot-cards-with-meanings-on-them-durable-tarot-cards-with-guide-book-for-beginners-black', title: "Beginner's Tarot Deck — Waite-Smith", vendor: 'Obscurio Books', price: '59.00', compareAt: null, image: `${cdn}/87fa059f4c0ebe42c8a58148f7d3.jpg?v=1781551767` },
				{ handle: 'knana-tarot-divination-kit-pendulum-board-astro-dice', title: 'Tarot Divination Kit — Pendulum & Astro Dice', vendor: 'Obscurio Books', price: '79.00', compareAt: null, image: `${cdn}/3055b3ca4ccea2f102f67abf26b3.jpg?v=1781551826` },
				{ handle: 'wyspell-beginner-tarot-with-guidebook', title: 'Wyspell Beginner Tarot with Guidebook', vendor: 'Obscurio Books', price: '89.00', compareAt: null, image: `${cdn}/ff2dab674a84bc531976e1859659.jpg?v=1781551808` },
				{ handle: 'lunar-phase-embossed-tarot-case', title: 'Lunar Phase Embossed Tarot Case', vendor: 'Obscurio Books', price: '75.00', compareAt: null, image: `${cdn}/64f597fd4fe6b3dcfc9fc3fe324b.jpg?v=1781551836` },
				{ handle: 'mystic-tarot-psychedelic-tapestry', title: 'Mystic Tarot Psychedelic Tapestry', vendor: 'Obscurio Books', price: '29.00', compareAt: null, image: `${cdn}/8387aa5f49c8af255e353d7868a7.webp?v=1781551742` },
				{ handle: 'travel-candle-with-matches-pomme-cider', title: 'Travel Candle — Pomme Cider', vendor: 'Obscurio Books', price: '22.99', compareAt: null, image: `${cdn}/58f0d46d4a49a76613cdd7429c61.png?v=1781568922` }
			]
		},
		{
			handle: 'open-source-tech',
			title: 'Reading Tech',
			subtitle: 'E-readers and open hardware for readers',
			products: [
				{ handle: 'xteink-x4-pocket-e-reader-developer-edition-space-black', title: 'XTEINK X4 Pocket E-Reader — Dev Edition', vendor: 'XTEINK', price: '69.00', compareAt: null, image: `${cdn}/9741757520180_.pic_hd.jpg?v=1781556200` },
				{ handle: 'xteink-x3-pocket-e-reader-developer-edition', title: 'XTEINK X3 Pocket E-Reader — Dev Edition', vendor: 'XTEINK', price: '79.00', compareAt: null, image: `${cdn}/3_23c30e7f-e418-4f98-b591-4605ebd516a6.jpg?v=1781556210` },
				{ handle: 'lenovo-tab-m9-9-hd-64gb-wifi-mediatek-helio-g80-tablet-android-12-with-b-n-nook-hd-e-reader-renewed', title: 'Lenovo Tab M9 with Nook E-Reader', vendor: 'Obscurio Books', price: '349.00', compareAt: null, image: `${cdn}/ae7e74fa4f529301335b78e5e657.jpg?v=1781551678` },
				{ handle: 'mp3-player-music-player-with-32gb-micro-sd-card-earphonebuild-in-speaker-photo-video-play-fm-radio-voice-recorder-e-book-reader-supports-up-to-128gb-for-kidsrunningwalking', title: 'Pocket MP3 Player — 32GB, FM & Recorder', vendor: 'Obscurio Books', price: '119.00', compareAt: null, image: `${cdn}/70539c89427da13b5d8a9eff6d47.jpg?v=1781551649` },
				{ handle: 'vintage-capture-mini-camera', title: 'Retro Mini Camera — 1080p Pocket Cam', vendor: 'Obscurio Books', price: '69.00', compareAt: null, image: `${cdn}/8eff04c24b298ac200ab38c7919c.jpg?v=1781551600` }
			]
		},
		{
			handle: 'decor',
			title: 'The Reading Nook',
			subtitle: 'Lamps, lights, and cozy corners',
			products: [
				{ handle: 'vintage-books-table-lamp', title: 'Vintage Books Table Lamp', vendor: 'Obscurio Books', price: '65.00', compareAt: null, image: `${cdn}/8b4927034770a6b04b9e9738102b.png?v=1781551864` },
				{ handle: 'reading-light-with-stand', title: 'Reading Light with Stand', vendor: 'Obscurio Books', price: '49.99', compareAt: null, image: `${cdn}/c8c8a15b4c76b2d5760c3f16db84.jpg?v=1781559143` },
				{ handle: 'wireless-magnetic-led-reading-light', title: 'Wireless Magnetic LED Reading Light', vendor: 'Obscurio Books', price: '24.99', compareAt: null, image: `${cdn}/0a78862f49c5a90e7d5bf9234698.png?v=1781559205` },
				{ handle: 'lazy-periscope-horizontal-reading-glasses', title: 'Lazy Periscope Reading Glasses', vendor: 'Obscurio Books', price: '19.99', compareAt: null, image: `${cdn}/2084d66c431cab6cc65ee756219a.png?v=1781559183` },
				{ handle: 'thick-pulp-watercolor-book', title: 'Thick Pulp Watercolor Book', vendor: 'Obscurio Books', price: '18.99', compareAt: null, image: `${cdn}/9b90a58d4319a909ab336d1e843c.png?v=1781559270` }
			]
		}
	],
	live: false
};

/* ── Demo helpers (fallback mode) ───────────────────────────────────────── */

/** Titles for collections we know about, for fallback PLP headers. */
export const DEMO_COLLECTION_TITLES: Record<string, { title: string; description: string }> = {
	books: { title: 'Books', description: 'Fantasy, sci-fi, classics, and the strange in between.' },
	occult: { title: 'Occult', description: 'Tarot, divination, candles, and quiet rituals.' },
	'open-source-tech': { title: 'Open Source Tech', description: 'E-readers and open hardware for readers.' },
	decor: { title: 'Decor', description: 'Lamps, lights, and cozy corners.' },
	'art-supplies-oddities': { title: 'Art Supplies & Oddities', description: 'Tools for making, and things with no explanation.' },
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
