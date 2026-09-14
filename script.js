/* =========================================================================
   KLERO — script.js
   Vanilla JS only. No frameworks, no build step.
   ========================================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     BUSINESS INFO — single source of truth
     Update these placeholder values and every phone/WhatsApp/email/
     Instagram/service-area reference across the site updates automatically.
     --------------------------------------------------------------------- */
  const BUSINESS_INFO = {
    phoneDisplay: "+1 (555) 123-4567",   // shown to visitors
    phoneHref: "+15551234567",           // digits + leading + for tel: links
    whatsappNumber: "15551234567",       // digits only, no + or spaces, for wa.me
    whatsappMessage: "Hello Klero, I'd like to place an order request.",
    email: "hello@klero.example",
    instagramHandle: "@klero.kitchen",
    instagramUrl: "https://instagram.com/klero.kitchen",
    serviceArea: "Serving [City, Region] — pickup and select local delivery",
  };

  /* ---------------------------------------------------------------------
     WEEKEND DROP — update weekly, or set active:false to hide details
     --------------------------------------------------------------------- */
  const WEEKEND_DROP = {
    active: true,
    featuredDish: "Braised short rib tray (serves 4–6)",
    featuredBake: "Spiced honey layer cake",
    cutoff: "Thursday, 6:00 PM",
    pickupWindow: "Saturday, 11:00 AM – 2:00 PM",
  };

  /* ---------------------------------------------------------------------
     ORDER FORM ENDPOINT
     Static GitHub Pages sites have no backend. This constant controls
     whether the form runs in local "demo mode" or submits for real.

     To go live with Formspree:
       1. Create a form at https://formspree.io
       2. Replace the placeholder below with your endpoint, e.g.
          "https://formspree.io/f/abcdwxyz"
       3. The <form> element's `action` attribute (in index.html) is kept
          in sync with this constant automatically on page load.

     Netlify Forms / EmailJS / Supabase / custom API: see the detailed
     comment above the <form> in index.html for the integration points.
     --------------------------------------------------------------------- */
  const ORDER_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const isEndpointConfigured = () =>
    !!ORDER_FORM_ENDPOINT && !ORDER_FORM_ENDPOINT.includes("YOUR_FORM_ID");

  /* ---------------------------------------------------------------------
     Inject business info into the DOM
     --------------------------------------------------------------------- */
  function applyBusinessInfo() {
    document.querySelectorAll("[data-business]").forEach((el) => {
      const key = el.getAttribute("data-business");
      if (BUSINESS_INFO[key] !== undefined) {
        el.textContent = BUSINESS_INFO[key];
      }
    });

    document.querySelectorAll('[data-business-href="phone"]').forEach((el) => {
      el.setAttribute("href", `tel:${BUSINESS_INFO.phoneHref}`);
    });

    document.querySelectorAll('[data-business-href="whatsapp"]').forEach((el) => {
      const text = encodeURIComponent(BUSINESS_INFO.whatsappMessage);
      el.setAttribute("href", `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`);
    });

    document.querySelectorAll('[data-business-href="email"]').forEach((el) => {
      el.setAttribute("href", `mailto:${BUSINESS_INFO.email}`);
    });

    document.querySelectorAll('[data-business-href="instagram"]').forEach((el) => {
      el.setAttribute("href", BUSINESS_INFO.instagramUrl);
    });
  }

  /* ---------------------------------------------------------------------
     Weekend drop
     --------------------------------------------------------------------- */
  function applyWeekendDrop() {
    const section = document.getElementById("weekend");
    if (!section) return;

    if (!WEEKEND_DROP.active) {
      document.getElementById("weekend-headline").textContent =
        "No active weekend drop right now.";
      document.getElementById("weekend-active-copy").textContent =
        "Klero isn't running a weekend drop this week — but we're happy to prepare a custom order for you.";
      const details = document.getElementById("weekend-details");
      if (details) details.style.display = "none";
      const note = section.querySelector(".weekend-note");
      if (note) note.style.display = "none";
      const cta = document.getElementById("weekend-cta");
      if (cta) cta.querySelector("span").textContent = "Request a Custom Order";
      return;
    }

    document.querySelectorAll("[data-weekend]").forEach((el) => {
      const key = el.getAttribute("data-weekend");
      if (WEEKEND_DROP[key]) el.textContent = WEEKEND_DROP[key];
    });
  }

  /* ---------------------------------------------------------------------
     Sticky header shadow on scroll
     --------------------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    if (!toggle || !mobileNav) return;

    const closeNav = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Smooth anchor scroll (accounts for sticky header height)
     --------------------------------------------------------------------- */
  function initSmoothScroll() {
    const header = document.getElementById("site-header");
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
        window.scrollTo({
          top,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
        history.pushState(null, "", id);
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal (IntersectionObserver)
     --------------------------------------------------------------------- */
  function initScrollReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));

    // Stagger indices for grids that animate their own children
    document.querySelectorAll(".value-item, .testimonial").forEach((el, i, arr) => {
      const localIndex = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty("--i", localIndex);
    });
  }

  /* ---------------------------------------------------------------------
     Hero symbol draw-once animation
     --------------------------------------------------------------------- */
  function initHeroMark() {
    const mark = document.querySelector(".hero-mark");
    if (!mark) return;
    // Trigger on next frame so the CSS animation reliably fires once on load
    requestAnimationFrame(() => {
      mark.classList.add("is-drawn");
    });
  }

  /* ---------------------------------------------------------------------
     Gallery filtering
     --------------------------------------------------------------------- */
  function initGalleryFilter() {
    const pills = document.querySelectorAll(".filter-pill");
    const items = document.querySelectorAll(".gallery-item");
    if (!pills.length) return;

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");

        const filter = pill.getAttribute("data-filter");
        items.forEach((item) => {
          const match = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     Catering CTA → preselect "Catering" in the order form
     --------------------------------------------------------------------- */
  function initCateringCta() {
    const cta = document.getElementById("catering-cta");
    const orderType = document.getElementById("field-order-type");
    if (!cta || !orderType) return;
    cta.addEventListener("click", () => {
      orderType.value = "Catering";
    });
  }

  /* ---------------------------------------------------------------------
     Order form submission
     --------------------------------------------------------------------- */
  function initOrderForm() {
    const form = document.getElementById("order-form");
    const status = document.getElementById("form-status");
    if (!form) return;

    // Keep the form's action attribute in sync with ORDER_FORM_ENDPOINT
    form.setAttribute("action", ORDER_FORM_ENDPOINT);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.classList.remove("is-error");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      if (!isEndpointConfigured()) {
        // DEMO MODE — no backend connected yet.
        // See the comment above the <form> in index.html, and the
        // ORDER_FORM_ENDPOINT constant above, for how to connect a
        // real submission service (Formspree, Netlify, EmailJS, etc).
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.info(
          "[Klero] Order form is running in demo mode — no data was sent. " +
          "Set ORDER_FORM_ENDPOINT in script.js to connect a real submission service."
        );
        status.textContent =
          "Thank you — your request has been noted. (Demo mode: connect a form endpoint in script.js to receive real submissions.)";
        form.reset();
        submitBtn.disabled = false;
        return;
      }

      try {
        const formData = new FormData(form);
        const response = await fetch(ORDER_FORM_ENDPOINT, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent =
            "Thank you — your request has been sent. Klero will confirm availability and next steps shortly.";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        status.classList.add("is-error");
        status.textContent =
          "Something went wrong sending your request. Please try WhatsApp or email instead.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  function initFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------------
     Init
     --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyBusinessInfo();
    applyWeekendDrop();
    initHeaderScroll();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initHeroMark();
    initGalleryFilter();
    initCateringCta();
    initOrderForm();
    initFooterYear();
  });
})();
