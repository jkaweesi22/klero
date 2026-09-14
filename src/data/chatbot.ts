// ---------------------------------------------------------------------------
// Super Duper — Klero's chat widget content.
//
// This is a scripted, keyword-matched assistant, not a live AI/LLM. Klero is
// a static site with no backend, and wiring up a real model (OpenAI,
// Anthropic, etc.) needs a server or serverless function to keep the API key
// off the client, plus an ongoing per-message cost — a separate, bigger
// piece of work. This gets visitors real, accurate answers about Klero
// today without either of those. If real AI is wanted later, everything
// here — topics, keywords, responses — is what a backend prompt would be
// built from anyway.
//
// To add a topic: add an entry to `topics` below. `keywords` are matched
// case-insensitively as substrings of whatever the visitor types.
// ---------------------------------------------------------------------------
import { site, whatsappHref } from "./site";

export const CHAT_NAME = "Super Duper";

export const GREETING =
  "Hi! I'm Super Duper 👋🏾 I can help you explore Klero, ask me about orders, or learn more about our story.";

export type ChatAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ChatTopic = {
  id: string;
  keywords: string[];
  /** Shown as a tappable suggestion chip before the visitor has typed anything. */
  quickReply: string;
  response: string;
  action?: ChatAction;
};

export const topics: ChatTopic[] = [
  {
    id: "offerings",
    keywords: ["offer", "menu", "food", "dish", "bake", "cake", "eat", "sell", "have"],
    quickReply: "What does Klero offer?",
    response:
      "Klero brings together cooking and baking — family trays and savory dishes, signature bakes like our raisin cake, and rotating weekend specials. Offerings shift with what's being prepared, so exact dishes and pricing are confirmed when you reach out.",
    action: { label: "See Offerings", href: "#offerings" },
  },
  {
    id: "ordering",
    keywords: ["order", "how do i", "book", "buy", "purchase", "price", "cost", "pay", "checkout"],
    quickReply: "How does ordering work?",
    response:
      "Ordering with Klero starts as a request, not an instant checkout — you send your details through the form or WhatsApp, and Klero confirms availability, pricing, and pickup or delivery directly with you before anything is final.",
    action: { label: "Request an Order", href: "#order" },
  },
  {
    id: "story",
    keywords: ["story", "about", "who", "history", "mother", "family", "inheritance", "klero mean", "meaning"],
    quickReply: "Tell me Klero's story",
    response:
      "Klero began at a kitchen counter — recipes and hospitality from a mother who showed love through cooking and baking, carried forward for a new generation. The name itself comes from the Greek word for inheritance.",
    action: { label: "Read Our Story", href: "#story" },
  },
  {
    id: "catering",
    keywords: ["cater", "party", "event", "celebration", "birthday", "shower", "graduation", "wedding"],
    quickReply: "Catering & celebrations",
    response:
      "Klero caters small, meaningful gatherings — birthdays, baby showers, graduations, community events, and family celebrations. Klero isn't currently set up for large corporate events.",
    action: { label: "Request Catering", href: "#catering" },
  },
  {
    id: "weekend",
    keywords: ["weekend", "drop", "this week", "available now", "special", "today"],
    quickReply: "This weekend's drop",
    response:
      "Some weeks Klero runs a limited weekend drop — a featured dish and bake, available until capacity is reached. Check the current one below.",
    action: { label: "This Weekend at Klero", href: "#weekend" },
  },
  {
    id: "gallery",
    keywords: ["photo", "picture", "gallery", "image", "look like"],
    quickReply: "See some photos",
    response: "There's a gallery of cooking, baking, and table moments a little further down the page.",
    action: { label: "View Gallery", href: "#gallery" },
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "whatsapp", "email", "call", "reach", "instagram", "location", "where"],
    quickReply: "Contact Klero",
    response: `The fastest way to reach Klero directly is by phone or WhatsApp at ${site.phone}, or by email at ${site.email}.`,
    action: { label: "Call / WhatsApp Klero", href: whatsappHref, external: true },
  },
];

export const fallback: ChatTopic = {
  id: "fallback",
  keywords: [],
  quickReply: "",
  response:
    "I don't have an answer for that just yet — try asking about offerings, ordering, catering, or Klero's story. For anything else, messaging Klero directly is fastest.",
  action: { label: "Call / WhatsApp Klero", href: whatsappHref, external: true },
};

export function matchTopic(input: string): ChatTopic {
  const lower = input.toLowerCase();
  return topics.find((t) => t.keywords.some((k) => lower.includes(k))) ?? fallback;
}
