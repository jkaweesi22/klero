type InstagramIconProps = {
  size?: number;
  className?: string;
};

/** Simple inline Instagram glyph — lucide-react doesn't ship brand icons, so this mirrors WhatsAppIcon's approach. */
export default function InstagramIcon({ size = 18, className = "" }: InstagramIconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}
