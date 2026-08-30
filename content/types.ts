export type Job = {
  company: string;
  role: string;
  note?: string;
  years: string;
  location: string;
  /** Public page for the product, so a reader can see what it actually is. */
  url?: string;
  urlLabel?: string;
  urlNote?: string;
  bullets?: string[];
  groups?: { label: string; bullets: string[] }[];
  shift?: [string, string];
  chips?: string[];
};

export type Project = {
  name: string;
  href?: string;
  kind: string;
  links: { label: string; href: string }[];
  body: string[];
  chips: string[];
  /** A live, embeddable URL. Only set where the site allows framing. */
  embed?: string;
  embedCaption?: string;
};

export type SpecRow = { label: string; value: string };
