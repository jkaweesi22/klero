type DialProps = {
  size: number;
  angle: number;
  opacity: number;
};

const CENTER = 50;
const COCOA = "#3e2723";
const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointOn = (r: number, deg: number) => [CENTER + r * Math.cos(toRad(deg)), CENTER + r * Math.sin(toRad(deg))] as const;

// A small gap at the bottom (the "off" position), same as a real dial —
// full 360° of ticks reads as a clock/sun, not an oven knob.
const GAP_DEG = 26;
const TICK_COUNT = 26;

/**
 * A bold, iconographic oven/stove dial — a solid disc ringed by thick
 * radiating tick wedges, with a diagonal indicator bar. Modeled directly
 * on a real dial-icon reference rather than abstracted into thin line art
 * (an earlier pass here), which is what actually makes it read as "part
 * of an oven" instead of a decorative gauge.
 *
 * The indicator bar is a knockout, not an overlaid shape: it's filled
 * with the exact same cocoa as the section background, so at any opacity
 * it blends back to true background color while the cream disc around it
 * stays visibly tinted — the bar reads as a genuine cutout in the knob,
 * the way it would on a real appliance, rather than a paler line drawn on
 * top.
 */
function Dial({ size, angle, opacity }: DialProps) {
  const startAngle = -90 + GAP_DEG / 2;
  const sweep = 360 - GAP_DEG;
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => startAngle + (sweep * i) / (TICK_COUNT - 1));

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="text-cream" style={{ opacity }} aria-hidden="true">
      {ticks.map((deg) => {
        const [x1, y1] = pointOn(33, deg);
        const [x2, y2] = pointOn(48, deg);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3.4" strokeLinecap="butt" />;
      })}

      <circle cx={CENTER} cy={CENTER} r="29" fill="currentColor" />

      <rect x="26" y="45" width="48" height="8.5" rx="4.25" fill={COCOA} transform={`rotate(${angle} 50 50)`} />
    </svg>
  );
}

const dialSets = {
  left: [
    { size: 92, angle: -35, opacity: 0.28 },
    { size: 130, angle: 15, opacity: 0.22 },
  ],
  right: [
    { size: 118, angle: -60, opacity: 0.24 },
    { size: 80, angle: 20, opacity: 0.3 },
  ],
};

/**
 * A cluster of oven-dial motifs for the empty side gutters of a wide,
 * centered dark section (built for Contact, at 1200px content-wrap on a
 * full-bleed background there's real dead space either side past
 * ~1280px viewports) — sized and styled to read as if the section were
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
