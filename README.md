# Beta Permanente

> Personal blog about software development, technology, and continuous learning.

[![GitHub Release](https://img.shields.io/github/v/release/ajmasia/betapermanente?label=version)](https://github.com/ajmasia/betapermanente/releases)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Live Site:** [permanentbeta.dev](https://permanentbeta.dev)

## Features

- Static site generation with Astro 5
- Content Collections with Zod validation
- Tailwind CSS v4 with dark mode
- Global fuzzy search (Fuse.js)
- Comments with Giscus (GitHub Discussions)
- RSS feed and sitemap
- SEO optimized (Open Graph, Twitter Cards)
- Tag system with index page
- Reading time calculation
- View Transitions

## Tech Stack

- **Astro 5** - Static Site Generator
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Fuse.js** - Fuzzy search

## Quick Start

```bash
# Requirements: Node.js 22.x, npm 10.x+

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (SearchModal, etc.)
├── content/blog/     # Markdown blog posts
├── layouts/          # Page layouts
├── lib/              # Utilities
├── pages/            # Route pages
├── styles/           # Global styles
└── config.ts         # Site configuration

public/
├── fonts/            # Self-hosted fonts
└── images/           # Static images
```

## Documentation

| Document | Description |
|----------|-------------|
| [PUBLISHING.md](./PUBLISHING.md) | Step-by-step checklist for publishing blog posts |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Setup, code style, and contribution guidelines |
| [RELEASING.md](./RELEASING.md) | Git workflow, versioning, and release process |

## License

[GNU GPL v3.0](./LICENSE)

## Author

**Antonio Masiá** - [permanentbeta.dev](https://permanentbeta.dev)
