interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavigationData {
  es: NavItem[];
  en?: NavItem[];
}

export const navigationData: NavigationData = {
  es: [
    { label: 'Blog', href: '/blog' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Sobre mí', href: '/sobre-mi' },
  ],
}
