import kleroLogo from "../assets/logos/klero-logo.png";

type LogoProps = {
  /** "lg" for the primary header placement, "md" for tighter spots like the footer. */
  size?: "lg" | "md";
  /** "light" is for placements on a dark background (e.g. the footer) — the
   * logo itself is never recolored (it's brand artwork), so on dark
   * backgrounds it sits on a small light backing chip instead. */
  tone?: "dark" | "light";
  className?: string;
};

// The logo file is a fixed-color (warm brown) wordmark on a transparent
// background — see src/assets/logos/klero-logo.png. It is never recolored,
// cropped, or otherwise altered; only resized (height set, width auto) for
// each placement.
const heights: Record<"lg" | "md", string> = {
  lg: "h-9 md:h-10",
  md: "h-7 md:h-8",
};

export default function Logo({ size = "lg", tone = "dark", className = "" }: LogoProps) {
  const img = (
    <img
      src={kleroLogo}
      alt="Klero"
      className={`${heights[size]} w-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]`}
    />
  );

  return (
    <a href="#home" className={`group inline-flex items-center ${className}`} aria-label="Klero — home">
      {tone === "light" ? (
        <span className="inline-flex items-center bg-cream rounded-lg px-3 py-1.5">{img}</span>
      ) : (
        img
      )}
    </a>
  );
}
