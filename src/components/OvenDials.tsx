import ovenDial from "../assets/oven-dial.webp";

type DialProps = {
  size: number;
  pointerAngle: number;
  opacity: number;
};

const CENTER = 50;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointOn = (r: number, deg: number) => [CENTER + r * Math.cos(toRad(deg)), CENTER + r * Math.sin(toRad(deg))] as const;

// A gap at the bottom between OFF and 300 — same "off position" a real
// dial leaves at 6 o'clock — so the printed scale reads as an oven face,
// not a full clock dial.
const GAP_DEG = 34;
const TICK_COUNT = 32;
const LABELS = ["OFF", "50", "100", "150", "200", "250", "300"];

/**
 * A real oven-dial photograph (a brushed-steel knob, cropped tight to its
 * knurled bezel with the surrounding control panel masked to transparency)
 * set into a printed temperature scale — tick marks and numbers, drawn as
 * SVG so they stay upright and legible rather than spinning with the
 * knob. On a real appliance the panel print is fixed and only the knob
 * itself turns, so `pointerAngle` rotates just the photo, never the ring
 * around it. A drop-shadow lifts the knob off the flat cocoa background
 * the way the panel it was photographed on originally would.
 */
function Dial({ size, pointerAngle, opacity }: DialProps) {
  const startAngle = -90 + GAP_DEG / 2;
  const sweep = 360 - GAP_DEG;
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => startAngle + (sweep * i) / (TICK_COUNT - 1));
  const labelAngles = LABELS.map((_, i) => startAngle + (sweep * i) / (LABELS.length - 1));

  return (
    <div className="relative" style={{ width: size, height: size, opacity }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="absolute inset-0 text-cream" aria-hidden="true">
        {ticks.map((deg) => {
          const [x1, y1] = pointOn(35, deg);
          const [x2, y2] = pointOn(39, deg);
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />;
        })}
        {labelAngles.map((deg, i) => {
          const [x, y] = pointOn(45.5, deg);
          return (
            <text
              key={LABELS[i]}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="6.2"
              fontFamily="Inter, sans-serif"
              fontWeight={500}
              fill="currentColor"
              opacity="0.7"
            >
              {LABELS[i]}
            </text>
          );
        })}
      </svg>

      <img
        src={ovenDial}
        alt=""
        width={size * 0.56}
        height={size * 0.56}
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `translate(-50%, -50%) rotate(${pointerAngle}deg)`,
          filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.45))",
        }}
      />
    </div>
  );
}

// The photo's baked-in pointer sits at 12 o'clock (rotation 0), which is
// dead center of the gap between 300 and OFF — a real dial is never left
// pointing at blank panel, so these are picked to land cleanly on a
// printed number well clear of that gap (250 on the left, 50 on the
// right) rather than at an angle that reads as ambiguous or broken.
const dials = {
  left: { size: 176, pointerAngle: -71 },
  right: { size: 176, pointerAngle: 71 },
};

/**
 * A single oven-dial motif for the empty side gutter of a wide, centered
 * dark section (built for Contact, at 1200px content-wrap on a full-bleed
 * background there's real dead space either side past ~1280px viewports)
 * — rendered to read as if the section were set into an oven's own
 * control panel. Desktop only — there's no gutter to fill below `lg`.
 * Purely decorative: aria-hidden, no pointer events.
 */
export default function OvenDials({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-6 xl:left-16" : "right-6 xl:right-16"
      } pointer-events-none`}
      aria-hidden="true"
    >
      <Dial {...dials[side]} opacity={0.55} />
    </div>
  );
}
