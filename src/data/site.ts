// ---------------------------------------------------------------------------
// Core business facts — the single source of truth for Klero's contact
// details. Every phone/WhatsApp/email/Instagram/service-area reference
// across the site reads from this object. Update the values below and the
// whole site updates with them.
//
// All values are placeholders — no real business information has been
// invented. See README.md for the full pre-launch checklist.
// ---------------------------------------------------------------------------

export const site = {
  name: "Klero",
  tagline: "Food carried forward.",
  phone: "+1 (555) 123-4567",
  phoneHref: "tel:+15551234567",
  whatsappNumber: "15551234567", // digits only, no + or spaces, for wa.me
  whatsappMessage: "Hello Klero, I'd like to place an order request.",
  email: "hello@klero.example",
  emailHref: "mailto:hello@klero.example",
  instagramHandle: "@klero.kitchen",
  instagramUrl: "https://instagram.com/klero.kitchen",
  serviceArea: "Serving [City, Region] — pickup and select local delivery",
  copyrightYear: new Date().getFullYear(),
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

// Anchor-based navigation — Klero is a single-page site by design (see
// README.md). Each `to` is an in-page section id.
export const navLinks = [
  { label: "Home", to: "#home" },
  { label: "Our Story", to: "#story" },
  { label: "Offerings", to: "#offerings" },
  { label: "Catering", to: "#catering" },
  { label: "Order", to: "#order" },
  { label: "Gallery", to: "#gallery" },
  { label: "Contact", to: "#contact" },
] as const;
