/**
 * PRODUCT CATALOG
 * ----------------------------------------------------------------------
 * This is the single source of truth for every product on the site.
 * Add a new product by adding a new object to `products` below — no UI
 * component needs to change. ProductCard, the Product detail page, the
 * Shop grid/filters and the homepage sections all read from this file
 * (or the helpers in src/utils/product.js) rather than hardcoding
 * products anywhere.
 *
 * New to editing this file? See WEBSITE-EDITING-GUIDE.md in the
 * project root for plain-language, step-by-step instructions (no
 * coding experience needed).
 *
 * These ~14 items are DEVELOPMENT/SAMPLE data with fictional names.
 * Replace them with the real catalog whenever ready, keeping the same
 * field shape.
 *
 * Field reference:
 *  id               stable internal id, e.g. "su-001"
 *  slug             URL-friendly id used in /product/:slug, must be unique
 *  name             display name
 *  description      1-2 sentence product description
 *  category         "shoes" | "clothing"
 *  subcategory      e.g. "Sneakers", "Oversized Tees" — free text, used
 *                    for related-product matching and future sub-filters
 *  price            current price in GHS (number, no symbol)
 *  compareAtPrice   original price if on sale, else null
 *  images           array of photos for the product gallery, in order.
 *                    Two options for each entry:
 *                      - a real photo: upload the file to public/images/
 *                        then write its path, e.g. "/images/apex-runner-1.jpg"
 *                      - no photo yet: write a short plain-text label,
 *                        e.g. "Apex Runner — Front", and a placeholder
 *                        block is shown instead (never a broken image)
 *  thumbnail        photo (or label) used in the shop grid/cards —
 *                    same rules as `images` above, usually matches images[0]
 *  colors           array of { name, hex } — [] if the product has no
 *                    color variants
 *  sizes            ALL sizes this product is offered in
 *  availableSizes   subset of `sizes` currently in stock (drives the
 *                    disabled state in the size selector)
 *  stock            total units left across available sizes (number)
 *  featured         true = shown first in the shop's default sort order
 *  newArrival       shown in "New Arrivals"
 *  bigAndTall       true if this product is part of the Big & Tall range
 *  badge            "NEW" | "LIMITED" | "SALE" | null (auto-derived if
 *                    left null and compareAtPrice is set — see
 *                    resolveBadge in src/utils/product.js)
 *  tags             free-text tags used by search & collections
 *  features         short bullet list, e.g. ["Lightweight", "Breathable"]
 */

// ========================================
// ADD OR EDIT PRODUCTS BELOW
// ========================================

export const products = [
  {
    id: 'su-001',
    slug: 'su-apex-runner',
    name: 'SU Apex Runner',
    description:
      'A lightweight everyday runner built for all-day comfort, with a clean profile that pairs with anything.',
    category: 'shoes',
    subcategory: 'Runners',
    price: 650,
    compareAtPrice: null,
    images:["/images/photo_2026-04-12_22-36-22 (2).jpg"] ,
    thumbnail: 'Apex Runner — Front',
    colors: [
      { name: 'Off-White', hex: '#F5F3EE' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: ['EU 45', 'EU 46', 'EU 47'],
    stock: 14,
    featured: true,
    newArrival: true,
    bigAndTall: false,
    badge: 'NEW',
    tags: ['runner', 'sneaker', 'lightweight', 'everyday'],
    features: ['Lightweight', 'Cushioned sole', 'Breathable upper'],
  },
  {
    id: 'su-002',
    slug: 'su-urban-runner',
    name: 'SU Urban Runner',
    description:
      'A street-ready runner with a chunkier sole and a bold silhouette, made for city miles.',
    category: 'shoes',
    subcategory: 'Runners',
    price: 690,
    compareAtPrice: 790,
    images: ['Urban Runner — Front', 'Urban Runner — Side'],
    thumbnail: 'Urban Runner — Front',
    colors: [
      { name: 'Charcoal', hex: '#1C1C1B' },
      { name: 'Stone', hex: '#8C6F4E' },
    ],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: ['EU 45', 'EU 47'],
    stock: 6,
    featured: true,
    newArrival: false,
    bigAndTall: false,
    badge: null,
    tags: ['runner', 'sneaker', 'streetwear'],
    features: ['Chunky sole', 'Reinforced toe', 'Everyday fit'],
  },
  {
    id: 'su-003',
    slug: 'su-core-sneaker',
    name: 'SU Core Sneaker',
    description: 'A minimal court-inspired sneaker that works from the office to the weekend.',
    category: 'shoes',
    subcategory: 'Sneakers',
    price: 480,
    compareAtPrice: null,
    images: ['Core Sneaker — Front', 'Core Sneaker — Side'],
    thumbnail: 'Core Sneaker — Front',
    colors: [{ name: 'White', hex: '#FAFAF8' }],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: ['EU 45', 'EU 46', 'EU 47'],
    stock: 20,
    featured: false,
    newArrival: false,
    bigAndTall: false,
    badge: null,
    tags: ['sneaker', 'court', 'minimal', 'white'],
    features: ['Clean silhouette', 'Durable outsole'],
  },
  {
    id: 'su-004',
    slug: 'su-motion-trainer',
    name: 'SU Motion Trainer',
    description: 'A flexible training shoe with responsive cushioning built for movement.',
    category: 'shoes',
    subcategory: 'Runners',
    price: 610,
    compareAtPrice: null,
    images: ['Motion Trainer — Front', 'Motion Trainer — Side'],
    thumbnail: 'Motion Trainer — Front',
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Grey', hex: '#8A8A85' },
    ],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: ['EU 46'],
    stock: 2,
    featured: false,
    newArrival: true,
    bigAndTall: false,
    badge: 'NEW',
    tags: ['trainer', 'sneaker', 'flexible'],
    features: ['Responsive cushioning', 'Flexible outsole', 'Breathable mesh'],
  },
  {
    id: 'su-005',
    slug: 'su-street-runner',
    name: 'SU Street Runner',
    description: 'A bold two-tone runner designed to be the statement piece of any fit.',
    category: 'shoes',
    subcategory: 'Streetwear Shoes',
    price: 720,
    compareAtPrice: null,
    images: ['Street Runner — Front', 'Street Runner — Side'],
    thumbnail: 'Street Runner — Front',
    colors: [{ name: 'Tan / Black', hex: '#8C6F4E' }],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: [],
    stock: 0,
    featured: false,
    newArrival: false,
    bigAndTall: false,
    badge: 'LIMITED',
    tags: ['streetwear', 'sneaker', 'statement'],
    features: ['Statement silhouette', 'Premium feel'],
  },
  {
    id: 'su-006',
    slug: 'su-essential-court',
    name: 'SU Essential Court',
    description: 'A no-fuss court sneaker built as a daily wardrobe staple.',
    category: 'shoes',
    subcategory: 'Casual Shoes',
    price: 420,
    compareAtPrice: null,
    images: ['Essential Court — Front', 'Essential Court — Side'],
    thumbnail: 'Essential Court — Front',
    colors: [
      { name: 'White', hex: '#FAFAF8' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    sizes: ['EU 45', 'EU 46', 'EU 47'],
    availableSizes: ['EU 45', 'EU 46', 'EU 47'],
    stock: 18,
    featured: true,
    newArrival: false,
    bigAndTall: false,
    badge: null,
    tags: ['court', 'casual', 'staple'],
    features: ['Everyday comfort', 'Durable build'],
  },
  {
    id: 'su-007',
    slug: 'su-essential-tee',
    name: 'SU Essential Tee',
    description: 'A soft, true-to-size everyday tee in a premium heavyweight cotton.',
    category: 'clothing',
    subcategory: 'T-Shirts',
    price: 150,
    compareAtPrice: null,
    images: ['Essential Tee — Front', 'Essential Tee — Back'],
    thumbnail: 'Essential Tee — Front',
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Off-White', hex: '#F5F3EE' },
      { name: 'Charcoal', hex: '#1C1C1B' },
    ],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL', '4XL'],
    stock: 40,
    featured: true,
    newArrival: false,
    bigAndTall: true,
    badge: null,
    tags: ['tee', 'essential', 'cotton', 'big and tall'],
    features: ['Heavyweight cotton', 'True to size', 'Everyday fit'],
  },
  {
    id: 'su-008',
    slug: 'su-heavyweight-oversized-tee',
    name: 'SU Heavyweight Oversized Tee',
    description: 'A boxy, oversized tee in heavyweight cotton for an off-duty streetwear fit.',
    category: 'clothing',
    subcategory: 'Oversized Tees',
    price: 180,
    compareAtPrice: null,
    images: ['Oversized Tee — Charcoal Front', 'Oversized Tee — Charcoal Back'],
    thumbnail: 'Oversized Tee — Charcoal Front',
    colors: [
      { name: 'Charcoal', hex: '#1C1C1B' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL', '4XL'],
    stock: 25,
    featured: false,
    newArrival: true,
    bigAndTall: true,
    badge: 'NEW',
    tags: ['tee', 'oversized', 'streetwear', 'big and tall'],
    features: ['Oversized cut', 'Heavyweight cotton', 'Drop shoulder'],
  },
  {
    id: 'su-009',
    slug: 'su-signature-graphic-tee',
    name: 'SU Signature Graphic Tee',
    description: 'A graphic tee featuring a subtle Style Universe print for a statement everyday look.',
    category: 'clothing',
    subcategory: 'Graphic Tees',
    price: 190,
    compareAtPrice: 220,
    images: ['Graphic Tee — Front', 'Graphic Tee — Back'],
    thumbnail: 'Graphic Tee — Front',
    colors: [{ name: 'Black', hex: '#0A0A0A' }],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL'],
    stock: 9,
    featured: false,
    newArrival: false,
    bigAndTall: true,
    badge: null,
    tags: ['tee', 'graphic', 'streetwear', 'big and tall'],
    features: ['Screen-printed graphic', 'Relaxed fit'],
  },
  {
    id: 'su-010',
    slug: 'su-core-jogger',
    name: 'SU Core Jogger',
    description: 'A tapered jogger in a soft brushed-back fleece, built for everyday comfort.',
    category: 'clothing',
    subcategory: 'Joggers',
    price: 320,
    compareAtPrice: null,
    images: ['Core Jogger — Black', 'Core Jogger — Detail'],
    thumbnail: 'Core Jogger — Black',
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Grey', hex: '#8A8A85' },
    ],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL', '4XL'],
    stock: 22,
    featured: true,
    newArrival: false,
    bigAndTall: true,
    badge: null,
    tags: ['jogger', 'pants', 'fleece', 'big and tall'],
    features: ['Brushed-back fleece', 'Tapered leg', 'Elastic waistband'],
  },
  {
    id: 'su-011',
    slug: 'su-street-jort',
    name: 'SU Street Jort',
    description: 'A relaxed denim jort with a durable finish, built for warm-weather streetwear.',
    category: 'clothing',
    subcategory: 'Jorts',
    price: 280,
    compareAtPrice: null,
    images: ['Street Jort — Front', 'Street Jort — Back'],
    thumbnail: 'Street Jort — Front',
    colors: [{ name: 'Washed Black', hex: '#1C1C1B' }],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL'],
    stock: 4,
    featured: false,
    newArrival: false,
    bigAndTall: true,
    badge: null,
    tags: ['jort', 'denim', 'streetwear', 'big and tall'],
    features: ['Durable denim', 'Relaxed fit'],
  },
  {
    id: 'su-012',
    slug: 'su-everyday-jogger',
    name: 'SU Everyday Jogger',
    description: 'A go-to lightweight jogger for travel, training or a low-key day out.',
    category: 'clothing',
    subcategory: 'Joggers',
    price: 300,
    compareAtPrice: null,
    images: ['Everyday Jogger — Stone', 'Everyday Jogger — Detail'],
    thumbnail: 'Everyday Jogger — Stone',
    colors: [
      { name: 'Stone', hex: '#8C6F4E' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL', '4XL'],
    stock: 16,
    featured: false,
    newArrival: true,
    bigAndTall: true,
    badge: 'NEW',
    tags: ['jogger', 'pants', 'lightweight', 'big and tall'],
    features: ['Lightweight fabric', 'Everyday fit', 'Zip pockets'],
  },
  {
    id: 'su-013',
    slug: 'su-structured-overshirt',
    name: 'SU Structured Overshirt',
    description: 'A structured overshirt that layers cleanly over a tee for a sharper everyday look.',
    category: 'clothing',
    subcategory: 'Pants',
    price: 410,
    compareAtPrice: null,
    images: ['Overshirt — Stone Front', 'Overshirt — Stone Detail'],
    thumbnail: 'Overshirt — Stone Front',
    colors: [{ name: 'Stone', hex: '#8C6F4E' }],
    sizes: ['XL', '2XL', '3XL', '4XL'],
    availableSizes: ['XL', '2XL', '3XL', '4XL'],
    stock: 11,
    featured: false,
    newArrival: false,
    bigAndTall: true,
    badge: 'LIMITED',
    tags: ['overshirt', 'layer', 'premium', 'big and tall'],
    features: ['Structured fit', 'Premium feel', 'Layers cleanly'],
  },
  {
    id: 'su-014',
    slug: 'su-tapered-cargo-jogger',
    name: 'SU Tapered Cargo Jogger',
    description: 'A utility-inspired cargo jogger with a tapered leg and reinforced pockets.',
    category: 'clothing',
    subcategory: 'Joggers',
    price: 340,
    compareAtPrice: null,
    images: ['Cargo Jogger — Black Front', 'Cargo Jogger — Black Detail'],
    thumbnail: 'Cargo Jogger — Black Front',
    colors: [{ name: 'Black', hex: '#0A0A0A' }],
    sizes: ['XL', '2XL', '3XL'],
    availableSizes: ['XL', '2XL', '3XL'],
    stock: 13,
    featured: false,
    newArrival: false,
    bigAndTall: true,
    badge: null,
    tags: ['jogger', 'cargo', 'utility', 'big and tall'],
    features: ['Reinforced pockets', 'Tapered leg', 'Durable fabric'],
  },
];

// ========================================
// ADD OR EDIT PRODUCTS ABOVE
// ========================================

export default products;
