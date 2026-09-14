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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="relative font-body text-[0.93rem] font-medium text-cocoa py-1 after:absolute after:left-0 after:right-full after:-bottom-0.5 after:h-px after:bg-terracotta after:transition-all after:duration-300 hover:after:right-0"
            >
              {link.label}
            </a>
          ))}
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
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-base text-cocoa py-3.5 border-b border-cocoa/10"
                >
                  {link.label}
                </a>
              ))}
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
