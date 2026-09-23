import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import FilterPanel from '../components/shop/FilterPanel.jsx';
import SortSelect from '../components/shop/SortSelect.jsx';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer.jsx';
import { queryProducts, CATEGORY_LABELS } from '../utils/product.js';

const FILTER_KEYS = ['category', 'collection', 'size', 'color', 'minPrice', 'maxPrice', 'inStockOnly', 'q', 'sort'];

const COLLECTION_LABELS = {
  'new-arrivals': 'New Arrivals',
  'big-tall': 'Big & Tall',
  essentials: 'Essentials',
  'street-edit': 'Street Edit',
  'shoe-edit': 'Shoe Edit',
};

function contextTitle(filters) {
  if (filters.q) return `Search results for \u201c${filters.q}\u201d`;
  if (filters.collection) return COLLECTION_LABELS[filters.collection] || 'Collection';
  if (filters.category === 'big-tall') return 'Big & Tall';
  if (filters.category === 'shoes' || filters.category === 'clothing') return CATEGORY_LABELS[filters.category];
  if (filters.category === 'collections') return 'Collections';
  return 'Shop Style Universe';
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filters = useMemo(() => {
    const obj = {};
    FILTER_KEYS.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  const products = useMemo(() => queryProducts(filters), [filters]);

  const updateFilters = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  const hasActiveFilters = FILTER_KEYS.some((key) => key !== 'sort' && filters[key]);
  const title = contextTitle(filters);

  return (
    <>
      <SEO
        title="Shop Men's Fashion"
        description="Explore men's fashion designed around style, quality and fit — shoes and clothing from Style Universe Ghana."
      />

      <Container className="py-12 sm:py-16">
        <SectionHeading
          label="Shop"
          title={title}
          level="h1"
          description={
            !filters.q && !hasActiveFilters
              ? "Explore men's fashion designed around style, quality and fit."
              : undefined
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 mt-10">
          <aside className="hidden lg:block">
            <FilterPanel filters={filters} onChange={updateFilters} onClear={clearFilters} />
          </aside>

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-body-sm">
                {products.length} {products.length === 1 ? 'result' : 'results'}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden text-button px-4 py-2.5 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Filter &amp; Sort
                </button>
                <SortSelect
                  value={filters.sort}
                  onChange={(sort) => updateFilters({ sort })}
                  className="hidden lg:inline-flex"
                />
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : filters.q ? (
              <EmptyState
                className="border border-grey-100"
                title={`No Results for \u201c${filters.q}\u201d`}
                description="Try another search or explore our collections."
                action={
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button to="/shop?category=shoes" variant="secondary">
                      Shop Shoes
                    </Button>
                    <Button to="/shop?category=clothing" variant="secondary">
                      Shop Clothing
                    </Button>
                    <Button to="/shop">View All</Button>
                  </div>
                }
              />
            ) : (
              <EmptyState
                className="border border-grey-100"
                title="Nothing Found"
                description="Try adjusting your filters or exploring another collection."
                action={
                  <Button onClick={clearFilters} variant="secondary">
                    View All Products
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        resultCount={products.length}
      />
    </>
  );
}
