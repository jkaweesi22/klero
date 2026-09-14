import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import OrderForm from "./OrderForm";
import { site, whatsappHref } from "../data/site";

export default function Order() {
  return (
    <section id="order" className="section-pad scroll-mt-20">
      <div className="content-wrap">
        <Reveal className="max-w-[760px] mb-14">
          <SectionHeading
            eyebrow="Order With Klero"
            title="Order With Klero"
            description="Tell us what you'd like and your preferred date. We'll review your request and confirm availability, pricing, and next steps directly."
          />
        </Reveal>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <Reveal className="bg-white rounded-[22px] p-7 md:p-10 lg:sticky lg:top-[6.5rem]">
            <h3 className="font-display text-[1.4rem] text-cocoa mb-2.5">Call / WhatsApp</h3>
            <p className="text-brown text-[0.96rem] mb-6">
              The fastest way to reach us — ideal for quick questions or last-minute requests.
            </p>

            <Button href={whatsappHref} target="_blank" rel="noopener" variant="primary" className="w-full py-4.5 mb-7">
              <WhatsAppIcon size={20} />
              Call / WhatsApp Klero
            </Button>

            <ul className="flex flex-col gap-3.5 mb-7">
              <li className="flex justify-between pb-3.5 border-b border-cocoa/10 text-[0.94rem]">
                <span className="text-brown">Phone</span>
                <a href={site.phoneHref} className="font-medium hover:text-terracotta">{site.phone}</a>
              </li>
              <li className="flex justify-between pb-3.5 border-b border-cocoa/10 text-[0.94rem]">
                <span className="text-brown">WhatsApp</span>
                <a href={whatsappHref} target="_blank" rel="noopener" className="font-medium hover:text-terracotta">{site.phone}</a>
              </li>
              <li className="flex justify-between text-[0.94rem]">
                <span className="text-brown">Email</span>
                <a href={site.emailHref} className="font-medium hover:text-terracotta">{site.email}</a>
              </li>
            </ul>

            <p className="text-[0.86rem] text-brown bg-cream-deep border-l-2 border-terracotta rounded-r px-4.5 py-3.5">
              Submitting a request does not automatically confirm an order. Klero will confirm availability,
              pricing, and payment before anything is finalized.
            </p>
          </Reveal>

          <Reveal delay={100} className="bg-white rounded-[22px] p-7 md:p-11">
            <h3 className="font-display text-[1.4rem] text-cocoa mb-6">Order Request Form</h3>

            {/* ================================================================
                FORM ENDPOINT CONFIGURATION
                This is a static site (GitHub Pages) with no backend, so this
                form currently runs in "demo mode": submissions are validated
                and a confirmation message is shown, but nothing is sent
                anywhere. The single source of truth for connecting a real
                service is ORDER_FORM_ENDPOINT in src/data/order.ts — see the
                comment there for Formspree / Netlify / EmailJS / Supabase
                integration steps.
               ================================================================ */}
            <OrderForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
