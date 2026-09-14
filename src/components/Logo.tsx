type LogoProps = {
  /** "lg" for the primary header placement, "md" for tighter spots like the footer. */
  size?: "lg" | "md";
  /** Renders the light (cream) wordmark for use on dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
};

const textSizes: Record<"lg" | "md", string> = {
  lg: "text-2xl md:text-[1.7rem]",
  md: "text-xl",
};

/**
 * Brand mark. This is a TEMPORARY TEXT WORDMARK — Klero does not yet have a
 * finished logo file. Structure kept deliberately simple so it can be
 * swapped for a real image later:
 *
 *   1. Add the logo file to src/assets/logos/ (e.g. klero-logo.svg)
 *   2. import kleroLogo from "../assets/logos/klero-logo.svg";
 *   3. Replace the <span> below with:
 *        <img src={kleroLogo} alt="Klero" className="h-8 md:h-9 w-auto" />
 */
export default function Logo({ size = "lg", tone = "dark", className = "" }: LogoProps) {
  const color = tone === "light" ? "text-cream" : "text-cocoa";

  return (
    <a href="#home" className={`group inline-flex items-center ${className}`} aria-label="Klero — home">
      <span
        className={`font-display font-semibold tracking-tight ${color} ${textSizes[size]} transition-transform duration-300 ease-out group-hover:scale-[1.02]`}
      >
        Klero
      </span>
    </a>
  );
}
