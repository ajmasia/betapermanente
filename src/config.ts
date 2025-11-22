export const SITE = {
  title: "Beta Permanente",
  description: "Blog personal sobre desarrollo de software, tecnología y aprendizaje continuo",
  author: "Antonio Masiá",
  url: "https://betapermanente.dev",
  lang: "es",
  image: "/images/og/og-default.svg",
} as const;

export const NAVIGATION = [
  // { name: "Inicio", href: "/", enabled: true },
  { name: "Blog", href: "/blog", enabled: true },
  { name: "Proyectos", href: "/proyectos", enabled: false },
  { name: "Archivo", href: "/archivo", enabled: false },
  { name: "Acerca de", href: "/acerca-de", enabled: false },
  { name: "Stats", href: "https://betapermanente.goatcounter.com", enabled: true, external: true },
] as const;

export const SOCIAL = {
  twitter: "https://twitter.com/ajmasia",
  github: "https://github.com/ajmasia",
  linkedin: "https://linkedin.com/in/ajmasia",
} as const;

export const AUTHORS = {
  ajmasia: {
    id: "ajmasia",
    name: "Antonio Masiá",
    bio: "Full Stack Web Developer & Generative AI Enthusiast",
    avatar: "/images/avatars/ajmasia.jpg",
    social: {
      twitter: "https://twitter.com/ajmasia",
      github: "https://github.com/ajmasia",
      linkedin: "https://linkedin.com/in/ajmasia",
    },
  },
} as const;

export type SiteConfig = typeof SITE;
export type NavItem = (typeof NAVIGATION)[number] & { external?: boolean };
export type SocialLinks = typeof SOCIAL;
export type AuthorId = keyof typeof AUTHORS;
export type Author = (typeof AUTHORS)[AuthorId];
