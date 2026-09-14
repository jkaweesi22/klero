import { useId } from "react";

type DialProps = {
  size: number;
  angle: number;
  opacity: number;
};

const CENTER = 50;
const toRad = (deg: number) => (deg * Math.PI) / 180;
const pointOn = (r: number, deg: number) => [CENTER + r * Math.cos(toRad(deg)), CENTER + r * Math.sin(toRad(deg))] as const;

// A small gap at the bottom (the "off" position), same as a real dial —
// full 360° of ticks reads as a clock/sun, not an oven knob.
const GAP_DEG = 26;
const TICK_COUNT = 26;

/**
 * A dimensional oven/stove dial — a domed knob face (radial gradient +
 * a soft gloss highlight, lit consistently from the upper-left), a
 * genuinely recessed diagonal groove (its own dark-to-light gradient, not
 * a flat cutout), a center pivot screw, and a drop shadow lifting the
 * whole knob off the panel. Gradient/filter ids are namespaced with
 * useId() since each Dial renders its own <defs> — plain string ids would
 * collide the moment more than one dial is on the page.
 */
function Dial({ size, angle, opacity }: DialProps) {
  const uid = useId();
  const faceId = `dial-face-${uid}`;
  const grooveId = `dial-groove-${uid}`;
  const glossId = `dial-gloss-${uid}`;
  const shadowId = `dial-shadow-${uid}`;

  const startAngle = -90 + GAP_DEG / 2;
  const sweep = 360 - GAP_DEG;
  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => startAngle + (sweep * i) / (TICK_COUNT - 1));

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }} aria-hidden="true">
      <defs>
        <radialGradient id={faceId} cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#f3e6d8" />
          <stop offset="40%" stopColor="#b9764f" />
          <stop offset="75%" stopColor="#6b4029" />
          <stop offset="100%" stopColor="#2a1a14" />
        </radialGradient>

        <linearGradient id={grooveId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#140c0a" />
          <stop offset="50%" stopColor="#0d0705" />
          <stop offset="100%" stopColor="#5c3a27" />
        </linearGradient>

        <radialGradient id={glossId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffaf2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fffaf2" stopOpacity="0" />
        </radialGradient>

        <filter id={shadowId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* rim ticks — flatter and dimmer than the knob, so the knob stays the focal point */}
      {ticks.map((deg) => {
        const [x1, y1] = pointOn(33, deg);
        const [x2, y2] = pointOn(47.5, deg);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#e4c7ab"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        );
      })}

      <g filter={`url(#${shadowId})`}>
        <circle cx={CENTER} cy={CENTER} r="29" fill={`url(#${faceId})`} />
        <ellipse cx="40" cy="37" rx="15" ry="10" fill={`url(#${glossId})`} />

        {/* recessed diagonal groove: dark gradient (shadowed channel) plus a thin lit lip along its lower edge */}
        <rect x="26" y="45.5" width="48" height="7.5" rx="3.75" fill={`url(#${grooveId})`} transform={`rotate(${angle} 50 50)`} />
        <rect x="27" y="52.3" width="46" height="1" rx="0.5" fill="#d9a878" opacity="0.45" transform={`rotate(${angle} 50 50)`} />

        <circle cx={CENTER} cy={CENTER} r="3" fill="#150d0a" />
        <circle cx={CENTER - 0.9} cy={CENTER - 0.9} r="0.9" fill="#f3e6d8" opacity="0.7" />
      </g>
    </svg>
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
