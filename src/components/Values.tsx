import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { values } from "../data/values";

export default function Values() {
  return (
    <section id="values" className="section-pad">
      <div className="content-wrap">
        <Reveal className="max-w-[760px] mx-auto text-center mb-16">
          <SectionHeading eyebrow="What Klero Stands For" title="Four things that don't change." align="center" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="pt-6 border-t border-cocoa/10">
              <span className="block font-display italic text-terracotta text-base mb-4">{v.mark}</span>
              <h3 className="font-display text-[1.3rem] text-cocoa mb-2.5">{v.title}</h3>
              <p className="text-brown text-[0.95rem]">{v.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
