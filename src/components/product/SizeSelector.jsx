/**
 * Reusable size selector. `sizes` is the full list this product is
 * offered in; `availableSizes` is the in-stock subset — sizes outside
 * that subset render visually disabled and are not selectable, with
 * both a visual (strikethrough/opacity) and non-color (aria-disabled +
 * "Unavailable" in the accessible name) signal.
 */
export default function SizeSelector({ sizes, availableSizes, value, onChange, name = 'Size' }) {
  return (
    <fieldset>
      <legend className="text-label mb-3">{name}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
        {sizes.map((size) => {
          const available = availableSizes.includes(size);
          const selected = value === size;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={!available}
              disabled={!available}
              onClick={() => available && onChange(size)}
              className={`min-w-[52px] px-3 py-2.5 text-sm font-medium border transition-colors ${
                selected
                  ? 'bg-black text-white border-black'
                  : available
                  ? 'border-grey-200 text-black hover:border-black'
                  : 'border-grey-100 text-grey-300 line-through cursor-not-allowed'
              }`}
            >
              {size}
              {!available && <span className="sr-only"> (unavailable)</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
