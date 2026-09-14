import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/testimonials";

/**
 * SAMPLE CONTENT: the quotes rendered here come from src/data/testimonials.ts
 * and are placeholders written for demonstration only — not real customer
 * reviews. Replace that file's contents once genuine testimonials exist, or
 * remove this section (and its import in App.tsx) until then.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad bg-cream-deep">
      <div className="content-wrap">
        <Reveal className="max-w-[760px] mx-auto text-center mb-14">
          <SectionHeading eyebrow="Sample Testimonials" title="Placeholder quotes — not real customer reviews." align="center" />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 120} as="blockquote" className="m-0 p-8 bg-white rounded-[10px]">
              <p className="font-display italic text-[1.08rem] text-cocoa leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <cite className="not-italic text-[0.78rem] text-brown">— {t.attribution}</cite>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
