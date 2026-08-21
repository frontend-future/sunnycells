# Metabolic Morning Blend — Vercel-ready front-end recreation

A complete static front-end recreation of the supplied Metabolic Morning Blend landing-page reference, organized as a clean GitHub repository and ready for Vercel.

## Pages

- `index.html` — full long-form landing page
- `cart.html` — working browser-side shopping cart
- `checkout.html` — responsive checkout UI with contact/delivery flow
- `thank-you.html` — order confirmation state
- `404.html` — fallback page

## Store behavior

The cart uses `localStorage`, supports package quantity changes/removal, calculates subtotal/shipping, and keeps the cart badge in sync.

The checkout is intentionally a **front-end demo checkout**. It does not collect or transmit real card details. Connect an authorized platform such as Shopify Checkout or Stripe before accepting live payments.

## Deploy to Vercel

1. Upload this repository to GitHub.
2. In Vercel, choose **Add New → Project**.
3. Import the GitHub repository.
4. Framework Preset: **Other**.
5. No build command is required.
6. Deploy.

`vercel.json` enables clean URLs and basic security headers.

## Local preview

You can open `index.html` directly, or run any simple static server, for example:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

```text
.
├── index.html
├── cart.html
├── checkout.html
├── thank-you.html
├── 404.html
├── vercel.json
├── README.md
└── assets
    ├── css
    │   └── styles.css
    ├── js
    │   ├── store.js
    │   ├── home.js
    │   ├── cart.js
    │   └── checkout.js
    └── images
```
