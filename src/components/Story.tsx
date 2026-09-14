import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import storyImage from "../assets/images/story.jpg";

export default function Story() {
  return (
    <section id="story" className="section-pad scroll-mt-20">
      <div className="content-wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
        <Reveal as="div" className="order-first lg:order-none group">
          <div className="rounded-[22px] overflow-hidden aspect-[4/5]">
            <img
              src={storyImage}
              alt="A warm kitchen table set with home-cooked dishes, evoking family gatherings"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <p className="font-display italic text-brown text-[0.98rem] mt-4">
            A table that has always made room for one more.
          </p>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading eyebrow="Our Story" title="More than recipes. An inheritance." />
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-4 mt-6 mb-7">
            <p className="text-brown text-[1.04rem] leading-relaxed">
              Klero began at a kitchen counter, long before it had a name. It began with a mother
              who spoke love in two languages — one written in simmered sauces and slow Sunday
              roasts, the other in the quiet ritual of flour, butter, and patience. Cooking fed the
              body. Baking, more often, fed the heart.
            </p>
            <p className="text-brown text-[1.04rem] leading-relaxed">
              Every dish carried an intention beyond the meal itself: that the people at the table
              would feel seen, welcomed, and cared for. That hospitality was never an occasion — it
              was simply how she lived.
            </p>
            <p className="text-brown text-[1.04rem] leading-relaxed">
              Klero exists to carry that forward. Not as a museum piece, frozen and untouched, but
              as something living — recipes remembered, refined, and shared again with a new
              generation of hands and tables. What mattered has been kept. What was needed to grow
              has been allowed to change.
            </p>
          </Reveal>

          <Reveal delay={200} className="flex items-center gap-4">
            <span className="w-11 h-px bg-terracotta shrink-0" aria-hidden="true" />
            <p className="font-display italic text-cocoa text-[1.05rem]">
              This is food that comes from somewhere. We hope you can taste it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
