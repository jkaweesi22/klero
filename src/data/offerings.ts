// ---------------------------------------------------------------------------
// Offerings — a living selection, not a fixed menu. Add, edit, or remove
// items freely; nothing else needs to change. Prices are intentionally left
// as placeholders until real pricing is confirmed.
// ---------------------------------------------------------------------------
import galleryCooking1 from "../assets/images/gallery-cooking-1.jpg";
import galleryCooking2 from "../assets/images/gallery-cooking-2.jpg";
import galleryBaking1 from "../assets/images/gallery-baking-1.jpg";
import galleryBaking2 from "../assets/images/gallery-baking-2.jpg";
import galleryCelebrations1 from "../assets/images/gallery-celebrations-1.jpg";
import galleryFamily1 from "../assets/images/gallery-family-1.jpg";
import galleryFamily2 from "../assets/images/gallery-family-2.jpg";
import galleryTable1 from "../assets/images/gallery-table-1.jpg";
import weekendDish from "../assets/images/weekend-dish.jpg";
import weekendBake from "../assets/images/weekend-bake.jpg";

export type OfferItem = {
  name: string;
  description: string;
  price?: string;
  image: string;
  alt: string;
};

export type OfferCategory = {
  title: string;
  description: string;
  items: OfferItem[];
};

export const offerCategories: OfferCategory[] = [
  {
    title: "Signature Meals",
    description: "Home-style dishes made for sharing.",
    items: [
      {
        name: "Family Trays",
        description: "Generous, shareable mains built for the table.",
        price: "from $—",
        image: galleryCooking1,
        alt: "A home kitchen stovetop with a wok of sautéed vegetables",
      },
      {
        name: "Savory Dishes",
        description: "Slow-cooked classics, made in small batches.",
        price: "from $—",
        image: galleryCooking2,
        alt: "A pan of stir-fried vegetables and greens on the stove",
      },
      {
        name: "Weekend Specials",
        description: "Rotating dishes, available while supplies last.",
        price: "Ask for this week's",
        image: weekendDish,
        alt: "Steaming bowls of a home-cooked meal",
      },
    ],
  },
  {
    title: "Baked Goods",
    description: "Where flour, butter, and patience meet.",
    items: [
      {
        name: "Signature Cakes",
        description: "Made to order for milestones large and small.",
        price: "from $—",
        image: galleryBaking1,
        alt: "Baking ingredients laid out: flour, eggs, butter, and a rolling pin",
      },
      {
        name: "Pastries",
        description: "Small batch, baked the morning of pickup.",
        price: "from $—",
        image: galleryBaking2,
        alt: "An overhead grid of fruit-topped tarts",
      },
      {
        name: "Celebration Bakes",
        description: "Designed around your occasion and palette.",
        price: "Ask for pricing",
        image: weekendBake,
        alt: "A hand dusting cocoa powder over a freshly baked cake",
      },
    ],
  },
  {
    title: "Celebrations",
    description: "Marking the moments worth remembering.",
    items: [
      {
        name: "Birthdays",
        description: "Cakes and spreads built around the guest of honor.",
        image: galleryCelebrations1,
        alt: "A celebration cake with a sparkler candle and fresh mandarins",
      },
      {
        name: "Baby Showers",
        description: "Soft, celebratory spreads for growing families.",
        image: galleryFamily1,
        alt: "A baby shower cake reading 'Oh Baby' on a confetti-scattered table",
      },
      {
        name: "Graduations & Anniversaries",
        description: "Milestone gatherings, thoughtfully catered.",
        image: galleryFamily2,
        alt: "A gold 'Congrats' balloon banner strung up for an outdoor celebration",
      },
    ],
  },
  {
    title: "Small Catering",
    description: "Intimate gatherings, prepared with care.",
    items: [
      {
        name: "Family Gatherings",
        description: "Home-style spreads sized for close company.",
        image: galleryTable1,
        alt: "An elegantly set dining table with candlelight",
      },
      {
        name: "Church & Community Events",
        description: "Warm, shareable food for gathered groups.",
        image: galleryCooking1,
        alt: "A home kitchen stovetop with a wok of sautéed vegetables",
      },
      {
        name: "Intimate Occasions",
        description: "Small-scale catering for meaningful moments.",
        image: galleryBaking1,
        alt: "Baking ingredients laid out: flour, eggs, butter, and a rolling pin",
      },
    ],
  },
];
