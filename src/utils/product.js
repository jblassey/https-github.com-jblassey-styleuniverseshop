import { products } from '../data/products.js';

/** Badge shown on a card/page: explicit badge wins, else auto-derive from a discount. */
export function resolveBadge(product) {
  if (product.badge) return product.badge;
  if (product.compareAtPrice && product.compareAtPrice > product.price) return 'SALE';
  return null;
}

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getProductsByIds(ids) {
  const set = new Set(ids);
  return products.filter((p) => set.has(p.id));
}

/** Human label for a category value, used in breadcrumbs/headings. */
export const CATEGORY_LABELS = {
  shoes: 'Shoes',
  clothing: 'Clothing',
};

/**
 * Related products: same category first, then same subcategory boosted,
 * excluding the current product. Falls back to any other product if the
 * catalog is small. Always returns at most `limit` items.
 */
export function getRelatedProducts(product, limit = 4) {
  const pool = products.filter((p) => p.id !== product.id);

  const scored = pool.map((p) => {
    let score = 0;
    if (p.category === product.category) score += 2;
    if (p.subcategory === product.subcategory) score += 2;
    if (p.bigAndTall === product.bigAndTall) score += 1;
    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}

/** Every distinct size across the catalog, in a sensible display order. */
export function getAllSizes() {
  const order = ['XL', '2XL', '3XL', '4XL', 'EU 45', 'EU 46', 'EU 47'];
  const present = new Set(products.flatMap((p) => p.sizes));
  return order.filter((size) => present.has(size));
}

/** Every distinct color across the catalog, deduped by name. */
export function getAllColors() {
  const map = new Map();
  products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c)));
  return Array.from(map.values());
}

export function getPriceBounds() {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Lowercased, whitespace-joined blob of everything search should match against. */
function searchableText(product) {
  return [
    product.name,
    product.category,
    product.subcategory,
    product.description,
    ...(product.tags || []),
    ...(product.colors || []).map((c) => c.name),
    ...(product.sizes || []),
  ]
    .join(' ')
    .toLowerCase();
}

const SORTERS = {
  featured: (list) => [...list].sort((a, b) => Number(b.featured) - Number(a.featured)),
  newest: (list) => [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival)),
  'price-asc': (list) => [...list].sort((a, b) => a.price - b.price),
  'price-desc': (list) => [...list].sort((a, b) => b.price - a.price),
  'name-asc': (list) => [...list].sort((a, b) => a.name.localeCompare(b.name)),
};

/**
 * Core catalog query used by the Shop page. Takes a plain filter object
 * (mirrors the URL search params) and returns the filtered + sorted
 * product list. Kept independent of React/router so it's easy to test
 * and reuse (e.g. for "related in this collection" later).
 */
export function queryProducts({
  category,
  collection,
  size,
  color,
  minPrice,
  maxPrice,
  inStockOnly,
  q,
  sort = 'featured',
} = {}) {
  let list = products;

  if (category === 'shoes' || category === 'clothing') {
    list = list.filter((p) => p.category === category);
  } else if (category === 'big-tall') {
    list = list.filter((p) => p.bigAndTall);
  }

  if (collection === 'new-arrivals') list = list.filter((p) => p.newArrival);
  if (collection === 'big-tall') list = list.filter((p) => p.bigAndTall);
  if (collection === 'essentials') list = list.filter((p) => p.tags.includes('essential'));
  if (collection === 'street-edit') list = list.filter((p) => p.tags.includes('streetwear'));
  if (collection === 'shoe-edit') list = list.filter((p) => p.category === 'shoes');

  if (size) list = list.filter((p) => p.sizes.includes(size));
  if (color) list = list.filter((p) => p.colors.some((c) => c.name === color));

  const min = minPrice !== undefined && minPrice !== '' ? Number(minPrice) : null;
  const max = maxPrice !== undefined && maxPrice !== '' ? Number(maxPrice) : null;
  if (min !== null && !Number.isNaN(min)) list = list.filter((p) => p.price >= min);
  if (max !== null && !Number.isNaN(max)) list = list.filter((p) => p.price <= max);

  if (inStockOnly) list = list.filter((p) => p.stock > 0);

  if (q && q.trim()) {
    const query = q.trim().toLowerCase();
    list = list.filter((p) => searchableText(p).includes(query));
  }

  const sorter = SORTERS[sort] || SORTERS.featured;
  return sorter(list);
}
