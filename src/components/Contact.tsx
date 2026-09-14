import Reveal from "./Reveal";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import OvenDials from "./OvenDials";
import { site, whatsappHref } from "../data/site";

const items = [
  { label: "Phone", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: site.phone, href: whatsappHref, external: true },
  { label: "Email", value: site.email, href: site.emailHref },
  { label: "Instagram", value: site.instagramHandle, href: site.instagramUrl, external: true },
  { label: "Service Area", value: site.serviceArea },
];

export default function Contact() {
  return (
    <section id="contact" className="relative section-pad bg-cocoa text-cream text-center scroll-mt-20 overflow-hidden">
      <OvenDials side="left" />
      <OvenDials side="right" />

      <div className="content-wrap relative flex flex-col items-center">
        <Reveal>
          <p className="eyebrow text-terracotta mb-4">Contact</p>
          <h2 className="font-display text-[clamp(2rem,1.55rem+2vw,3.1rem)] text-cream mb-2">
            Let Klero be part of your table.
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-[900px] my-12 pt-12 border-t border-cream/15"
        >
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <span className="text-[0.75rem] tracking-wider uppercase text-cream/50">{item.label}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener" : undefined}
                  className="text-[1.02rem] hover:text-terracotta transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-[1.02rem]">{item.value}</span>
              )}
            </div>
          ))}
        </Reveal>

        <Reveal delay={180} className="flex flex-wrap justify-center gap-4">
          <Button href="#order" variant="primary" className="py-4.5 px-9">
            Request an Order
          </Button>
          <Button href={whatsappHref} target="_blank" rel="noopener" variant="outline-light" className="py-4.5 px-9">
            <WhatsAppIcon size={18} />
            Call / WhatsApp
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
