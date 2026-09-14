import ovenDial from "../assets/oven-dial.webp";

type DialProps = {
  size: number;
  angle: number;
  opacity: number;
};

/**
 * A real oven-dial photograph (a brushed-steel knob, cropped tight to its
 * knurled bezel with the surrounding control panel masked to transparency)
 * — this is what actually reads as "part of an oven" rather than an
 * illustration of one. Each instance just rotates/scales/fades the same
 * source image via CSS, so there's no per-instance SVG defs to namespace.
 * A drop-shadow lifts the knob off the flat cocoa background the way the
 * panel it was photographed on originally would.
 */
function Dial({ size, angle, opacity }: DialProps) {
  return (
    <img
      src={ovenDial}
      alt=""
      width={size}
      height={size}
      style={{
        opacity,
        transform: `rotate(${angle}deg)`,
        filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.45))",
      }}
    />
  );
}

const dialSets = {
  left: [
    { size: 92, angle: -35, opacity: 0.62 },
    { size: 130, angle: 15, opacity: 0.5 },
  ],
  right: [
    { size: 118, angle: -60, opacity: 0.55 },
    { size: 80, angle: 20, opacity: 0.68 },
  ],
};

/**
 * A cluster of oven-dial motifs for the empty side gutters of a wide,
 * centered dark section (built for Contact, at 1200px content-wrap on a
 * full-bleed background there's real dead space either side past
 * ~1280px viewports) — sized and rendered to read as if the section were
 * set into an oven's own control panel. Desktop only — there's no gutter
 * to fill below `lg`. Purely decorative: aria-hidden, no pointer events.
 */
export default function OvenDials({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-6 xl:left-16" : "right-6 xl:right-16"
      } flex-col items-center gap-14 pointer-events-none`}
      aria-hidden="true"
    >
      {dialSets[side].map((dial, i) => (
        <Dial key={i} {...dial} />
      ))}
    </div>
  );
}
