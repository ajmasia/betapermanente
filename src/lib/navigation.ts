import { SITE, NAVIGATION, type SiteConfig, type NavItem } from "../config.ts";

const navigation: readonly NavItem[] = NAVIGATION;
const { title }: SiteConfig = SITE;

export const getPageTitle = (url: string): string => {
  const defaultTitle = title;
  const pageName =
    navigation.find((nav) => nav.href === url)?.name || undefined;

  return pageName ? `${title}: ${pageName}` : defaultTitle;
};
