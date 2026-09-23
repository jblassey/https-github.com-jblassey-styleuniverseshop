# Website Editing Guide (No Coding Needed)

This guide explains how to update the Style Universe website through
GitHub's website — no coding, no downloads, no special software.

Everything below happens at **github.com**, in your web browser.

---

## Before you start: two files you'll use the most

- **`src/data/products.js`** — every product on the site. This is the
  file you'll open for almost everything below.
- **`public/images/`** — the folder where you upload product photos.

---

## 1. How to Add a Product

1. On GitHub, open `src/data/products.js`.
2. Click the **pencil icon** (top right of the file) to edit it.
3. Find the line near the top that says `ADD OR EDIT PRODUCTS BELOW`.
4. Copy one entire existing product — from its opening `{` to its
   closing `},` — and paste a copy right above the closing `];` line
   (which is marked `ADD OR EDIT PRODUCTS ABOVE`).
5. Change the values in your pasted copy: `name`, `price`, `sizes`,
   etc. (See sections 3–6 below for what each one means.)
6. Give it a unique `id` and `slug` that no other product uses — e.g.
   `id: 'su-015'`, `slug: 'su-new-product-name'`.
7. Scroll down and click **Commit changes** (see section 11).

## 2. How to Remove a Product

1. Open `src/data/products.js` and click the pencil icon to edit.
2. Find the product — look for its `name: '...'` line to locate it.
3. Select and delete everything from that product's opening `{` down
   to its closing `},` (the whole block).
4. Commit your changes (section 11).

## 3. How to Change a Product Price

1. Open `src/data/products.js`, click the pencil icon.
2. Find the product and its `price:` line, e.g. `price: 450,`.
3. Change the number (just the number — no `GH₵` symbol, no commas).
4. If the product is on sale, `compareAtPrice:` is the original
   (crossed-out) price — set it to `null` if there's no sale.
5. Commit your changes.

## 4. How to Change a Product Name

1. Same file, find the product's `name: '...'` line and edit the text
   between the quotes.
2. Commit your changes.

*(Tip: the product's `slug` — its web address — doesn't need to match
the name, so you don't have to change that too.)*

## 5. How to Change Product Sizes

1. Find the product's `sizes:` line — this lists every size it comes
   in, e.g. `sizes: ['XL', '2XL', '3XL', '4XL'],`.
2. Find `availableSizes:` right below it — this lists which of those
   sizes are currently in stock. A size in `sizes` but *not* in
   `availableSizes` shows on the site as greyed out/unavailable.
3. Edit either list, keeping the same style (each size in quotes,
   separated by commas, inside the square brackets).
4. Commit your changes.

## 6. How to Change Product Colors

1. Find the product's `colors:` line, e.g.:
   `colors: [{ name: 'Black', hex: '#0A0A0A' }],`
2. Each color needs a `name` (shown to customers) and a `hex` code
   (the actual color — you can find hex codes with any online color
   picker, e.g. `#8C6F4E` for a tan/brown).
3. To add a color, copy one `{ name: '...', hex: '...' }` and add a
   comma-separated copy inside the same square brackets.
4. If a product has no color choice at all, leave it as `colors: [],`.
5. Commit your changes.

## 7. How to Upload a Product Photo

1. Go to the `public/images` folder on GitHub.
2. Click **Add file → Upload files**.
3. Drag your photo in (or click to browse for it). Use a simple file
   name — lowercase letters, numbers and dashes only, e.g.
   `apex-runner-front.jpg`. No spaces or special characters.
4. Click **Commit changes** to finish the upload.
5. Now open `src/data/products.js`, find the product, and change its
   `images` and/or `thumbnail` line to point at your new file:
   ```
   images: ['/images/apex-runner-front.jpg'],
   thumbnail: '/images/apex-runner-front.jpg',
   ```
6. Commit your changes to `products.js` too.

If you add the path before uploading the photo (or mistype the file
name), the site won't break — it just shows a placeholder block until
the path is correct.

## 8. How to Replace a Product Photo

**Easiest way:** upload the new photo as a *new* file (step 7 above,
with a new file name), then update the product's `images`/`thumbnail`
line in `products.js` to point at the new file name.

*(You can also delete the old file from `public/images` afterwards —
open it on GitHub and click the trash icon — but that's optional.)*

## 9. How to Change Homepage Text

Homepage sections (hero headline, category cards, brand story, etc.)
live in **`src/data/homepage.js`**. Open it, click the pencil icon,
find the text you want to change between the quotes, edit it, and
commit your changes. The overall page layout and design won't be
affected — only the words.

## 10. How to Make a Product Featured

Find the product in `src/data/products.js` and change:
```
featured: false,
```
to:
```
featured: true,
```
Featured products are shown first in the shop's default sort order.
Commit your changes.

## 11. How to Commit Changes to GitHub

Whenever you finish editing a file on GitHub:

1. Scroll to the bottom of the page.
2. You'll see a box titled **"Commit changes"** with a short text
   field — you can leave the default message or type a short note
   like "Updated Apex Runner price."
3. Make sure **"Commit directly to the `main` branch"** is selected.
4. Click the green **Commit changes** button.

That's it — your change is saved.

## 12. How Netlify Automatically Deploys Changes

Every time you commit a change on GitHub, Netlify notices automatically
and rebuilds the live website with your update — usually within a
couple of minutes, with no extra steps from you.

To check on it: log into **netlify.com**, open the Style Universe
site, and click the **Deploys** tab. You'll see your latest commit
listed, with a status of "Building," then "Published" once it's live.
If something goes wrong, it'll say "Failed" and you can click into it
to see what happened — feel free to share that with whoever's helping
you with the site.

---

### A few habits that will save you trouble

- Always match the punctuation style you see around you — every
  product entry needs its commas, quotes, and curly braces `{ }` in
  the same places as the examples. If you're not sure, copy an
  existing product and edit the copy rather than typing one from
  scratch.
- Make one change at a time and commit it before starting the next —
  it's much easier to spot what went wrong in a small change than a
  big one.
- If the live site looks broken after a change, go back to
  `src/data/products.js` (or whichever file you edited) on GitHub and
  compare it carefully against a product you didn't touch — a missing
  comma or bracket is almost always the cause.
