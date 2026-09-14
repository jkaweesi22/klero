import { Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import InstagramIcon from "./InstagramIcon";
import kIcon from "../assets/logos/klero-k-icon-cream.png";
import { navLinks, site, whatsappHref } from "../data/site";

const socialLinks = [
  { label: "WhatsApp", href: whatsappHref, external: true, Icon: WhatsAppIcon },
  { label: "Instagram", href: site.instagramUrl, external: true, Icon: InstagramIcon },
  { label: "Email", href: site.emailHref, external: false, Icon: Mail },
] as const;

/**
 * Kept deliberately compact — one row on desktop (mark, nav, social),
 * a slim divider, then copyright. The previous version stacked three
 * generously-padded columns with vertical link lists, which read as a lot
 * of mostly-empty space for how little content the footer actually holds.
 */
export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream/75" role="contentinfo">
      <div className="content-wrap py-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={kIcon} alt="Klero" className="h-9 w-auto shrink-0" />
            <p className="font-display italic text-cream/55 text-[0.92rem]">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="font-body text-sm text-cream/60 hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, external, Icon }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                aria-label={label}
                className="text-cream/60 hover:text-terracotta transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-7 pt-5 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-cream/45">
          <p>&copy; {site.copyrightYear} Klero. All rights reserved.</p>
          <p>Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
