import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { galleryFilters, galleryItems, type GalleryCategory } from "../data/gallery";

const sizeClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
};

export default function Gallery() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const visibleItems = galleryItems.filter((item) => active === "all" || item.category === active);

  return (
    <section id="gallery" className="section-pad scroll-mt-20">
      <div className="content-wrap">
        <Reveal className="max-w-[760px] mb-10">
          <SectionHeading
            eyebrow="Gallery"
            title="A few moments from the table."
            description="Cooking, baking, celebrations — and the table moments in between. Replace these placeholders with real photography in src/assets/images/."
          />
        </Reveal>

        <Reveal className="flex flex-wrap gap-2.5 mb-10" role="group" aria-label="Filter gallery">
          {galleryFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              className={`px-5 py-2.5 rounded-full text-[0.85rem] font-medium border transition-colors duration-200 ${
                active === f.value
                  ? "bg-cocoa border-cocoa text-cream"
                  : "border-cocoa/15 text-brown hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {visibleItems.map((item, i) => (
            <Reveal
              key={item.image + item.caption}
              as="figure"
              delay={Math.min(i, 7) * 80}
              className={`group relative m-0 rounded-[10px] overflow-hidden ${item.size ? sizeClasses[item.size] : ""}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[0.9s] ease-out group-hover:scale-[1.07]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-4.5 py-4 bg-gradient-to-t from-cocoa/75 to-transparent text-cream text-[0.82rem] tracking-wide uppercase opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {item.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
