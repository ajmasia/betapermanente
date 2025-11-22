const GOATCOUNTER_SITE = "betapermanente";

/**
 * Get page views for a specific path from GoatCounter
 * @param path - The URL path to get views for (e.g., "/blog/my-post")
 * @returns Number of views, or 0 if unavailable
 */
export async function getPageViews(path: string): Promise<number> {
  try {
    const url = `https://${GOATCOUNTER_SITE}.goatcounter.com/counter/${encodeURIComponent(path)}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      return 0;
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error(`Error fetching GoatCounter views for ${path}:`, error);
    return 0;
  }
}

/**
 * Format page views for display
 * @param views - Number of views
 * @param lang - Language for localization (default: 'es')
 * @returns Formatted string (e.g., "150 visitas")
 */
export function formatPageViews(views: number, lang: string = "es"): string {
  if (views === 0) {
    return "";
  }

  if (lang === "es") {
    return `${views.toLocaleString("es-ES")} ${views === 1 ? "visita" : "visitas"}`;
  }

  return `${views.toLocaleString("en-US")} ${views === 1 ? "view" : "views"}`;
}
