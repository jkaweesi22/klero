import Reveal from "./Reveal";

export default function Meaning() {
  return (
    <section id="meaning" className="section-pad bg-cream-deep">
      <div className="content-wrap max-w-[760px] mx-auto text-center">
        <Reveal className="w-[200px] h-[50px] mx-auto mb-7 text-olive opacity-60">
          <svg viewBox="0 0 240 60" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,30 C 60,5 90,55 140,30 C 175,13 205,45 240,20"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow text-terracotta mb-5">The Meaning of Klero</p>
          <h2 className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)] text-cocoa mb-5">
            Κλήρο — that which is received, and carried forward.
          </h2>
          <p className="text-brown text-[1.08rem] leading-relaxed">
            The name Klero draws from the Greek idea of <em className="text-terracotta">inheritance</em> — not
            only what is left to us, but what we choose to keep alive. A recipe, a gesture of
            welcome, a way of gathering people around food. Klero is our word for the things worth
            passing on.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
