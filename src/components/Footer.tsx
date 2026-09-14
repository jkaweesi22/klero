import Logo from "./Logo";
import { navLinks, site, whatsappHref } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream/75" role="contentinfo">
      <div className="content-wrap grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 py-16">
        <div>
          <Logo tone="light" size="md" />
          <p className="font-display italic text-cream/55 text-[0.95rem] mt-4">{site.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest uppercase text-cream/90 mb-5">Navigate</h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <a href={link.to} className="font-body text-sm text-cream/60 hover:text-terracotta transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest uppercase text-cream/90 mb-5">Connect</h3>
          <ul className="flex flex-col gap-3 font-body text-sm text-cream/60">
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener" className="hover:text-terracotta transition-colors">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener" className="hover:text-terracotta transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-terracotta transition-colors">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="content-wrap flex flex-col sm:flex-row items-center justify-between gap-2 py-6 text-xs font-body text-cream/45">
          <p>
            &copy; {site.copyrightYear} Klero. All rights reserved.
          </p>
          <p>Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
