# Klero — Food Carried Forward

A premium, single-page website for **Klero**, a cooking-and-baking brand built on the
Greek idea of inheritance — recipes, hospitality, and tradition carried from one
generation to the next.

Static HTML/CSS/vanilla JS. No build step, no framework. Ready to deploy to GitHub Pages.

---

## 1. Project Structure

```
/
├── index.html                  Single-page site (all sections)
├── styles.css                  All styles (CSS variables, components, responsive, animation)
├── script.js                   Business info config, form logic, nav, scroll reveal, gallery filter
├── README.md                   This file
├── .nojekyll                   Tells GitHub Pages not to run Jekyll processing
├── assets/
│   ├── images/                 Placeholder SVG imagery (hero, story, gallery, weekend drop)
│   ├── logos/                  Reserved for the real Klero logo file (see §5)
│   └── icons/                  Favicon set (see §6)
└── .github/
    └── workflows/
        └── deploy.yml          GitHub Actions → GitHub Pages deployment
```

All asset references in `index.html` and `styles.css` use **relative paths**
(`assets/...`, not `/assets/...`), so the site works correctly whether it's deployed at
`https://username.github.io/` or `https://username.github.io/repository-name/`.

---

## 2. Local Preview

Any static file server works. From the project root:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

(Node alternative: `npx serve .`)

---

## 3. Git & GitHub Setup

```bash
git init
git add .
git commit -m "Initial Klero website"
git branch -M main
git remote add origin <REPOSITORY_URL>
git push -u origin main
```

Replace `<REPOSITORY_URL>` with your GitHub repository's URL
(e.g. `https://github.com/your-username/klero.git`).

---

## 4. GitHub Pages Deployment

This repo already includes `.github/workflows/deploy.yml`, which deploys the site
automatically via GitHub Actions on every push to `main`.

**One-time setup, after your first push:**

1. Open your repository on GitHub → **Settings**
2. Go to **Pages** (left sidebar, under "Code and automation")
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. Push to `main` (or re-run the workflow from the **Actions** tab)
5. The workflow will build and publish automatically — the live URL appears in the
   workflow run summary and on the Pages settings screen once deployment finishes

This works whether the repository is public or private (private repos need GitHub Pro,
Team, or Enterprise for Pages).

### Custom domain (later)

1. In **Settings → Pages → Custom domain**, enter your domain and save
   (GitHub creates a `CNAME` file in your published output automatically)
2. At your domain registrar, add either:
   - an `A` record pointing to GitHub's Pages IPs, or
   - a `CNAME` record pointing to `your-username.github.io`
3. Wait for DNS to propagate, then enable **Enforce HTTPS** in the Pages settings

---

## 5. Adding the Real Klero Logo

The header and footer currently use a **temporary text wordmark**:

```html
<!-- in index.html, inside <header class="site-header"> -->
<span class="wordmark-text">Klero</span>
```

To replace it with a real logo image once you have one:

1. Add your logo file to `assets/logos/` (e.g. `assets/logos/klero-logo.svg`)
2. In `index.html`, swap the `<span class="wordmark-text">Klero</span>` line for:
   ```html
   <img src="assets/logos/klero-logo.svg" alt="Klero" class="wordmark-img">
   ```
3. Do the same in the footer (`.footer-wordmark`) if desired

The `.wordmark-img` style in `styles.css` already constrains logo height so it stays
proportional next to the nav.

---

## 6. Favicons

`index.html` already references a full favicon set at `assets/icons/`. Two files exist
today:

- `assets/icons/favicon.svg` — a real, working scalable favicon (the temporary Klero mark)
- `assets/icons/site.webmanifest` — web app manifest referencing the PNG sizes below

The following are **referenced but not yet generated** (browsers that don't support SVG
favicons will simply show no icon until these are added — this does not break the site):

- `assets/icons/favicon.ico`
- `assets/icons/favicon-16x16.png`
- `assets/icons/favicon-32x32.png`
- `assets/icons/apple-touch-icon.png` (180×180)
- `assets/icons/android-chrome-192x192.png`
- `assets/icons/android-chrome-512x512.png`

**To generate them:** upload `assets/icons/favicon.svg` (or your final logo) to a tool
like [realfavicongenerator.net](https://realfavicongenerator.net), download the output,
and drop the files into `assets/icons/` using the exact filenames above.

---

## 7. Business Information Placeholders

**Everything below is placeholder content — no real business details have been
invented.** Update it in one place and it propagates across the whole site.

### Contact details, WhatsApp, Instagram, service area

Edit the `BUSINESS_INFO` object near the top of **`script.js`**:

```js
const BUSINESS_INFO = {
  phoneDisplay: "+1 (555) 123-4567",
  phoneHref: "+15551234567",
  whatsappNumber: "15551234567",
  whatsappMessage: "Hello Klero, I'd like to place an order request.",
  email: "hello@klero.example",
  instagramHandle: "@klero.kitchen",
  instagramUrl: "https://instagram.com/klero.kitchen",
  serviceArea: "Serving [City, Region] — pickup and select local delivery",
};
```

Every phone number, WhatsApp link, email link, Instagram link, and the service-area line
across the header, hero, Order section, and footer read from this single object.

### This Weekend at Klero

Edit the `WEEKEND_DROP` object, also near the top of **`script.js`**:

```js
const WEEKEND_DROP = {
  active: true,               // set to false to hide the drop and show a fallback message
  featuredDish: "Braised short rib tray (serves 4–6)",
  featuredBake: "Spiced honey layer cake",
  cutoff: "Thursday, 6:00 PM",
  pickupWindow: "Saturday, 11:00 AM – 2:00 PM",
};
```

### Order Request Form → connecting a real backend

This is a static site with no server, so the form currently runs in **demo mode**: it
validates input and shows a confirmation message, but does not send data anywhere.

The single place to connect it is the `ORDER_FORM_ENDPOINT` constant in `script.js`:

```js
const ORDER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

- **Formspree** (recommended, zero backend code): create a form at
  [formspree.io](https://formspree.io), replace the placeholder URL above with your real
  endpoint. The `<form>` tag's `action` attribute in `index.html` is kept in sync with
  this constant automatically at runtime.
- **Netlify Forms**: add `data-netlify="true"` and a hidden `form-name` input to the
  `<form>` in `index.html`, then deploy on Netlify instead of (or alongside) GitHub Pages.
- **EmailJS**: remove the `action` attribute and call `emailjs.sendForm()` inside the
  submit handler in `script.js` (see `initOrderForm()`).
- **Supabase / a custom API**: point `ORDER_FORM_ENDPOINT` at your endpoint and adjust
  the `fetch()` call inside `initOrderForm()` to match your API's request/response shape.

### Menu items & prices

Offerings are hand-written cards inside the `#offerings` section of `index.html`
(grouped into Signature Meals, Baked Goods, Celebrations, Small Catering). Each card is a
self-contained `<article class="offer-card">` block — copy, edit, or remove them freely;
no other file needs to change. Prices are intentionally left as `$—` placeholders.

### Photography

All imagery is currently **placeholder SVG art** in `assets/images/` (soft brand-colored
gradients, clearly labeled). Replace them with real photography using the same filenames
to avoid editing HTML, or update the `src` attributes in `index.html` to new filenames.

---

## 8. Sample Testimonials

The testimonials in `#testimonials` are explicitly marked as **sample content** in an
HTML comment directly above the section in `index.html`. They are not real customer
quotes. Replace them with genuine testimonials once available, or delete the entire
`<section class="testimonials">` block (and remove its data if unused) until then.

---

## 9. Design System Reference

CSS custom properties (in `:root`, top of `styles.css`):

```css
--color-cocoa: #3E2723;
--color-brown: #6B412D;
--color-terracotta: #B87352;
--color-cream: #F8EFE6;
--color-olive: #556B2F;
```

Typography: **Fraunces** (serif, headings/editorial) + **Inter** (sans, body/UI), loaded
from Google Fonts in `index.html`.

Animations respect `prefers-reduced-motion`; when enabled, transitions and scroll-reveal
effects are effectively disabled and all content is shown in place.

---

## 10. Pre-Launch Checklist

- [ ] Replace all placeholder contact details in `BUSINESS_INFO` (`script.js`)
- [ ] Connect a real form backend via `ORDER_FORM_ENDPOINT` (`script.js`)
- [ ] Replace placeholder SVG imagery in `assets/images/` with real photography
- [ ] Add a real logo file to `assets/logos/` and update the wordmark markup (§5)
- [ ] Generate and add the favicon/PNG set to `assets/icons/` (§6)
- [ ] Update `WEEKEND_DROP` with real current-week details, or set `active: false`
- [ ] Replace or remove the sample testimonials (§8)
- [ ] Update Open Graph / Twitter meta image in `index.html` once real photography exists
- [ ] Review offerings copy and pricing in the `#offerings` section

---

Made with care.
