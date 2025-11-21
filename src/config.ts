export const SITE = {
  title: "Beta Permanente",
  description: "Blog personal sobre desarrollo de software, tecnología y aprendizaje continuo",
  author: "Antonio Masiá",
  url: "https://betapermanente.dev",
  lang: "es",
  image: "/og-image.jpg",
} as const;

export const NAVIGATION = [
  // { name: "Inicio", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Proyectos", href: "/proyectos" },
  { name: "Archivo", href: "/archivo" },
  { name: "Acerca de", href: "/acerca-de" },
] as const;

export const SOCIAL = {
  twitter: "https://twitter.com/ajmasia",
  github: "https://github.com/ajmasia",
  linkedin: "https://linkedin.com/in/ajmasia",
} as const;

export type SiteConfig = typeof SITE;
export type NavItem = (typeof NAVIGATION)[number];
export type SocialLinks = typeof SOCIAL;
