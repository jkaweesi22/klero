import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { offerCategories } from "../data/offerings";

export default function Offerings() {
  return (
    <section id="offerings" className="section-pad scroll-mt-20">
      <div className="content-wrap">
        <Reveal className="max-w-[760px] mb-16">
          <SectionHeading
            eyebrow="Offerings"
            title="Cooking and baking, under one table."
            description="A living selection, not a fixed menu. Offerings shift with the season and with what's being prepared — real dishes and prices are confirmed when you reach out."
          />
        </Reveal>

        {/* OFFERINGS DATA lives in src/data/offerings.ts — add, edit, or
            remove items there; nothing here needs to change. */}
        {offerCategories.map((category, ci) => (
          <div key={category.title} className={ci === offerCategories.length - 1 ? "" : "mb-16"}>
            <Reveal className="flex items-baseline justify-between gap-4 border-b border-cocoa/10 pb-4 mb-7">
              <h3 className="font-display text-2xl text-cocoa">{category.title}</h3>
              <p className="text-brown text-[0.95rem]">{category.description}</p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {category.items.map((item, i) => (
                <Reveal key={item.name} delay={i * 90} className="flex flex-col group">
                  <div className="rounded-[10px] overflow-hidden aspect-[5/4] mb-4">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <h4 className="font-display text-[1.15rem] text-cocoa mb-1.5">{item.name}</h4>
                  <p className="text-brown text-[0.94rem]">
                    {item.description}
                    {item.price && <span className="block mt-1 text-terracotta font-medium text-[0.86rem]">{item.price}</span>}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
