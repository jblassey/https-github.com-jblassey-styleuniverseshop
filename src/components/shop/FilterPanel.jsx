import { getAllSizes, getAllColors, getPriceBounds, CATEGORY_LABELS } from '../../utils/product.js';
import site from '../../config/site.js';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'shoes', label: CATEGORY_LABELS.shoes },
  { value: 'clothing', label: CATEGORY_LABELS.clothing },
  { value: 'big-tall', label: 'Big & Tall' },
];

/**
 * Pure, controlled filter controls — every value comes from `filters`
 * and every change goes through `onChange(patch)`. Used as-is in the
 * desktop sidebar and inside the mobile filter drawer, so the two never
 * drift out of sync.
 */
export default function FilterPanel({ filters, onChange, onClear }) {
  const sizes = getAllSizes();
  const colors = getAllColors();
  const { min: minBound, max: maxBound } = getPriceBounds();

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="text-label mb-3">Category</legend>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <label key={opt.value || 'all'} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={(filters.category || '') === opt.value}
                onChange={() => onChange({ category: opt.value || null })}
                className="w-4 h-4 accent-black"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const selected = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ size: selected ? null : size })}
                className={`px-3 py-2 text-xs font-medium border transition-colors ${
                  selected ? 'bg-black text-white border-black' : 'border-grey-200 hover:border-black'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label mb-3">Color</legend>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const selected = filters.color === color.name;
            return (
              <button
                key={color.name}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ color: selected ? null : color.name })}
                className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 text-xs font-medium border transition-colors ${
                  selected ? 'border-black' : 'border-grey-200 hover:border-black'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-grey-200 flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden="true"
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label mb-3">Price ({site.currency.symbol})</legend>
        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor="min-price">
            Minimum price
          </label>
          <input
            id="min-price"
            type="number"
            inputMode="numeric"
            min={minBound}
            max={maxBound}
            placeholder={String(minBound)}
            value={filters.minPrice || ''}
            onChange={(e) => onChange({ minPrice: e.target.value || null })}
            className="w-full border border-grey-200 px-3 py-2 text-sm focus-visible:outline-black"
          />
          <span className="text-grey-400" aria-hidden="true">
            &ndash;
          </span>
          <label className="sr-only" htmlFor="max-price">
            Maximum price
          </label>
          <input
            id="max-price"
            type="number"
            inputMode="numeric"
            min={minBound}
            max={maxBound}
            placeholder={String(maxBound)}
            value={filters.maxPrice || ''}
            onChange={(e) => onChange({ maxPrice: e.target.value || null })}
            className="w-full border border-grey-200 px-3 py-2 text-sm focus-visible:outline-black"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label mb-3">Availability</legend>
        <label className="flex items-center gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={(e) => onChange({ inStockOnly: e.target.checked ? '1' : null })}
            className="w-4 h-4 accent-black"
          />
          In Stock Only
        </label>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        className="text-button text-left border-b border-black w-fit pb-0.5 hover:opacity-60 transition-opacity"
      >
        Clear Filters
      </button>
    </div>
  );
}
