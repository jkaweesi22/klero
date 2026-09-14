// ---------------------------------------------------------------------------
// "This Weekend at Klero" — update this each week, or set `active: false`
// to gracefully hide the drop details and show a fallback message inviting
// a custom order instead. Nothing else in the codebase needs to change.
// ---------------------------------------------------------------------------

export const weekendDrop = {
  active: true,
  featuredDish: "Braised short rib tray (serves 4–6)",
  featuredBake: "Spiced honey layer cake",
  cutoff: "Thursday, 6:00 PM",
  pickupWindow: "Saturday, 11:00 AM – 2:00 PM",
} as const;
