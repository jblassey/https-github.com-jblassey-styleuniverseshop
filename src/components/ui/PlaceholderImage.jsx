import { useState } from 'react';

/**
 * Product/lifestyle image slot with a built-in placeholder fallback —
 * this is the ONE component every image on the site goes through, so
 * this is the only place that needs to know how to tell a real photo
 * from a placeholder.
 *
 * How it decides what to show:
 *  - If `label` looks like an image path (starts with "/", "http://" or
 *    "https://" — e.g. "/images/apex-runner-1.jpg") it renders a real
 *    <img>, lazy-loaded, with an automatically generated alt text from
 *    the filename.
 *  - Otherwise `label` is treated as plain placeholder text (e.g.
 *    "Apex Runner — Front") and a premium dark/light gradient block is
 *    shown instead — no external image host, no licensing risk.
 *  - If a real image path 404s (typo'd filename, file not uploaded
 *    yet), it falls back to the same gradient placeholder rather than
 *    showing a broken-image icon.
 *
 * In practice: product photos are managed entirely from
 * src/data/products.js — change a product's image entry from a label
 * to a real "/images/..." path (after uploading the file to
 * public/images/) and it just works. Nothing here needs editing.
 */
function isImagePath(value) {
  return typeof value === 'string' && (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://'));
}

function humanizeFilename(path) {
  const filename = path.split('/').pop() || '';
  const withoutExtension = filename.replace(/\.[a-zA-Z0-9]+$/, '');
  return withoutExtension
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim() || 'Style Universe product photo';
}

export default function PlaceholderImage({ label, ratio = '4 / 5', tone = 'dark', className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const sizing = ratio === 'auto' ? 'w-full h-full' : 'w-full';
  const boxStyle = ratio === 'auto' ? undefined : { aspectRatio: ratio };

  if (isImagePath(label) && !imageFailed) {
    return (
      <div style={boxStyle} className={`relative ${sizing} overflow-hidden bg-grey-50 ${className}`}>
        <img
          src={label}
          alt={humanizeFilename(label)}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const isDark = tone !== 'light';
  const style = {
    ...boxStyle,
    backgroundImage: isDark
      ? 'linear-gradient(135deg, #1C1C1B 0%, #0A0A0A 55%, #2B2B2A 100%)'
      : 'linear-gradient(135deg, #F5F5F3 0%, #E9E9E6 55%, #F5F5F3 100%)',
  };
  const caption = isImagePath(label) ? 'Photo not found — check the file was uploaded' : label;

  return (
    <div
      role="img"
      aria-label={isImagePath(label) ? humanizeFilename(label) : label}
      style={style}
      className={`relative ${sizing} flex items-end overflow-hidden ${className}`}
    >
      <span
        className={`relative m-4 text-[10px] font-semibold tracking-widest uppercase ${
          isDark ? 'text-grey-300' : 'text-grey-500'
        }`}
      >
        {caption}
      </span>
    </div>
  );
}
