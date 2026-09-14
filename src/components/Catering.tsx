import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import cateringImage from "../assets/images/catering.jpg";

const occasions = [
  "Birthdays",
  "Baby showers",
  "Graduations",
  "Church & community events",
  "Family gatherings",
  "Intimate celebrations",
];

/**
 * "Request Catering" preselects Order Type in the form below. This is a
 * small, deliberate DOM convenience (rather than shared React state) since
 * Klero is a single always-mounted page — see README.md.
 */
function selectCateringOrderType() {
  const select = document.getElementById("field-order-type") as HTMLSelectElement | null;
  if (select) select.value = "Catering";
}

export default function Catering() {
  return (
    <section id="catering" className="section-pad bg-cream-deep scroll-mt-20">
      <div className="content-wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <img
            src={cateringImage}
            alt="An outdoor gathering table laid with a small catering spread"
            loading="lazy"
            className="rounded-[22px] aspect-[4/5] object-cover w-full"
          />
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Catering"
              title="Small gatherings, thoughtfully catered."
              description="Klero caters intimate, meaningful occasions — the kind where food is part of how people feel cared for. Currently focused on:"
            />
          </Reveal>

          <Reveal delay={100} className="grid grid-cols-2 gap-x-10 gap-y-3 my-6">
            {occasions.map((o) => (
              <li key={o} className="relative list-none pl-5 font-medium text-cocoa before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-terracotta">
                {o}
              </li>
            ))}
          </Reveal>

          <Reveal delay={160} className="mb-7">
            <p className="italic text-brown text-[0.92rem]">
              Klero is not currently set up for large corporate events. Reach out and we'll let you know if your
              gathering is a good fit.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <Button href="#order" variant="primary" withArrow onClick={selectCateringOrderType}>
              Request Catering
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
