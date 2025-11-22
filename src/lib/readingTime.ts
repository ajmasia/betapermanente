/**
 * Calculate reading time for a given text
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200,
): number {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @param lang - Language for localization (default: 'es')
 * @returns Formatted string (e.g., "5 min de lectura")
 */
export function formatReadingTime(minutes: number, lang: string = "es"): string {
  if (lang === "es") {
    return `${minutes} min`;
  }
  return `${minutes} min read`;
}
