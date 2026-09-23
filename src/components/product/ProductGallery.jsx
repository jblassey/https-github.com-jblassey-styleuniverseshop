import { useState } from 'react';
import PlaceholderImage from '../ui/PlaceholderImage.jsx';

/**
 * Main image + thumbnail rail with prev/next controls. `images` is the
 * array of PlaceholderImage labels from product data — swap for real
 * <img> sources later without changing this component's structure.
 */
export default function ProductGallery({ images, productName }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (delta) => {
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative bg-grey-50">
        <PlaceholderImage label={`${productName} — ${images[index]}`} ratio="4 / 5" tone="light" />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3 5 8l5 5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={`flex-shrink-0 w-16 h-20 border transition-colors ${
                i === index ? 'border-black' : 'border-transparent hover:border-grey-200'
              }`}
            >
              <PlaceholderImage label={label} ratio="4 / 5" tone="light" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
