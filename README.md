# Klero — Food Carried Forward

A premium, single-page website for **Klero**, a cooking-and-baking brand built on the
Greek idea of inheritance — recipes, hospitality, and tradition carried from one
generation to the next.

Built with **Vite + React + TypeScript + Tailwind CSS v4**, animated with
**framer-motion** and **animate.css**, icons from **lucide-react**, linted with
**oxlint** — the same stack as [Liven](https://github.com/jkaweesi22/Liven), kept to a
single anchor-navigated page rather than a routed multi-page app (see §9). Ready to
deploy to GitHub Pages via GitHub Actions.

---

## 1. Project Structure

```
/
├── index.html                  Vite entry HTML (meta tags, fonts, #root, %BASE_URL%)
├── vite.config.ts              Vite + React + Tailwind plugin config, GitHub Pages `base`
├── package.json                Scripts & dependencies
├── tsconfig*.json              TypeScript project references (app + node)
├── .oxlintrc.json              Linter config
├── README.md                   This file
├── src/
│   ├── main.tsx                App entry — mounts <App /> into #root
│   ├── App.tsx                 Assembles the single page from section components
│   ├── index.css               Tailwind import, @theme brand tokens, base/utility layers
│   ├── components/              Header, Footer, Hero, Story, Offerings, OrderForm, etc.
│   ├── data/                    Editable content: site.ts, weekend.ts, offerings.ts,
│   │                            gallery.ts, testimonials.ts, values.ts, order.ts
│   └── assets/
│       ├── images/             Placeholder SVG imagery, imported directly by components
│       └── logos/               Reserved for the real Klero logo file (see §5)
├── public/                      Files served as-is at the site root (favicon, manifest)
└── .github/
    └── workflows/
        └── deploy.yml           GitHub Actions → GitHub Pages (build + deploy)
```

---

## 2. Local Development

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically **http://localhost:5173/klero/** — note the
`/klero/` path, which mirrors the production subdirectory; see §4).

Other scripts:

```bash
npm run build     # type-check (tsc -b) + production build to dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

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

`.github/workflows/deploy.yml` builds the project with Node 20 (`npm ci && npm run
build`) and deploys the `dist/` output via GitHub Actions on every push to `main`.

**One-time setup, after your first push:**

1. Open your repository on GitHub → **Settings**
2. Go to **Pages** (left sidebar, under "Code and automation")
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. Push to `main` (or re-run the workflow from the **Actions** tab)
5. The workflow builds and publishes automatically — the live URL appears in the
   workflow run summary and on the Pages settings screen once deployment finishes

### The `base` path — important

GitHub Pages serves a project repository from a subdirectory:
`https://<username>.github.io/<repository-name>/`. **`vite.config.ts` sets `base:
'/klero/'` to match this repository's name.** If you rename the repository or fork it
under a different name, update that value to match — otherwise every built asset URL
will 404 and the deployed page will render blank. `index.html` uses Vite's `%BASE_URL%`
placeholder (not hardcoded root-absolute paths) for every file in `/public`, so it stays
correct automatically once `base` is set right.

This works whether the repository is public or private (private repos need GitHub Pro,
Team, or Enterprise for Pages).

### Custom domain (later)

1. In **Settings → Pages → Custom domain**, enter your domain and save
   (GitHub creates a `CNAME` file in your published output automatically)
2. At your domain registrar, add either:
   - an `A` record pointing to GitHub's Pages IPs, or
   - a `CNAME` record pointing to `your-username.github.io`
3. Once on a custom domain, set `base: '/'` in `vite.config.ts` (a custom domain is
   served from the root, not a repository subdirectory)
4. Wait for DNS to propagate, then enable **Enforce HTTPS** in the Pages settings

---

## 5. The Klero Logo

The real logo — `src/assets/logos/klero-logo.png` — is wired in via
`src/components/Logo.tsx` and used in both the header and footer (and anywhere else a
brand mark is needed; just render `<Logo />`).

The logo file itself is never recolored, cropped, or otherwise edited — it's brand
artwork. `Logo.tsx` only **resizes** it (a fixed height, `width: auto`, so the aspect
ratio is always preserved) for each placement:

- `size="lg"` (default, used in the header) — the primary placement
- `size="md"` (used in the footer) — a tighter spot

Since the logo's fixed brown color reads clearly on light backgrounds (the cream header)
but has poor contrast directly on dark ones, `tone="light"` (used for dark-background
placements like the footer) doesn't touch the logo's colors — it sits the unaltered
image on a small `bg-cream` backing chip instead, so it stays fully legible without ever
altering the artwork.

To update the logo file itself, replace `src/assets/logos/klero-logo.png` (keep the same
filename, or update the import path at the top of `Logo.tsx`).

---

## 6. Favicons & Social Image

`index.html` references a favicon set and an Open Graph image via Vite's `%BASE_URL%`
placeholder, resolved against `/public`. Two files exist today:

- `public/favicon.svg` — a real, working scalable favicon (the temporary Klero mark)
- `public/site.webmanifest` — web app manifest referencing the PNG sizes below

The following are **referenced but not yet generated** (browsers that don't support SVG
favicons will simply show no icon until these are added — this does not break the site):

- `public/apple-touch-icon.png` (180×180)
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/og-image.png` — used for social share previews (Open Graph / Twitter Card)

**To generate the favicon set:** upload `public/favicon.svg` (or your final logo) to a
tool like [realfavicongenerator.net](https://realfavicongenerator.net), download the
output, and drop the files into `public/` using the exact filenames above.

---

## 7. Business Information Placeholders

**Everything below is placeholder content — no real business details have been
invented.** Update it in one place and it propagates across the whole site.

### Contact details, WhatsApp, Instagram, service area

Edit the `site` object in **`src/data/site.ts`**:

```ts
export const site = {
  name: "Klero",
  tagline: "Food carried forward.",
  phone: "+1 (555) 123-4567",
  phoneHref: "tel:+15551234567",
  whatsappNumber: "15551234567",
  whatsappMessage: "Hello Klero, I'd like to place an order request.",
  email: "hello@klero.example",
  emailHref: "mailto:hello@klero.example",
  instagramHandle: "@klero.kitchen",
  instagramUrl: "https://instagram.com/klero.kitchen",
  serviceArea: "Serving [City, Region] — pickup and select local delivery",
  copyrightYear: new Date().getFullYear(),
};
```

Every phone number, WhatsApp link, email link, Instagram link, and the service-area line
across the header, hero, Order section, Contact section, and footer read from this one
object.

### This Weekend at Klero

Edit the `weekendDrop` object in **`src/data/weekend.ts`**:

```ts
export const weekendDrop = {
  active: true,               // set to false to hide the drop and show a fallback message
  featuredDish: "Braised short rib tray (serves 4–6)",
  featuredBake: "Spiced honey layer cake",
  cutoff: "Thursday, 6:00 PM",
  pickupWindow: "Saturday, 11:00 AM – 2:00 PM",
};
```

### Order Request Form → connecting a real backend

This is a static site with no server, so the form (`src/components/OrderForm.tsx`)
currently runs in **demo mode**: it validates input and shows a confirmation message,
but does not send data anywhere.

The single place to connect it is `ORDER_FORM_ENDPOINT` in **`src/data/order.ts`**:

```ts
export const ORDER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

- **Formspree** (recommended, zero backend code): create a form at
  [formspree.io](https://formspree.io), replace the placeholder URL above with your real
  endpoint. `OrderForm.tsx`'s `<form action={ORDER_FORM_ENDPOINT}>` and its `fetch()`
  submit handler both read from this constant automatically.
- **Netlify Forms**: add `data-netlify="true"` and a hidden `form-name` input to the
  `<form>` in `OrderForm.tsx`, then deploy on Netlify instead of (or alongside) GitHub
  Pages.
- **EmailJS**: replace the `fetch()` call in `OrderForm.tsx`'s `handleSubmit` with
  `emailjs.sendForm()`.
- **Supabase / a custom API**: point `ORDER_FORM_ENDPOINT` at your endpoint and adjust
  the `fetch()` call in `OrderForm.tsx` to match your API's request/response shape.

### Menu items & prices

Offerings live in **`src/data/offerings.ts`** as a typed array of categories and items
(Signature Meals, Baked Goods, Celebrations, Small Catering). Add, edit, or remove
entries there — `Offerings.tsx` renders whatever the array contains, so no component
code needs to change. Prices are intentionally left as `$—` placeholders.

### Photography

All imagery is currently **placeholder SVG art** in `src/assets/images/` (soft
brand-colored gradients, clearly labeled), imported and referenced from
`src/data/offerings.ts` and `src/data/gallery.ts`. Replace the files using the same
filenames to avoid touching those data files, or update the import paths there.

---

## 8. Sample Testimonials

The testimonials in `src/data/testimonials.ts` are explicitly marked as **sample
content** in a comment at the top of that file. They are not real customer quotes.
Replace the array's contents with genuine testimonials once available, or remove the
`<Testimonials />` import and usage in `src/App.tsx` to hide the section until then.

---

## 9. Architecture Notes

- **Single page, anchor navigation.** Klero's brief calls for one polished page rather
  than a routed multi-page site, so — unlike Liven — there is no `react-router-dom`
  dependency or `HashRouter`. `Header.tsx` and `Footer.tsx` link to in-page section ids
  (`#story`, `#offerings`, …) defined in `src/data/site.ts`'s `navLinks`.
- **`Reveal`** (`src/components/Reveal.tsx`) is the scroll-reveal primitive used
  throughout: it wraps content in an animate.css entrance animation the first time it
  scrolls into view, with a built-in fallback so content is never left stuck invisible
  (reduced-motion, unsupported browsers, or an observer that never fires all force a
  reveal). Wrap new sections/cards in `<Reveal>` rather than adding bespoke animation
  logic.
- **`Button`** (`src/components/Button.tsx`) is a small polymorphic component: pass
  `href` for any link (in-page anchor, `tel:`, `mailto:`, `wa.me`) or omit it for a
  native `<button>`.
- Brand colors and fonts are Tailwind v4 `@theme` tokens in `src/index.css` — they
  generate utilities directly (`bg-terracotta`, `text-cocoa`, `font-display`, …).

---

## 10. Design System Reference

Brand tokens (`@theme` block, top of `src/index.css`):

```css
--color-cocoa: #3e2723;
--color-brown: #6b412d;
--color-terracotta: #b87352;
--color-cream: #f8efe6;
--color-olive: #556b2f;
```

Typography: **Fraunces** (serif, headings/editorial) + **Inter** (sans, body/UI), loaded
from Google Fonts in `index.html`.

Animations respect `prefers-reduced-motion` throughout (see `Reveal.tsx` and the
`@media` rule in `src/index.css`).

---

## 11. Pre-Launch Checklist

- [ ] Replace all placeholder contact details in `src/data/site.ts`
- [ ] Connect a real form backend via `ORDER_FORM_ENDPOINT` (`src/data/order.ts`)
- [ ] Replace the stock placeholder photography in `src/assets/images/` with real photos
- [x] Real logo in place (`src/assets/logos/klero-logo.png`, wired via `Logo.tsx` — §5)
- [ ] Generate and add the favicon/PNG/OG-image set to `public/` (§6)
- [ ] Update `weekendDrop` in `src/data/weekend.ts` with real current-week details, or
      set `active: false`
- [ ] Replace or remove the sample testimonials (§8)
- [ ] Review offerings copy and pricing in `src/data/offerings.ts`
- [ ] Confirm `base` in `vite.config.ts` matches your actual repository name

---

Made with care.
