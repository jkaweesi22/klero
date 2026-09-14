import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import { navLinks, whatsappHref } from "../data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever section we're currently in, so the nav
  // quietly tracks where you are on the page as you scroll.
  //
  // Deliberately computed from live geometry on every scroll/resize (via
  // rAF), rather than an IntersectionObserver watching for a thin band to
  // be crossed — a crossing-event observer can miss a section entirely on
  // a large, single-frame scroll jump (a scrollbar drag, Page Down, or a
  // fast trackpad flick), since the browser only evaluates intersections
  // against rendered frames, not every intermediate scroll position. This
  // approach just asks "which section's top is above the reference line
  // right now?" after any jump, so it can't be skipped.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.to.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActiveId(current);
    };
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_8px_30px_-20px_rgba(62,39,35,0.3)] border-b border-cocoa/10"
          : "bg-cream/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="content-wrap flex items-center justify-between py-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = link.to === `#${activeId}`;
            return (
              <a
                key={link.to}
                href={link.to}
                aria-current={isActive ? "true" : undefined}
                className={`relative font-body text-[0.93rem] font-medium py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-terracotta after:transition-all after:duration-300 ${
                  isActive ? "text-terracotta after:right-0" : "text-cocoa after:right-full hover:after:right-0"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center">
          <Button href="#order" variant="primary" className="px-5 py-2.5 text-[0.85rem]">
            Request an Order
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-cocoa p-2 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-cream border-t border-cocoa/10"
          >
            <nav className="content-wrap flex flex-col py-4" aria-label="Mobile">
              {navLinks.map((link) => {
                const isActive = link.to === `#${activeId}`;
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`font-body text-base py-3.5 border-b border-cocoa/10 ${
                      isActive ? "text-terracotta font-medium" : "text-cocoa"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-5 flex flex-col gap-3">
                <Button href="#order" variant="primary" onClick={() => setMenuOpen(false)}>
                  Request an Order
                </Button>
                <Button href={whatsappHref} variant="outline" target="_blank" rel="noopener">
                  <WhatsAppIcon size={16} />
                  Call / WhatsApp
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
