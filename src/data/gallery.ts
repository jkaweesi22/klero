// ---------------------------------------------------------------------------
// Gallery — placeholder imagery. Replace the imports below with real
// photography using the same filenames to avoid touching this file, or
// point `image` at new files.
// ---------------------------------------------------------------------------
import galleryCooking1 from "../assets/images/gallery-cooking-1.svg";
import galleryCooking2 from "../assets/images/gallery-cooking-2.svg";
import galleryBaking1 from "../assets/images/gallery-baking-1.svg";
import galleryBaking2 from "../assets/images/gallery-baking-2.svg";
import galleryCelebrations1 from "../assets/images/gallery-celebrations-1.svg";
import galleryFamily1 from "../assets/images/gallery-family-1.svg";
import galleryFamily2 from "../assets/images/gallery-family-2.svg";
import galleryTable1 from "../assets/images/gallery-table-1.svg";

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
  { image: galleryCooking1, alt: "Placeholder — savory dish being prepared", category: "cooking", caption: "Cooking", size: "tall" },
  { image: galleryBaking1, alt: "Placeholder — signature cake", category: "baking", caption: "Baking" },
  { image: galleryTable1, alt: "Placeholder — table set for a gathering", category: "table", caption: "Table Moments", size: "wide" },
  { image: galleryCelebrations1, alt: "Placeholder — birthday celebration spread", category: "celebrations", caption: "Celebrations" },
  { image: galleryFamily1, alt: "Placeholder — family-style meal", category: "family", caption: "Family-Style", size: "tall" },
  { image: galleryBaking2, alt: "Placeholder — fresh pastries", category: "baking", caption: "Baking" },
  { image: galleryCooking2, alt: "Placeholder — home-cooked meal", category: "cooking", caption: "Cooking", size: "wide" },
  { image: galleryFamily2, alt: "Placeholder — family gathering", category: "family", caption: "Family-Style" },
];
