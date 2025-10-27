export const SITE = {
  title: "Beta Permanente",
  description: "",
  author: "Antonio Masiá",
  url: "https://betapermanente.dev",
  lang: "es",
} as const;

export const NAVIGATION = [
  // { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Archivo", href: "/archivo" },
  { name: "Acerca de", href: "/acerca-de" },
] as const;

export const SOCIAL = {
  twitter: "https://twitter.com/juanperez",
  github: "https://github.com/juanperez",
  linkedin: "https://linkedin.com/in/juanperez",
} as const;

export type SiteConfig = typeof SITE;
export type NavItem = (typeof NAVIGATION)[number];
export type SocialLinks = typeof SOCIAL;
