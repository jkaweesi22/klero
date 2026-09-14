// ---------------------------------------------------------------------------
// Brand pillars — kept as restrained Roman-numeral typography rather than
// icons, per Klero's brand brief ("avoid icon overload").
// ---------------------------------------------------------------------------

export type Value = {
  mark: string;
  title: string;
  description: string;
};

export const values: Value[] = [
  { mark: "I.", title: "Inheritance", description: "What is meaningful deserves to be carried forward." },
  { mark: "II.", title: "Nourishment", description: "Food should care for people, not simply feed them." },
  { mark: "III.", title: "Hospitality", description: "Every order should feel personal and thoughtful." },
  { mark: "IV.", title: "Generations", description: "Klero connects what came before with what comes next." },
];
