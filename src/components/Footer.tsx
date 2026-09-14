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
 * line of small text. A faint wood-grain texture (an SVG feTurbulence
 * filter, not an image — see the "chopping board" note below) runs behind
 * it, so the dark expanse reads as a material rather than a flat block of
 * color.
 */

/**
 * A chopping-board wood-grain texture, generated at render time with an
 * SVG feTurbulence filter rather than a photo — stays crisp at any size,
 * costs no image weight, and tiles seamlessly across any footer width.
 * baseFrequency is deliberately anisotropic (very low X, higher Y): low
 * frequency along X keeps each grain streak long and coherent
 * horizontally, higher frequency along Y is what creates the separate
 * streaks stacked vertically — the standard recipe for turbulence-noise
 * wood grain. feColorMatrix then recolors the (grayscale) noise into a
 * warm brown and derives alpha from the noise's own luminance, so the
 * grain shows as soft variation in opacity rather than a flat tint.
 * `mix-blend-soft-light` lets it interact with the cocoa base color
 * instead of sitting on top of it, which is what keeps it feeling like a
 * material instead of a decal.
 */
function WoodGrainTexture() {
  return (
    <div
      className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="footer-wood-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.18" numOctaves={4} seed={11} result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.86
                    0 0 0 0 0.62
                    0 0 0 0 0.42
                    0 0 0 0.85 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#footer-wood-grain)" />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-cocoa text-cream/75 overflow-hidden" role="contentinfo">
      <WoodGrainTexture />

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
