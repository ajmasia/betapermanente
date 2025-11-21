interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Navigation {
  es: NavItem[];
  en?: NavItem[];
}

