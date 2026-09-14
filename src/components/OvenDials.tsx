type DialProps = {
  size: number;
  angle: number;
  opacity: number;
};

const CENTER = 50;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointOn = (r: number, deg: number) => [CENTER + r * Math.cos(toRad(deg)), CENTER + r * Math.sin(toRad(deg))] as const;

// Real stove/oven knobs don't turn a full circle — there's a gap at the
// bottom for OFF. Sweeping ticks across ~260° (rather than all 360°) is
// what actually reads as "oven dial" instead of "clock" or "gauge".
const SWEEP_START = -220;
const SWEEP_END = 40;
const TICK_COUNT = 9;

/**
 * A single oven/stove control knob: outer bezel, a knurled grip edge
 * (dense short ticks around the full rim), a gapped setting scale with
 * major/minor ticks, and a solid pointer wedge at the current setting —
 * the actual anatomy of a real dial, not an abstracted clock face.
 */
function Dial({ size, angle, opacity }: DialProps) {
  const knurls = Array.from({ length: 36 }, (_, i) => i * 10);
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => SWEEP_START + ((SWEEP_END - SWEEP_START) * i) / (TICK_COUNT - 1));

  const [tipX, tipY] = pointOn(43, angle);
  const perp = angle + 90;
  const [b1X, b1Y] = [
    CENTER + 24 * Math.cos(toRad(angle)) + 3.2 * Math.cos(toRad(perp)),
    CENTER + 24 * Math.sin(toRad(angle)) + 3.2 * Math.sin(toRad(perp)),
  ];
  const [b2X, b2Y] = [
    CENTER + 24 * Math.cos(toRad(angle)) - 3.2 * Math.cos(toRad(perp)),
    CENTER + 24 * Math.sin(toRad(angle)) - 3.2 * Math.sin(toRad(perp)),
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="text-cream" style={{ opacity }} aria-hidden="true">
      {/* outer bezel */}
      <circle cx={CENTER} cy={CENTER} r="47.5" fill="none" stroke="currentColor" strokeWidth="1.3" />

      {/* knurled grip edge */}
      {knurls.map((deg) => {
        const [x1, y1] = pointOn(44.5, deg);
        const [x2, y2] = pointOn(47.5, deg);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8" />;
      })}

      {/* setting scale, gapped at the bottom (the "off" position) */}
      {ticks.map((deg, i) => {
        const isMajor = i === 0 || i === TICK_COUNT - 1 || i === Math.floor(TICK_COUNT / 2);
        const [x1, y1] = pointOn(isMajor ? 33 : 37, deg);
        const [x2, y2] = pointOn(42.5, deg);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={isMajor ? 1.8 : 1.1} />;
      })}

      {/* the knob face */}
      <circle cx={CENTER} cy={CENTER} r="24" fill="none" stroke="currentColor" strokeWidth="1.2" />

      {/* pointer wedge, aimed at the current setting */}
      <polygon points={`${tipX},${tipY} ${b1X},${b1Y} ${b2X},${b2Y}`} fill="currentColor" />

      <circle cx={CENTER} cy={CENTER} r="3" fill="currentColor" />
    </svg>
  );
}

const dialSets = {
  left: [
    { size: 76, angle: -140, opacity: 0.18 },
    { size: 104, angle: -40, opacity: 0.13 },
    { size: 58, angle: 10, opacity: 0.2 },
  ],
  right: [
    { size: 64, angle: -180, opacity: 0.19 },
    { size: 100, angle: -60, opacity: 0.14 },
    { size: 80, angle: 0, opacity: 0.17 },
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
