import { Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import InstagramIcon from "./InstagramIcon";
import creamLogo from "../assets/logos/klero-logo-cream.png";
import { navLinks, site, whatsappHref } from "../data/site";

const socialLinks = [
  { label: "WhatsApp", href: whatsappHref, external: true, Icon: WhatsAppIcon },
  { label: "Instagram", href: site.instagramUrl, external: true, Icon: InstagramIcon },
  { label: "Email", href: site.emailHref, external: false, Icon: Mail },
] as const;

/**
 * The full cream wordmark (klero-logo-cream.png), not just the icon mark —
 * as the page's closing signature it earns more presence than a small K,
 * and it's the same lockup the header opens with, so the page bookends
 * itself with the same mark front and back.
 *
 * Two balanced blocks (brand left, nav + social right) rather than one
 * thin utility row — gives the bigger logo room to breathe and gives the
 * right side comparable visual weight, instead of a big mark next to a
 * line of small text. A faint version of the same flowing-line motif used
 * in the Hero/Meaning sections runs behind it for texture, so the dark
 * expanse doesn't read as flat/empty.
 */
export default function Footer() {
  return (
    <footer className="relative bg-cocoa text-cream/75 overflow-hidden" role="contentinfo">
      <div className="absolute inset-x-0 top-0 h-full text-cream/[0.05] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M-100,80 C 300,20 700,160 1100,60 C 1300,10 1500,90 1600,50"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-100,340 C 300,280 700,380 1100,300 C 1300,260 1500,320 1600,290"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="content-wrap relative py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <img src={creamLogo} alt="Klero" className="h-12 md:h-14 w-auto" />
            <p className="font-display italic text-cream/55 text-base">{site.tagline}</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
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
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-cream/45">
          <p>&copy; {site.copyrightYear} Klero. All rights reserved.</p>
          <p>Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
