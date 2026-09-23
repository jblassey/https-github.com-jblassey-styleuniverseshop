/**
 * Color swatches. Selection is shown via a ring + checkmark (not color
 * alone) so it reads clearly for colorblind users, plus the color name
 * is always visible as text.
 */
export default function ColorSelector({ colors, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-label mb-3">Color{value ? `: ${value}` : ''}</legend>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Color">
        {colors.map((color) => {
          const selected = value === color.name;
          return (
            <button
              key={color.name}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={color.name}
              onClick={() => onChange(color.name)}
              className={`relative w-9 h-9 rounded-full border transition-shadow ${
                selected ? 'ring-2 ring-offset-2 ring-black' : 'border-grey-200'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selected && (
                <svg
                  className="absolute inset-0 m-auto"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 7.2 5.5 10 11.5 3.5"
                    stroke={isLight(color.hex) ? '#0A0A0A' : '#FAFAF8'}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
