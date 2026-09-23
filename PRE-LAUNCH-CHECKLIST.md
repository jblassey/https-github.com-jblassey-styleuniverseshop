# Style Universe — Pre-Launch Checklist

Everything below is a **placeholder** that works correctly for development and testing, but should be replaced with the real thing before Style Universe goes live to real customers.

## Must replace before launch

- [ ] **WhatsApp number** — `src/config/site.js` → `contact.whatsappNumber` is `233XXXXXXXXX`. Replace with the real number.
- [ ] **Social links** — `src/config/site.js` → `social` (Instagram, TikTok, Facebook) point to placeholder handles.
- [ ] **Delivery fees** — `src/config/delivery.js` has placeholder pricing for Greater Accra vs. other regions. Confirm real rates.
- [ ] **Paystack keys** — currently unset. Add test keys first (`pk_test_...` / `sk_test_...`), fully test a purchase, then switch to live keys (`pk_live_...` / `sk_live_...`) in Netlify's environment variables when ready to accept real payments.
- [ ] **Product catalog** — `src/data/products.js` has 14 sample products with fictional names for development. Replace with the real catalog (or edit these in place) before launch.
- [ ] **Product photography** — every product/lifestyle image on the site is currently a labeled placeholder block, not a photo. Real photography needs to be added (see `src/components/ui/PlaceholderImage.jsx` — each usage is a one-line swap).
- [ ] **Domain** — `src/config/site.js` → `seo.siteUrl` is `https://styleuniverse.gh`, a placeholder. Update once a real domain is connected, then run `npm run sitemap` to regenerate the sitemap with correct URLs.
- [ ] **Open Graph / social share image** — `public/og-image.jpg` is a generated placeholder (Style Universe wordmark on black). Fine to launch with, but consider a real campaign image later.
- [ ] **Legal pages** — Privacy Policy and Terms & Conditions (`src/pages/PrivacyPolicy.jsx`, `src/pages/Terms.jsx`) currently say the full text is "added in a later stage." Real legal text is needed before accepting real orders.
- [ ] **FAQs, Delivery, Returns pages** — currently placeholder/minimal copy; fill in with real answers before launch.

## Good to double-check

- [ ] Confirm Ghana region → delivery fee mapping in `src/config/delivery.js` matches how Style Universe actually wants to price delivery (currently a simple two-zone split).
- [ ] Decide whether the SU Passport loyalty program (currently a teaser page/section only) is launching alongside the store or later.
- [ ] Review sample product stock numbers — they're realistic placeholders (some intentionally low/zero to demonstrate stock states), not real inventory.

## Already production-ready (no action needed)

- Cart, wishlist, and search all work and persist correctly
- Checkout validates Ghana phone numbers and required fields
- Paystack payment flow is secure (secret key server-only, amounts recalculated server-side, payments verified server-side before confirming an order)
- SEO, sitemap, robots.txt, and structured data are all wired up and update automatically as products are added
- Mobile and desktop responsive layouts
- Accessibility basics (keyboard navigation, focus management, labeled controls, contrast-checked text)
