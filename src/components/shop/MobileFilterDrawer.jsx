import { useEffect, useRef } from 'react';
import FilterPanel from './FilterPanel.jsx';
import SortSelect from './SortSelect.jsx';
import useFocusReturn from '../../hooks/useFocusReturn.js';

/**
 * Bottom-sheet drawer holding the same FilterPanel + sort control used
 * in the desktop sidebar, for small screens. Filters apply live (same
 * as desktop) — the "Apply" button just closes the sheet once the user
 * is happy, "Clear" resets everything.
 */
export default function MobileFilterDrawer({ open, onClose, filters, onChange, onClear, resultCount }) {
  const closeRef = useRef(null);
  useFocusReturn(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close filters"
        className={`absolute inset-0 w-full h-full bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter and sort"
        className={`absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-100 flex-shrink-0">
          <span className="text-label">Filter &amp; Sort</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 flex-1">
          <SortSelect value={filters.sort} onChange={(sort) => onChange({ sort })} className="mb-8" />
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} />
        </div>

        <div className="px-5 py-4 border-t border-grey-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-button w-full px-6 py-4 bg-black text-white hover:bg-charcoal transition-colors"
          >
            Show {resultCount} {resultCount === 1 ? 'Result' : 'Results'}
          </button>
        </div>
      </div>
    </div>
  );
}
