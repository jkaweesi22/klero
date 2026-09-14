import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import galleryCooking1 from "../assets/images/gallery-cooking-1.jpg";
import galleryBaking1 from "../assets/images/gallery-baking-1.jpg";
import galleryTable1 from "../assets/images/gallery-table-1.jpg";

/**
 * A visual interlude between "The Meaning of Klero" and the Offerings grid —
 * three kitchen moments, each drifting at its own speed as the page
 * scrolls (see ParallaxImage), so the row shifts gently out of alignment
 * rather than moving as one flat block. Purely a mood beat; no copy beyond
 * a short heading.
 */
export default function KitchenMontage() {
  return (
    <section aria-label="Moments from the kitchen" className="section-pad overflow-hidden">
      <div className="content-wrap">
        <Reveal className="max-w-[520px] mb-12">
          <p className="eyebrow text-terracotta mb-3">In the Kitchen</p>
          <h2 className="font-display text-[clamp(1.7rem,1.35rem+1.4vw,2.4rem)] text-cocoa leading-tight">
            Where it starts, every time.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6">
          <Reveal delay={0} className="sm:mt-8 md:mt-16">
            <ParallaxImage
              src={galleryCooking1}
              alt="A home kitchen stovetop with a wok of sautéed vegetables"
              className="rounded-[18px] aspect-[4/5] sm:aspect-[3/4]"
              distance={70}
            />
          </Reveal>

          <Reveal delay={120}>
            <ParallaxImage
              src={galleryBaking1}
              alt="Baking ingredients laid out: flour, eggs, butter, and a rolling pin"
              className="rounded-[18px] aspect-[4/5] sm:aspect-[3/4]"
              distance={40}
            />
          </Reveal>

          <Reveal delay={240} className="sm:mt-10 md:mt-24">
            <ParallaxImage
              src={galleryTable1}
              alt="An elegantly set dining table with candlelight"
              className="rounded-[18px] aspect-[4/5] sm:aspect-[3/4]"
              distance={90}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
