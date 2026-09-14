type DialProps = {
  size: number;
  angle: number;
  opacity: number;
};

/** A single abstract dial — a ringed circle with rim ticks and a pointer, echoing an oven control knob without being a literal illustration of one. */
function Dial({ size, angle, opacity }: DialProps) {
  const rad = (angle * Math.PI) / 180;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="text-cream" style={{ opacity }} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
      <line
        x1="50"
        y1="50"
        x2={50 + 34 * Math.cos(rad)}
        y2={50 + 34 * Math.sin(rad)}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((tick) => {
        const tRad = (tick * Math.PI) / 180;
        return (
          <line
            key={tick}
            x1={50 + 40 * Math.cos(tRad)}
            y1={50 + 40 * Math.sin(tRad)}
            x2={50 + 46 * Math.cos(tRad)}
            y2={50 + 46 * Math.sin(tRad)}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}

const dialSets = {
  left: [
    { size: 72, angle: 205, opacity: 0.16 },
    { size: 100, angle: 35, opacity: 0.12 },
    { size: 54, angle: 300, opacity: 0.19 },
  ],
  right: [
    { size: 60, angle: 150, opacity: 0.18 },
    { size: 96, angle: 320, opacity: 0.13 },
    { size: 76, angle: 60, opacity: 0.16 },
  ],
};

/**
 * A vertical cluster of oven-dial motifs for the empty side gutters of a
 * wide, centered dark section (built for Contact, at 1200px content-wrap
 * on a full-bleed background there's real dead space either side past
 * ~1280px viewports). Desktop only — there's no gutter to fill below
 * `lg`. Purely decorative: aria-hidden, no pointer events, and each
 * dial's own opacity keeps the whole thing present without competing
 * with the actual content.
 */
export default function OvenDials({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-6 xl:left-14" : "right-6 xl:right-14"
      } flex-col items-center gap-10 pointer-events-none`}
      aria-hidden="true"
    >
      {dialSets[side].map((dial, i) => (
        <Dial key={i} {...dial} />
      ))}
    </div>
  );
}
