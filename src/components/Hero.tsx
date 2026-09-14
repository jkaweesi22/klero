import { motion, useReducedMotion, type Variants } from "framer-motion";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import { site, whatsappHref } from "../data/site";
import heroImage from "../assets/images/hero.jpg";
import kleroLogo from "../assets/logos/klero-logo.png";

const easeOut = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden pt-16 pb-20 scroll-mt-20">
      {/* Background image + veil */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <motion.img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.9, scale: 1.04 }}
          transition={{ duration: reduceMotion ? 0 : 2.2, ease: easeOut }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/35 via-cream/65 to-cream" />
      </div>

      {/* Generational line motif */}
      <div className="absolute inset-x-0 bottom-[14%] h-[200px] z-[1] text-terracotta opacity-35 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d="M-100,150 C 300,50 700,220 1100,80 C 1300,20 1500,120 1600,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduceMotion ? 0 : 2.6, ease: "easeOut", delay: reduceMotion ? 0 : 0.4 }}
          />
        </svg>
      </div>

      <motion.div
        className="content-wrap relative z-[2] flex flex-col items-start text-left max-w-[760px]"
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "show"}
      >
        <motion.p variants={reduceMotion ? undefined : item} className="eyebrow text-terracotta mb-2">
          A family food story
        </motion.p>

        <motion.h1 variants={reduceMotion ? undefined : item} className="mb-5">
          <img src={kleroLogo} alt="Klero" className="h-16 sm:h-20 md:h-28 w-auto" />
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : item}
          className="font-display italic text-[clamp(1.2rem,1rem+0.9vw,1.6rem)] text-brown mb-5"
        >
          Where nourishment becomes inheritance.
        </motion.p>

        <motion.p variants={reduceMotion ? undefined : item} className="text-[1.08rem] text-brown max-w-[52ch] mb-10 leading-relaxed">
          Klero brings together cooking, baking, family, and tradition — recipes carried from one
          generation and offered to the next, made with the same care they always were.
        </motion.p>

        <motion.div variants={reduceMotion ? undefined : item} className="flex flex-wrap gap-4 mb-7">
          <Button href="#order" variant="primary" withArrow>
            Request an Order
          </Button>
          <Button href="#story" variant="ghost">
            Our Story
          </Button>
        </motion.div>

        <motion.a
          variants={reduceMotion ? undefined : item}
          href={whatsappHref}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 text-[0.92rem] text-brown pb-0.5 border-b border-transparent hover:border-terracotta hover:text-terracotta transition-colors"
        >
          <WhatsAppIcon size={18} />
          <span>
            Or reach us directly — <strong className="font-semibold text-cocoa">{site.phone}</strong>
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
