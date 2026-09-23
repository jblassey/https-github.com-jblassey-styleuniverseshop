import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import site from '../config/site.js';

/**
 * Minimal, dependency-free per-page SEO helper. Sets document.title,
 * meta description, canonical URL, and Open Graph/Twitter tags on
 * mount and whenever the route changes. Keeps the foundation light (no
 * react-helmet-async) while still letting every page own its own
 * title, description and social preview image.
 *
 * `structuredData` accepts one JSON-LD object or an array of them —
 * only pass information that's actually true/visible on the page
 * (see product/breadcrumb JSON-LD on the product page for an example).
 */
function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setStructuredData(data) {
  // Clear any structured data from a previous page before adding this page's.
  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
  if (!data) return;

  const items = Array.isArray(data) ? data : [data];
  items.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = 'true';
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export default function SEO({ title, description, image, type = 'website', structuredData, noIndex = false }) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? site.seo.titleTemplate.replace('%s', title) : site.seo.defaultTitle;
    const desc = description || site.seo.defaultDescription;
    const url = `${site.seo.siteUrl}${location.pathname}`;
    const ogImage = image ? `${site.seo.siteUrl}${image}` : `${site.seo.siteUrl}${site.seo.ogImage}`;

    document.title = fullTitle;
    setMeta('description', desc);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url);

    setMeta('og:type', type, 'property');
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', ogImage, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', ogImage);

    setStructuredData(structuredData);
  }, [title, description, image, type, structuredData, noIndex, location.pathname]);

  return null;
}
