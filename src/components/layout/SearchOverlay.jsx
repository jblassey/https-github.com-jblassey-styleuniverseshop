import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { queryProducts } from '../../utils/product.js';
import { getRecentSearches, addRecentSearch, clearRecentSearches } from '../../utils/recentSearches.js';
import { formatPrice } from '../../utils/format.js';
import useFocusReturn from '../../hooks/useFocusReturn.js';

const MAX_SUGGESTIONS = 5;

/**
 * Search panel dropped from the header. Live suggestions as the
 * customer types (product name/category/tags/colors/sizes — same
 * matching as the /search results page), recent searches when the
 * input is empty, submits to /search?q=... .
 */
export default function SearchOverlay({ open, onClose }) {
  const [value, setValue] = useState('');
  const [recent, setRecent] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useFocusReturn(open);

  useEffect(() => {
    if (!open) return undefined;
    setValue('');
    setRecent(getRecentSearches());
    inputRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [];
    return queryProducts({ q: value }).slice(0, MAX_SUGGESTIONS);
  }, [value]);

  const runSearch = (term) => {
    const query = term.trim();
    if (!query) return;
    addRecentSearch(query);
    setRecent(getRecentSearches());
    onClose();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(value);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecent([]);
  };

  return (
    <div
      className={`absolute top-full inset-x-0 bg-white border-b border-grey-100 shadow-md transition-all duration-200 origin-top ${
        open ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <form onSubmit={handleSubmit} className="container-page py-4 flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0">
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
          <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          tabIndex={open ? 0 : -1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search shoes, clothing, sizes, colors..."
          className="flex-1 text-sm focus-visible:outline-none bg-transparent"
        />
        <button
          type="submit"
          tabIndex={open ? 0 : -1}
          className="text-button px-4 py-2 bg-black text-white hover:bg-charcoal transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          tabIndex={open ? 0 : -1}
          className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {open && value.trim() && (
        <div className="container-page pb-5">
          {suggestions.length > 0 ? (
            <ul className="border-t border-grey-100 pt-3 flex flex-col">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => runSearch(value)}
                    className="flex items-center justify-between gap-4 py-2.5 hover:opacity-60 transition-opacity"
                  >
                    <span className="text-sm">{product.name}</span>
                    <span className="text-price text-xs flex-shrink-0">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-sm border-t border-grey-100 pt-3">No matching products yet — press Enter to search anyway.</p>
          )}
        </div>
      )}

      {open && !value.trim() && recent.length > 0 && (
        <div className="container-page pb-5">
          <div className="flex items-center justify-between border-t border-grey-100 pt-3 mb-3">
            <span className="text-label">Recent Searches</span>
            <button type="button" onClick={handleClearRecent} className="text-body-sm underline hover:no-underline">
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recent.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => runSearch(term)}
                className="text-xs px-3 py-1.5 border border-grey-200 hover:border-black transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
