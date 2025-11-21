# Beta Permanente

> A modern, fast, and SEO-optimized personal blog built with Astro.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Live Site:** [betapermanente.dev](https://betapermanente.dev)

A Spanish-first personal blog focused on software development, technology, and continuous learning. Built with modern web technologies and best practices.

---

## ✨ Features

- 🚀 **Lightning Fast** - Static site generation with Astro 5
- 📝 **Content Collections** - Type-safe blog posts with Zod schema validation
- 🎨 **Tailwind CSS v4** - Modern styling with custom dark mode
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and JSON-LD
- 📡 **RSS Feed** - Automatic feed generation for blog posts
- 🗺️ **Sitemap** - Auto-generated sitemap for search engines
- ⚡ **View Transitions** - Smooth page transitions with Astro's ClientRouter
- 🏷️ **Tag System** - Blog post categorization and filtering
- ⏱️ **Reading Time** - Automatic calculation for each post
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🎯 **404 Page** - Custom error page with helpful navigation

---

## 🛠️ Tech Stack

### Core
- **[Astro 5.15.1](https://astro.build)** - Static Site Generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety (strict mode)
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework

### Integrations & Plugins
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed generation
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Sitemap generation
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typographic defaults
- **[astro-navbar](https://www.npmjs.com/package/astro-navbar)** - Responsive navigation component

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting with Astro plugin
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Commitlint](https://commitlint.js.org/)** - Conventional Commits enforcement

---

## 📋 Requirements

- **Node.js:** `24.11.1`
- **npm:** `11.6.2`

> **Note:** Version requirements are enforced via `package.json` engines field.

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/ajmasia/permanentbeta.dev.git

# Navigate to the project directory
cd permanentbeta.dev

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro [command]
npm run astro -- --help
```

---

## 📂 Project Structure

```text
permanentbeta.dev/
├── public/               # Static assets
│   ├── favicon.svg       # Site favicon
│   ├── images/           # Images (avatars, blog, OG)
│   └── robots.txt        # Robots configuration
├── src/
│   ├── components/       # Reusable Astro components
│   │   ├── icons/        # SVG icon components
│   │   ├── Author.astro
│   │   ├── Hero.astro
│   │   ├── LatestPosts.astro
│   │   ├── Prose.astro
│   │   ├── Tag.astro
│   │   └── ThemeToggle.astro
│   ├── content/          # Content Collections
│   │   └── blog/         # Markdown blog posts
│   ├── layouts/          # Layout components
│   │   └── MainLayout/   # Main site layout
│   │       ├── components/
│   │       │   ├── Header/
│   │       │   ├── Footer/
│   │       │   └── BackToTop.astro
│   │       └── MainLayout.astro
│   ├── lib/              # Utility functions
│   │   ├── navigation.ts
│   │   └── readingTime.ts
│   ├── pages/            # File-based routing
│   │   ├── blog/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── rss.xml.ts
│   │   ├── 404.astro
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css    # Global styles + Tailwind config
│   ├── config.ts         # Site configuration
│   └── content.config.ts # Content Collections schema
├── .husky/               # Git hooks
├── CLAUDE.md             # AI assistant instructions
├── notes.md              # Development notes
├── package.json
└── tsconfig.json
```

---

## ⚙️ Configuration

### Site Configuration

Edit `src/config.ts` to customize site metadata, navigation, social links, and authors:

```typescript
export const SITE = {
  title: "Beta Permanente",
  description: "Blog personal sobre desarrollo de software...",
  author: "Antonio Masiá",
  url: "https://betapermanente.dev",
  lang: "es",
  image: "/images/og/og-default.svg",
}

export const NAVIGATION = [
  { name: "Blog", href: "/blog", enabled: true },
  // Add more navigation items...
]
```

### Content Collections Schema

Blog posts are validated with Zod schema in `src/content.config.ts`:

```typescript
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().default("ajmasia"),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(["en", "es"]).default("es"),
    draft: z.boolean().default(true),
    heroImage: z.string().optional(),
  }),
})
```

### Tailwind CSS v4

Tailwind is configured via Vite plugin in `astro.config.mjs`:

```javascript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
})
```

Theme configuration in `src/styles/global.css` using `@theme` directive.

---

## 📝 Creating Content

### Adding a Blog Post

1. Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "My Awesome Post"
description: "A brief description of the post"
author: "ajmasia"
date: 2025-11-21
tags: ["astro", "webdev"]
lang: "es"
draft: false
heroImage: "/images/blog/my-post.jpg"
---

Your content here...
```

2. Set `draft: false` to publish
3. Build the site to generate the post

### Draft System

- Posts have `draft: true` by default
- Draft posts are excluded from production builds
- Only posts with `draft: false` and `lang: "es"` are published

---

## 🔀 Git Workflow

This project follows **Git Flow** with semantic commits:

### Branching Strategy

```
main              → Production-ready code
develop           → Integration branch
release/vX.X.X    → Release preparation
feature/[name]    → Feature branches
```

### Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint:

```bash
feat: add new feature
fix: correct bug
docs: update documentation
style: format code
refactor: restructure code
perf: improve performance
test: add tests
chore: update dependencies
```

**Example:**
```bash
git commit -m "feat: add RSS feed discovery link"
```

### Git Hooks

- **commit-msg**: Validates commit message format
- **pre-commit**: Runs linting (future)

---

## 🚢 Deployment

### Build

```bash
npm run build
```

Output is generated in `./dist/` directory.

### Deployment Platforms

This static site can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

Set the build command to `npm run build` and publish directory to `dist/`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the commit convention
4. Submit a pull request

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0**.

See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Antonio Masiá**

- Website: [betapermanente.dev](https://betapermanente.dev)
- Twitter: [@ajmasia](https://twitter.com/ajmasia)
- GitHub: [@ajmasia](https://github.com/ajmasia)
- LinkedIn: [ajmasia](https://linkedin.com/in/ajmasia)

---

## 🙏 Acknowledgments

- [Astro](https://astro.build) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Inter Font](https://rsms.me/inter/) - Beautiful typeface

---

**Built with ❤️ using [Astro](https://astro.build)**
