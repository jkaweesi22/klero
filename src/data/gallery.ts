// ---------------------------------------------------------------------------
// Gallery — placeholder imagery. Replace the imports below with real
// photography using the same filenames to avoid touching this file, or
// point `image` at new files.
// ---------------------------------------------------------------------------
import galleryCooking1 from "../assets/images/gallery-cooking-1.jpg";
import galleryCooking2 from "../assets/images/gallery-cooking-2.jpg";
import galleryBaking1 from "../assets/images/gallery-baking-1.jpg";
import galleryCelebrations1 from "../assets/images/gallery-celebrations-1.jpg";
import galleryFamily1 from "../assets/images/gallery-family-1.jpg";
import galleryFamily2 from "../assets/images/gallery-family-2.jpg";
import galleryTable1 from "../assets/images/gallery-table-1.jpg";
import raisinCake from "../assets/images/raisin-cake.jpg";

export type GalleryCategory = "cooking" | "baking" | "celebrations" | "table" | "family";

export const galleryFilters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Cooking", value: "cooking" },
  { label: "Baking", value: "baking" },
  { label: "Celebrations", value: "celebrations" },
  { label: "Table Moments", value: "table" },
  { label: "Family-Style", value: "family" },
];

export type GalleryItem = {
  image: string;
  alt: string;
  category: GalleryCategory;
  caption: string;
  /** Controls the item's aspect ratio within the editorial grid. */
  size?: "tall" | "wide";
};

export const galleryItems: GalleryItem[] = [
  { image: galleryCooking1, alt: "A home kitchen stovetop with a wok of sautéed vegetables", category: "cooking", caption: "Cooking", size: "tall" },
  { image: galleryBaking1, alt: "Baking ingredients laid out: flour, eggs, butter, and a rolling pin", category: "baking", caption: "Baking" },
  { image: galleryTable1, alt: "An elegantly set dining table with candlelight", category: "table", caption: "Table Moments", size: "wide" },
  { image: galleryCelebrations1, alt: "A celebration cake with a sparkler candle and fresh mandarins", category: "celebrations", caption: "Celebrations" },
  { image: galleryFamily1, alt: "A baby shower cake reading 'Oh Baby' on a confetti-scattered table", category: "family", caption: "Family-Style", size: "tall" },
  { image: raisinCake, alt: "A sliced raisin loaf cake dusted with powdered sugar — Klero's signature pastry", category: "baking", caption: "Raisin Cake" },
  { image: galleryCooking2, alt: "A pan of stir-fried vegetables and greens on the stove", category: "cooking", caption: "Cooking", size: "wide" },
  { image: galleryFamily2, alt: "A gold 'Congrats' balloon banner strung up for an outdoor celebration", category: "family", caption: "Family-Style" },
];
