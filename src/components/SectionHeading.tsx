type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Consistent eyebrow / heading / supporting copy block used across sections.
 * tone="light" is for use on dark (cocoa) backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const headingColor = tone === "light" ? "text-cream" : "text-cocoa";
  const descColor = tone === "light" ? "text-cream/75" : "text-brown";

  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} gap-3.5 ${className}`}>
      {eyebrow && <span className="eyebrow text-terracotta">{eyebrow}</span>}
      <Tag
        id={id}
        className={`font-display text-[clamp(2rem,1.55rem+2vw,3.1rem)] leading-[1.12] max-w-[18ch] ${headingColor}`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`font-body text-[1.1rem] leading-relaxed max-w-[56ch] ${descColor}`}>{description}</p>
      )}
    </div>
  );
}
