import Reveal from "./Reveal";
import Button from "./Button";
import SmokeWisps from "./SmokeWisps";
import ParallaxImage from "./ParallaxImage";
import { weekendDrop } from "../data/weekend";
import weekendDish from "../assets/images/weekend-dish.jpg";
import weekendBake from "../assets/images/weekend-bake.jpg";

const details = [
  { label: "Featured Dish", value: weekendDrop.featuredDish },
  { label: "Featured Bake", value: weekendDrop.featuredBake },
  { label: "Order Cutoff", value: weekendDrop.cutoff },
  { label: "Pickup Window", value: weekendDrop.pickupWindow },
];

/**
 * To update: edit `weekendDrop` in src/data/weekend.ts. Set `active: false`
 * there to automatically show the fallback message below instead.
 */
export default function Weekend() {
  return (
    <section id="weekend" className="relative section-pad bg-cocoa text-cream overflow-hidden">
      <SmokeWisps className="inset-y-0 right-[6%] w-[360px] hidden sm:block" count={4} />

      <div className="content-wrap relative grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-terracotta mb-3">This Weekend at Klero</p>
            <h2 className="font-display text-[clamp(2rem,1.55rem+2vw,3.1rem)] leading-[1.12] mb-4">
              {weekendDrop.active ? "A limited weekend drop, made in small batches." : "No active weekend drop right now."}
            </h2>
            <p className="text-cream/80 text-[1.1rem] leading-relaxed max-w-[56ch]">
              {weekendDrop.active
                ? "Klero currently runs through selected weekend food drops rather than daily service. Here's what's being prepared this week."
                : "Klero isn't running a weekend drop this week — but we're happy to prepare a custom order for you."}
            </p>
          </Reveal>

          {weekendDrop.active && (
            <Reveal delay={100} className="grid grid-cols-2 gap-x-8 gap-y-5 my-10 p-7 border border-cream/20 rounded-[10px]">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1">
                  <span className="text-[0.75rem] tracking-wider uppercase text-cream/55">{d.label}</span>
                  <span className="font-display text-[1.15rem]">{d.value}</span>
                </div>
              ))}
            </Reveal>
          )}

          {weekendDrop.active && (
            <Reveal delay={180} className="mb-6">
              <p className="italic text-cream/65 text-[0.92rem]">Orders are accepted until capacity is reached.</p>
            </Reveal>
          )}

          <Reveal delay={220}>
            <Button href="#order" variant="primary" withArrow>
              {weekendDrop.active ? "Request This Weekend's Order" : "Request a Custom Order"}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative grid max-w-[420px] mx-auto lg:max-w-none">
          <ParallaxImage
            src={weekendDish}
            alt="This weekend's featured dish"
            className="relative z-10 rounded-[22px] aspect-[4/5]"
            distance={26}
          />
          <img
            src={weekendBake}
            alt="This weekend's featured bake"
            loading="lazy"
            className="z-10 hidden sm:block absolute w-[46%] -bottom-[8%] -left-[10%] rounded-[22px] border-[6px] border-cocoa shadow-[0_20px_40px_-14px_rgba(0,0,0,0.5)] object-cover aspect-[4/5]"
          />
        </Reveal>
      </div>
    </section>
  );
}
