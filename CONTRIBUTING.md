# Contributing Guide

Guidelines for contributing to the technical development of permanentbeta.dev.

> **Related docs**:
> - [PUBLISHING.md](./PUBLISHING.md) - Publishing blog content
> - [RELEASING.md](./RELEASING.md) - Git workflow, versioning, releases

## Table of Contents

- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 22.x
- npm 10.x+
- Git

### Setup

```bash
# Clone repository
git clone git@github.com:ajmasia/betapermanente.git
cd betapermanente

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Development Guidelines

### Project Structure

```
src/
├── components/       # Reusable Astro components
├── content/          # Blog posts (Markdown)
├── layouts/          # Page layouts
├── lib/              # Utility functions
├── pages/            # Route pages
├── styles/           # Global styles
└── config.ts         # Site configuration

public/
├── fonts/            # Self-hosted fonts
└── images/           # Static images
```

### Adding New Features

1. **Discuss first**: Open an issue for significant changes
2. **Keep scope small**: One feature per PR
3. **Update docs**: If adding user-facing features
4. **Test thoroughly**: Check desktop and mobile

### Component Guidelines

- Use Astro components (`.astro`) when possible
- Keep components focused and reusable
- Use TypeScript for props validation
- Follow existing naming patterns

### Styling

- Use **Tailwind CSS v4** utilities
- Custom styles in `src/styles/global.css`
- Dark mode: use `dark:` prefix
- Brand colors: `red-400` (#f87171), slate palette

---

## Code Style

### General

- **Language**: TypeScript preferred
- **Formatting**: Prettier (auto-formatted on save)
- **Linting**: ESLint with Astro plugin
- **Comments**: English only

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SearchModal.astro` |
| Pages | kebab-case | `blog/tags.astro` |
| Utilities | camelCase | `readingTime.ts` |
| Content | kebab-case | `my-post.md` |

### Imports Order

```typescript
// 1. External packages
import { getCollection } from "astro:content";

// 2. Internal aliases
import { SITE } from "../config.ts";

// 3. Components
import MainLayout from "../layouts/MainLayout.astro";

// 4. Utilities
import { formatDate } from "../lib/utils.ts";

// 5. Types
import type { CollectionEntry } from "astro:content";
```

---

## Pull Request Process

### For External Contributors

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** locally with `npm run build`
6. **Push** to your fork
7. **Open** a Pull Request

### PR Checklist

- [ ] Code follows project style
- [ ] Self-reviewed
- [ ] Tested locally
- [ ] Build passes (`npm run build`)

### Review Criteria

- Code follows project conventions
- No build errors
- No console errors/warnings
- Responsive design maintained
- Accessible (keyboard navigation, ARIA)

---

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones

---

## License

This project is licensed under [GNU GPL v3.0](./LICENSE).
