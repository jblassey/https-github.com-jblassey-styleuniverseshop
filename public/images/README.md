# Product Photos Go Here

Drop your product photo files directly into this folder (drag-and-drop
works through GitHub's web interface — see WEBSITE-EDITING-GUIDE.md in
the project root for exact steps).

Then open `src/data/products.js` and change the product's image entry
to match the filename, for example:

```
images: ['/images/apex-runner-front.jpg', '/images/apex-runner-side.jpg'],
thumbnail: '/images/apex-runner-front.jpg',
```

That's it — no other file needs to change. If a path is typo'd or the
photo hasn't been uploaded yet, the site automatically falls back to a
placeholder block instead of showing a broken image icon.

Tips:
- Use plain filenames: lowercase letters, numbers and dashes only
  (e.g. `apex-runner-front.jpg`, not `Apex Runner (Front).jpg`).
- JPG or PNG, ideally under 500KB each, so the site stays fast.
- Product photos generally look best as portrait/vertical shots.
