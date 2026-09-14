// ---------------------------------------------------------------------------
// Offerings — a living selection, not a fixed menu. Add, edit, or remove
// items freely; nothing else needs to change. Prices are intentionally left
// as placeholders until real pricing is confirmed.
// ---------------------------------------------------------------------------
import galleryCooking1 from "../assets/images/gallery-cooking-1.svg";
import galleryCooking2 from "../assets/images/gallery-cooking-2.svg";
import galleryBaking1 from "../assets/images/gallery-baking-1.svg";
import galleryBaking2 from "../assets/images/gallery-baking-2.svg";
import galleryCelebrations1 from "../assets/images/gallery-celebrations-1.svg";
import galleryFamily1 from "../assets/images/gallery-family-1.svg";
import galleryFamily2 from "../assets/images/gallery-family-2.svg";
import galleryTable1 from "../assets/images/gallery-table-1.svg";
import weekendDish from "../assets/images/weekend-dish.svg";
import weekendBake from "../assets/images/weekend-bake.svg";

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
        alt: "Family-style savory tray",
      },
      {
        name: "Savory Dishes",
        description: "Slow-cooked classics, made in small batches.",
        price: "from $—",
        image: galleryCooking2,
        alt: "Savory home-cooked dish",
      },
      {
        name: "Weekend Specials",
        description: "Rotating dishes, available while supplies last.",
        price: "Ask for this week's",
        image: weekendDish,
        alt: "Weekend special dish",
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
        alt: "Signature layered cake",
      },
      {
        name: "Pastries",
        description: "Small batch, baked the morning of pickup.",
        price: "from $—",
        image: galleryBaking2,
        alt: "Fresh pastries",
      },
      {
        name: "Celebration Bakes",
        description: "Designed around your occasion and palette.",
        price: "Ask for pricing",
        image: weekendBake,
        alt: "Celebration bake",
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
        alt: "Birthday celebration spread",
      },
      {
        name: "Baby Showers",
        description: "Soft, celebratory spreads for growing families.",
        image: galleryFamily1,
        alt: "Baby shower table setting",
      },
      {
        name: "Graduations & Anniversaries",
        description: "Milestone gatherings, thoughtfully catered.",
        image: galleryFamily2,
        alt: "Graduation and anniversary gathering",
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
        alt: "Family gathering table",
      },
      {
        name: "Church & Community Events",
        description: "Warm, shareable food for gathered groups.",
        image: galleryCooking1,
        alt: "Community event spread",
      },
      {
        name: "Intimate Occasions",
        description: "Small-scale catering for meaningful moments.",
        image: galleryBaking1,
        alt: "Intimate occasion dessert table",
      },
    ],
  },
];
