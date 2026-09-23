# Style Universe

**Find Your Style. Find Your Fit.**

A production-ready ecommerce website for **Style Universe** — a premium men's fashion brand in Ghana focused on style, fit, and hard-to-find sizes (shoes EU 45–47, clothing XL–4XL).

This README is written for Jeff, not just developers — if you're not a coder, the [Things You'll Want to Edit](#things-youll-want-to-edit) and [Deploying to Netlify](#deploying-to-netlify) sections are the ones that matter most.

---

## What's Built

- Full storefront: homepage, shop with filters/sort/search, product pages, cart, wishlist
- Real cart & wishlist (persist in the browser via localStorage)
- Ghana-specific checkout: customer + delivery details, region-based delivery fees
- **Paystack payment integration** — secure, server-side amount calculation and verification (see [Payments](#payments-paystack) below)
- Order confirmation with a WhatsApp support link
- SEO (titles, meta descriptions, Open Graph, structured data, sitemap)
- Fully responsive, accessible, and built to be extended (new pages, new products, new features) without a rebuild

## Tech Stack

- **React 18** + **Vite** — frontend
- **React Router** — routing
- **Tailwind CSS** — styling, using a centralized design system (`tailwind.config.js`, `src/index.css`)
- **Netlify Functions** — secure server-side payment logic (Node)
- **Paystack** — payment processing for Ghana
- No database yet (see [What's Not Included Yet](#whats-not-included-yet))

---

## Running Locally

You'll need [Node.js](https://nodejs.org) 20 or later installed.

```bash
npm install
npm run dev
```

The site runs at **http://localhost:5173**. Changes save live.

To test the real production build locally (recommended before every deploy):

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` in the project root and fill in your Paystack keys:

```bash
cp .env.example .env
```

| Variable | Where it's used | Safe to expose publicly? |
|---|---|---|
| `VITE_PAYSTACK_PUBLIC_KEY` | Frontend | Yes — this is what "public" means for Paystack |
| `PAYSTACK_SECRET_KEY` | Netlify Functions only (`netlify/functions/`) | **No — never share or commit this** |

**Never** rename `PAYSTACK_SECRET_KEY` to start with `VITE_` — that prefix tells Vite to bundle a variable into the browser-facing code, which would expose your secret key to every visitor.

Start with your **test** keys (`pk_test_...` / `sk_test_...`) from the Paystack dashboard (Settings → API Keys & Webhooks). Switching to live keys later (`pk_live_...` / `sk_live_...`) is just swapping the environment variable values — no code changes needed.

---

## Things You'll Want to Edit

Everything below lives in one place each — you never need to hunt through component code to change it.

| What | File |
|---|---|
| Brand name, tagline, currency, WhatsApp number, social links, delivery blurb | `src/config/site.js` |
| Delivery zones & fees | `src/config/delivery.js` — **currently placeholder pricing**, see below |
| Products (add/edit/remove) | `src/data/products.js` |
| Homepage copy (hero, category cards, brand story, etc.) | `src/data/homepage.js` |

### Adding a Product

Open `src/data/products.js` and add a new object to the `products` array, following the shape of the existing ones (id, slug, name, price, images, colors, sizes, stock, etc — every field is documented in the comment at the top of the file). That's it — the shop grid, search, filters, related products, and the product page all pick it up automatically. You do not need to touch any component.

### WhatsApp Number

`src/config/site.js` → `contact.whatsappNumber` is currently the placeholder `233XXXXXXXXX`. Replace it with the real Style Universe WhatsApp number (same format: country code + number, no spaces, no leading `+`).

### Delivery Pricing

`src/config/delivery.js` has two zones (Greater Accra, and everywhere else in Ghana) with **placeholder fees** clearly marked as such in the file's comments. Edit the `fee` values once real rates are decided — this is the only place they're defined, so the checkout page and the Paystack payment amount both update automatically.

### Social Links

`src/config/site.js` → `social` object. Update Instagram/TikTok/Facebook URLs to the real accounts.

---

## Payments (Paystack)

Payment logic is deliberately split from the UI for security:

- `netlify/functions/initialize-payment.js` — recalculates the order total from the **real product catalog** (never trusts a price the browser sends), then asks Paystack to start a transaction for that amount.
- `netlify/functions/verify-payment.js` — after Paystack redirects the customer back, this asks Paystack directly (server-to-server) whether the payment actually succeeded before the site shows an order confirmation.

Your `PAYSTACK_SECRET_KEY` only ever lives in these two functions, which run on Netlify's servers — it's never sent to a browser.

**Test the flow with test keys before going live.** Paystack's test mode lets you simulate payments without moving real money — see [Paystack's test cards documentation](https://paystack.com/docs/payments/test-payments/).

---

## Deploying to Netlify

### 1. Push to GitHub

If this project isn't already in a GitHub repository:

```bash
git init
git add .
git commit -m "Style Universe website"
```

Create a new repository on GitHub, then follow GitHub's instructions to push (`git remote add origin ...`, `git push -u origin main`).

If a repository already exists, just commit and push your changes as normal — don't create a second one.

### 2. Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and select this repository.

### 3. Build Settings

Netlify should auto-detect these from `netlify.toml`, but double-check:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions` (auto-detected from `netlify.toml`)

### 4. Add Environment Variables

In **Site configuration → Environment variables**, add:

```
VITE_PAYSTACK_PUBLIC_KEY = pk_test_...  (or pk_live_... when ready)
PAYSTACK_SECRET_KEY = sk_test_...        (or sk_live_... when ready)
```

### 5. Deploy

Click **Deploy site**. Netlify will build and publish automatically — every future push to your main branch redeploys the site.

### 6. Test the Live Site

Walk through a full purchase using Paystack test cards, check that `/shop`, `/product/...`, `/cart`, `/checkout` all load correctly when visited **directly** (not just by clicking through the site — paste the URL straight into a new tab), and confirm the order confirmation page works after a test payment.

### 7. Custom Domain (later)

When Style Universe has a domain (e.g. `styleuniversegh.com`):

1. In Netlify: **Domain management → Add a domain**.
2. Follow Netlify's instructions to either point your domain's nameservers at Netlify, or add the DNS records Netlify gives you at your domain registrar.
3. Netlify issues a free HTTPS certificate automatically once the domain is connected — no extra setup needed.
4. Update `siteUrl` in `src/config/site.js` (`seo.siteUrl`) to the real domain, and run `npm run sitemap` once to regenerate `public/sitemap.xml` with the correct URLs before your next deploy.

---

## What's Not Included Yet

Being upfront about scope — these are intentionally not built yet:

- **No database** — completed orders exist as verified Paystack transactions, not in a queryable order history. `src/services/orderService.js` is a documented placeholder ready for a real database call to be dropped in.
- **No customer accounts / login** — checkout is guest-only by design at this stage.
- **No admin dashboard** — managing products means editing `src/data/products.js` directly.
- **No real product photography** — every image is a labeled placeholder block (`PlaceholderImage`), built so swapping in real photos later is a one-line change per usage.

---

## Project Structure

```
src/
  components/   reusable UI, layout, product, cart, shop components
  pages/        one file per route
  data/         product catalog + homepage content
  config/       site-wide settings (brand, delivery, currency, contacts)
  context/      Cart, Wishlist, Toast, Quick Add — shared app state
  services/     payment + order logic (talks to Netlify Functions)
  utils/        formatting, validation, search/filter logic
netlify/functions/   server-side payment initialize + verify
scripts/             build-time tooling (sitemap generation)
```
