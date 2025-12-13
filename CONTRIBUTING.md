# Contributing Guide

Guidelines for contributing to the technical development of permanentbeta.dev.

> **Note**: For publishing blog content, see [PUBLISHING.md](./PUBLISHING.md).

## Table of Contents

- [Getting Started](#getting-started)
- [Git Flow](#git-flow)
- [Branch Naming](#branch-naming)
- [Commit Convention](#commit-convention)
- [Versioning](#versioning)
- [Pull Request Process](#pull-request-process)
- [Development Guidelines](#development-guidelines)
- [Code Style](#code-style)

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
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Git Flow

This project follows **Git Flow** branching strategy.

### Branch Structure

```
main                    Production-ready code
├── develop             Integration branch (optional)
├── feature/*           New features
├── fix/*               Bug fixes
└── release/*           Release preparation
```

### Workflow Overview

```
feature/new-feature ──┐
                      ├──▶ develop ──▶ main ──▶ tag v1.x.x
fix/bug-fix ──────────┘
```

### Quick Workflow

#### For features/improvements

```bash
# 1. Start from main (or develop if using full Git Flow)
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/descriptive-name

# 3. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 4. Push and create PR (or merge directly)
git push origin feature/descriptive-name

# 5. After review, merge to main
git checkout main
git merge feature/descriptive-name
git push origin main

# 6. Cleanup
git branch -d feature/descriptive-name
```

#### For bug fixes

```bash
git checkout main
git checkout -b fix/issue-description
# ... fix the bug ...
git commit -m "fix: resolve issue description"
git checkout main
git merge fix/issue-description
git push origin main
```

---

## Branch Naming

### Format

```
<type>/<short-description>
```

### Types

| Type | Use for |
|------|---------|
| `feature/` | New features or enhancements |
| `fix/` | Bug fixes |
| `refactor/` | Code refactoring |
| `docs/` | Documentation changes |
| `chore/` | Maintenance tasks |
| `release/` | Release preparation |

### Examples

```
feature/search-modal
feature/dark-mode-toggle
fix/header-layout-shift
fix/rss-feed-encoding
refactor/component-structure
docs/update-readme
chore/update-dependencies
release/v1.2.0
```

---

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>: <description>

[optional body]
```

### Types

| Type | Description | Version Impact |
|------|-------------|----------------|
| `feat` | New feature | MINOR (1.x.0) |
| `fix` | Bug fix | PATCH (1.0.x) |
| `docs` | Documentation only | - |
| `style` | Formatting, no code change | - |
| `refactor` | Code change, no feature/fix | - |
| `perf` | Performance improvement | PATCH |
| `test` | Adding/updating tests | - |
| `chore` | Maintenance, deps, config | - |
| `revert` | Revert previous commit | - |
| `ci` | CI/CD changes | - |

### Examples

```bash
# Feature
git commit -m "feat: add global search with fuzzy matching"

# Bug fix
git commit -m "fix: resolve navigation shift on active state"

# With scope
git commit -m "feat(search): add keyboard navigation"

# Breaking change
git commit -m "feat!: redesign header layout

BREAKING CHANGE: Header structure changed, custom styles may need updates"

# Multi-line
git commit -m "feat: add tags index page

- Create /blog/tags route
- Display all tags with post counts
- Sort alphabetically"
```

### Commitlint

Commits are validated by commitlint. Invalid commits will be rejected.

```bash
# Valid
git commit -m "feat: add new component"

# Invalid (will be rejected)
git commit -m "Added new component"
git commit -m "FEAT: add new component"
```

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/).

### Version Format

```
MAJOR.MINOR.PATCH

v1.0.0
│ │ │
│ │ └── PATCH: Bug fixes, minor changes
│ └──── MINOR: New features (backwards compatible)
└────── MAJOR: Breaking changes
```

### When to Bump

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Bug fix | PATCH | 1.0.0 → 1.0.1 |
| New feature | MINOR | 1.0.1 → 1.1.0 |
| Breaking change | MAJOR | 1.1.0 → 2.0.0 |

### Release Process

```bash
# 1. Ensure all changes are merged to main
git checkout main
git pull origin main

# 2. Update version in package.json
# Edit package.json: "version": "1.2.0"

# 3. Commit version bump
git add package.json
git commit -m "chore: bump version to 1.2.0"

# 4. Create annotated tag
git tag -a v1.2.0 -m "v1.2.0 - Release description

Features:
- Feature 1
- Feature 2

Fixes:
- Fix 1"

# 5. Push with tags
git push origin main
git push origin v1.2.0
```

### Tag Message Template

```
v1.2.0 - Short release title

Features:
- feat: description of feature
- feat: another feature

Fixes:
- fix: description of fix

Changes:
- refactor: description of change
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

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed
- [ ] Tested locally
- [ ] Build passes (`npm run build`)
```

### Review Criteria

- Code follows project conventions
- No build errors
- No console errors/warnings
- Responsive design maintained
- Accessible (keyboard navigation, ARIA)

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

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive

---

## License

This project is licensed under [GNU GPL v3.0](./LICENSE).
