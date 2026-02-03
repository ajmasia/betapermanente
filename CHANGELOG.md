# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.8] - 2025-02-03

### Fixed

- **View Transitions flash in Chromium browsers**: Disabled view transition animation completely to prevent white flash in dark mode on Chrome/Brave. Firefox was not affected.
  - Root transition now uses `animation: none` for both old and new views
  - Theme is applied both before swap (`astro:before-swap`) and after swap (`astro:after-swap`) for reliability

### Changed

- **Card hover effects**: Simplified card interactions
  - Removed transform and shadow effects on hover
  - Title changes to accent color (`red-400`) on hover for clear interactivity feedback
  - Adjusted transition duration to 200ms

### Refactored

- **ThemeToggle**: Removed redundant theme initialization since MainLayout inline script handles it
- **BackToTop**: Removed duplicate `astro:after-swap` listener

## [1.3.7] - 2025-02-03

### Fixed

- **View Transitions flash in production**: Added `class="dark"` as default in HTML to ensure dark mode is set before View Transitions captures the snapshot, fixing random flash during navigation

## [1.3.6] - 2025-02-03

### Fixed

- **View Transitions flash in dark mode**: Fixed white flash when navigating between pages in dark mode. The issue was caused by View Transitions taking a snapshot before the theme was applied.
  - Added inline script using `astro:before-swap` event to apply theme to `newDocument` before the transition snapshot is captured
  - Modified View Transition animation to keep old view opaque (z-index 1) while new view fades in on top (z-index 2), preventing background bleed-through during crossfade
  - Added background color to `html` element (not just `body`) to ensure consistent background during transitions

- **Font fallback during navigation**: Fixed Inter font occasionally falling back to system font when navigating between pages.
  - Changed `font-display: optional` to `font-display: swap` for better compatibility with View Transitions

### Changed

- **README.md**: Fixed incorrect site URL (was `permanentbeta.dev`, now `betapermanente.link`)
