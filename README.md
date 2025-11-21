# Beta Permanente

> A modern, fast, and SEO-optimized personal blog built with Astro.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**Live Site:** [betapermanente.dev](https://betapermanente.dev)

A Spanish-first personal blog focused on software development, technology, and continuous learning. Built with modern web technologies and best practices.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Requirements](#-requirements)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [⚙️ Configuration](#️-configuration)
- [📝 Creating Content](#-creating-content)
- [🔀 Git Workflow](#-git-workflow)
  - [Branching Strategy](#branching-strategy)
  - [Workflow Examples](#workflow-examples)
  - [Commit Convention](#commit-convention)
- [🏷️ Versioning Strategy](#️-versioning-strategy)
  - [Version Increment Rules](#version-increment-rules)
  - [Practical Versioning Scenarios](#practical-versioning-scenarios)
  - [Quick Reference Table](#quick-reference-table)
  - [Versioning Best Practices](#versioning-best-practices)
- [🚢 Deployment](#-deployment)
  - [Vercel (Automated)](#vercel-automated---current-setup)
  - [Alternative Platforms](#alternative-platforms)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)

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

This project uses a **simplified GitHub Flow** optimized for solo development and frequent content publishing.

### Branching Strategy

```
main              → Production (only permanent branch)
feature/[name]    → New features/improvements (temporary)
content/[slug]    → Complex blog posts (temporary, optional)
hotfix/[issue]    → Urgent production fixes (temporary)
```

**Key principles:**
- `main` is the **only permanent branch**
- All work merges directly to `main`
- Tags mark releases on `main`
- Quick posts can be committed directly to `main`

---

### Workflow Examples

#### **Publishing a Blog Post (Simple)**

For quick posts or updates:

```bash
# 1. Work on main
git checkout main

# 2. Create/edit post in src/content/blog/
# Set draft: false when ready

# 3. Commit and push
git add src/content/blog/my-new-post.md
git commit -m "content: add Docker basics guide"
git push origin main

# 4. Optional: Tag the release
git tag v1.0.1 -m "content: Docker basics guide"
git push origin main --tags
```

#### **Publishing a Complex Post (With Branch)**

For posts requiring multiple days or review:

```bash
# 1. Create content branch
git checkout main
git checkout -b content/kubernetes-deep-dive

# 2. Work on the post over multiple sessions
git commit -m "content: draft Kubernetes guide"
git commit -m "content: add examples to K8s guide"
git commit -m "content: finalize Kubernetes guide"

# 3. Merge to main
git checkout main
git merge content/kubernetes-deep-dive
git push origin main

# 4. Clean up
git branch -d content/kubernetes-deep-dive

# 5. Optional: Tag release
git tag v1.0.2 -m "content: Kubernetes deep dive"
git push origin --tags
```

#### **Developing a New Feature**

For new functionality (search, lazy loading, etc.):

```bash
# 1. Create feature branch
git checkout main
git checkout -b feature/lazy-loading

# 2. Develop the feature
git commit -m "feat: add lazy loading to images"
git commit -m "feat: optimize image loading performance"

# 3. Merge to main
git checkout main
git merge feature/lazy-loading
git push origin main

# 4. Tag as minor release
git tag v1.1.0 -m "feat: lazy loading images"
git push origin --tags

# 5. Clean up
git branch -d feature/lazy-loading
```

#### **Hotfix in Production**

For urgent fixes:

```bash
# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/fix-rss-encoding

# 2. Fix the issue
git commit -m "fix: correct RSS feed character encoding"

# 3. Merge back to main
git checkout main
git merge hotfix/fix-rss-encoding
git push origin main

# 4. Tag as patch release
git tag v1.0.3 -m "fix: RSS encoding issue"
git push origin --tags

# 5. Clean up
git branch -d hotfix/fix-rss-encoding
```

---

### Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint:

| Type | Description | Version Impact |
|------|-------------|----------------|
| `feat:` | New feature | MINOR (v1.X.0) |
| `fix:` | Bug fix | PATCH (v1.0.X) |
| `content:` | Blog post | PATCH (v1.0.X) |
| `docs:` | Documentation only | - |
| `style:` | Code formatting | - |
| `refactor:` | Code restructuring | - |
| `perf:` | Performance improvement | MINOR/PATCH |
| `test:` | Add/update tests | - |
| `chore:` | Maintenance tasks | - |

**Examples:**
```bash
git commit -m "feat: add full-text search"
git commit -m "fix: correct blog post sorting"
git commit -m "content: add introduction to Docker"
git commit -m "docs: update README with git workflow"
git commit -m "chore: update dependencies"
```

**Commit message format:**
```
<type>: <subject>

[optional body]

[optional footer]
```

---

### Git Hooks

- **commit-msg**: Validates commit message format (active)
- **pre-commit**: Runs linting (future implementation)

---

## 🏷️ Versioning Strategy

This project follows **Semantic Versioning (SemVer)** adapted for a content-driven blog:

```
vMAJOR.MINOR.PATCH

v1.2.3
│ │ │
│ │ └─── PATCH: Posts, bug fixes, minor tweaks
│ └───── MINOR: New features, significant improvements
└─────── MAJOR: Breaking changes, complete redesigns
```

### Version Increment Rules

#### **PATCH (v1.0.X)** - Increment third number

**When to use:**
- ✅ Publishing a new blog post
- ✅ Fixing bugs
- ✅ Correcting typos
- ✅ Minor CSS adjustments
- ✅ Dependency updates (no breaking changes)

**Examples:**
```bash
v1.0.0 → v1.0.1  # New post: "Docker Basics"
v1.0.1 → v1.0.2  # Fix: RSS feed encoding
v1.0.2 → v1.0.3  # New post: "Git Advanced"
v1.0.3 → v1.0.4  # Fix: Typo in post slug
```

**Commands:**
```bash
git tag v1.0.1 -m "content: Docker basics post"
git push origin --tags
```

---

#### **MINOR (v1.X.0)** - Increment second number, reset PATCH

**When to use:**
- ✅ New feature implementation
- ✅ New site section
- ✅ Significant UX improvements
- ✅ New integrations (search, comments, etc.)

**Examples:**
```bash
v1.0.4 → v1.1.0  # Feature: Lazy loading images
v1.1.0 → v1.2.0  # Feature: Full-text search
v1.2.0 → v1.3.0  # Feature: Comment system
v1.3.0 → v1.4.0  # Feature: Newsletter signup
```

**Commands:**
```bash
git tag v1.1.0 -m "feat: lazy loading images"
git push origin --tags
```

---

#### **MAJOR (vX.0.0)** - Increment first number, reset all

**When to use:**
- ✅ Complete site redesign
- ✅ Framework migration (e.g., Astro → Next.js)
- ✅ Breaking URL structure changes
- ✅ Major rebranding

**Examples:**
```bash
v1.4.0 → v2.0.0  # Complete site redesign
v2.0.0 → v3.0.0  # Migration to different framework
v3.0.0 → v4.0.0  # Major rebranding/domain change
```

**Commands:**
```bash
git tag v2.0.0 -m "feat: complete site redesign"
git push origin --tags
```

---

### Practical Versioning Scenarios

#### **Scenario 1: Multiple posts in one week**

**Option A - Tag each post** (recommended for active blogs):
```bash
# Monday
git commit -m "content: add Docker basics"
git tag v1.0.1 && git push origin main --tags

# Wednesday
git commit -m "content: add Kubernetes intro"
git tag v1.0.2 && git push origin main --tags

# Friday
git commit -m "content: add CI/CD guide"
git tag v1.0.3 && git push origin main --tags
```

**Option B - Batch tag at week end**:
```bash
# Mon, Wed, Fri - just commit and push
git commit -m "content: add [post]" && git push

# Friday end of day
git tag v1.0.1 -m "content: 3 new posts this week"
git push origin --tags
```

---

#### **Scenario 2: Feature development + posts in parallel**

```bash
# Week 1-2: Develop feature in branch
git checkout -b feature/search
git commit -m "feat: implement search"
# DON'T MERGE YET

# Meanwhile: Publish posts on main
git checkout main
git commit -m "content: add new post"
git tag v1.0.5 && git push origin main --tags

# Week 3: Feature ready
git checkout main
git merge feature/search
git tag v1.1.0 -m "feat: full-text search"
git push origin main --tags
```

---

#### **Scenario 3: Post + minor feature**

```bash
# Current version: v1.0.10

# Add small feature (e.g., copy button in code blocks)
git commit -m "feat: add copy button to code blocks"
git tag v1.1.0  # MINOR bump (new feature)

# Next post
git commit -m "content: add Docker compose guide"
git tag v1.1.1  # Continue from v1.1.0
git push origin main --tags
```

---

### Quick Reference Table

| Change Type | Version Change | Command |
|-------------|----------------|---------|
| New blog post | v1.0.0 → v1.0.1 | `git tag v1.0.1` |
| Bug fix | v1.0.1 → v1.0.2 | `git tag v1.0.2` |
| New feature | v1.0.2 → v1.1.0 | `git tag v1.1.0` |
| Another post | v1.1.0 → v1.1.1 | `git tag v1.1.1` |
| Site redesign | v1.5.0 → v2.0.0 | `git tag v2.0.0` |

---

### Versioning Best Practices

1. **Tag on main only** - Always create version tags after merging to main
2. **Descriptive tag messages** - Use `git tag -a` with meaningful messages
3. **Consistency** - Follow the rules consistently for predictability
4. **When in doubt** - Ask: "Will users notice this as something new?"
   - Yes → MINOR (v1.X.0)
   - No → PATCH (v1.0.X)
5. **Don't overthink** - For a personal blog, rough consistency is fine

---

## 🚢 Deployment

This project is configured for **automatic deployment on Vercel** using the official Astro adapter.

### Vercel (Automated - Current Setup)

The project uses `@astrojs/vercel` adapter configured in `astro.config.mjs`:

```javascript
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  // ...
});
```

#### **Automatic Deployment Workflow**

1. **Push to `main` branch**:
   ```bash
   git push origin main
   ```

2. **Vercel detects the push** and automatically:
   - Installs dependencies (`npm install`)
   - Builds the project (`npm run build`)
   - Deploys to production

3. **Live in seconds** - Your changes are deployed automatically to `betapermanente.dev`

#### **Setup (One-Time)**

If deploying to Vercel for the first time:

1. **Import repository** to Vercel dashboard
2. **Configure project**:
   - Framework Preset: **Astro**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.vercel/output` (adapter handles this)
   - Node Version: `24.x`

3. **Environment Variables** (if needed):
   ```
   SITE_URL=https://betapermanente.dev
   ```

4. **Connect Git repository** - Vercel will deploy automatically on every push to `main`

#### **Preview Deployments**

Vercel automatically creates preview deployments for:
- Pull requests (each PR gets a unique URL)
- Feature branches (optional, can be configured)

Access preview URLs in Vercel dashboard or PR comments.

---

### Manual Build

To build locally for testing:

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

Output is generated in `.vercel/output/` directory (handled by adapter).

---

### Alternative Platforms

While optimized for Vercel, the project can be deployed to other platforms:

#### **Netlify**
```bash
# Install Netlify adapter
npm install @astrojs/netlify

# Update astro.config.mjs
import netlify from '@astrojs/netlify';
export default defineConfig({
  adapter: netlify(),
});
```

#### **GitHub Pages**
```bash
# Use static adapter
npm install @astrojs/static

# Update astro.config.mjs for static output
export default defineConfig({
  output: 'static',
});
```

#### **Cloudflare Pages**
```bash
# Install Cloudflare adapter
npm install @astrojs/cloudflare

# Update astro.config.mjs
import cloudflare from '@astrojs/cloudflare';
export default defineConfig({
  adapter: cloudflare(),
});
```

**Note:** Changing adapters may require adjustments to build configuration.

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
