import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "outline-light";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-body font-medium text-sm tracking-wide rounded-full px-7 py-3.5 transition-all duration-300 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-terracotta text-cream hover:shadow-lg hover:shadow-cocoa/20 active:scale-[0.98]",
  ghost: "bg-transparent border border-cocoa text-cocoa hover:text-cream active:scale-[0.98]",
  outline: "bg-transparent border border-cocoa/30 text-cocoa hover:text-cream active:scale-[0.98]",
  "outline-light": "bg-transparent border border-cream/40 text-cream hover:text-cocoa active:scale-[0.98]",
};

// The fill-from-below hover treatment, shared by every non-primary variant.
const fillLayer: Record<Variant, string> = {
  primary: "",
  ghost: "bg-cocoa",
  outline: "bg-cocoa",
  "outline-light": "bg-cream",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Shows the small sliding arrow used on primary CTAs. */
  withArrow?: boolean;
};

type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonProps = ButtonAsAnchor | ButtonAsButton;

/**
 * Shared button system. Renders a plain <a> when `href` is supplied
 * (in-page anchors, tel:, mailto:, wa.me links all use this), otherwise a
 * <button>. No client-side router is used — Klero is a single, anchor-
 * navigated page (see README.md).
 */
const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", children, className = "", withArrow = false, ...rest },
  ref
) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const fill = fillLayer[variant];

  const content = (
    <>
      {fill && <span className={`absolute inset-0 z-0 translate-y-full ${fill} transition-transform duration-300 ease-out group-hover:translate-y-0`} aria-hidden="true" />}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <svg
          className="relative z-10 w-[18px] h-[9px] transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 20 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 5H19M19 5L14.5 0.5M19 5L14.5 9.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a ref={ref as never} href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref as never} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
});

export default Button;
