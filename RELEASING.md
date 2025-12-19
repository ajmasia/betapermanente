# Releasing Guide

Git workflow, branching strategy, versioning, and release process.

> **Note**: For publishing blog content, see [PUBLISHING.md](./PUBLISHING.md).

## Table of Contents

- [Branching Strategy](#branching-strategy)
- [Branch Naming](#branch-naming)
- [Commit Convention](#commit-convention)
- [Versioning](#versioning)
- [Release Process](#release-process)

---

## Branching Strategy

Simple trunk-based workflow with feature branches from `main`.

```
main                    Production-ready code (deployed to Vercel)
├── feat/*              New site features
├── fix/*               Bug fixes
├── post/*              New blog posts
├── publish/*           Updates to existing posts
├── chore/*             Maintenance tasks
└── docs/*              Documentation changes
```

### Workflow

```
feat/new-feature ──┐
fix/bug-fix ───────┼──▶ main ──▶ Vercel deploy
post/new-article ──┘         └──▶ tag vX.X.X ──▶ GitHub Release
```

### Quick Workflow

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create branch
git checkout -b feat/descriptive-name

# 3. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 4. Push and merge
git push origin feat/descriptive-name
git checkout main
git merge feat/descriptive-name
git push origin main

# 5. Cleanup
git branch -d feat/descriptive-name
git push origin --delete feat/descriptive-name
```

---

## Branch Naming

### Format

```
<type>/<short-description>
```

### Types

| Type | Use for | Example |
|------|---------|---------|
| `feat/` | New site features | `feat/dark-mode-toggle` |
| `fix/` | Bug fixes | `fix/header-layout-shift` |
| `post/` | New blog posts | `post/guia-docker` |
| `publish/` | Updates to existing posts | `publish/fix-typos-ssh-guide` |
| `refactor/` | Code refactoring | `refactor/component-structure` |
| `docs/` | Documentation changes | `docs/update-readme` |
| `chore/` | Maintenance tasks | `chore/update-dependencies` |

---

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint.

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

### Rules

- Subject line must be lowercase
- No period at the end
- Use imperative mood ("add" not "added")
- Keep under 72 characters

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

BREAKING CHANGE: Header structure changed"
```

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/).

### Format

```
MAJOR.MINOR.PATCH

v1.2.3
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

---

## Release Process

Releases are created automatically by GitHub Actions when a new tag is pushed.

### Creating a Release

```bash
# 1. Ensure main is up to date
git checkout main
git pull origin main

# 2. Update version in package.json
npm version patch  # or minor, or major

# 3. Push with tags
git push origin main --follow-tags
```

The GitHub Action will automatically:
- Detect the new tag
- Generate changelog from commits since last tag
- Create a GitHub Release

### Manual Tag (alternative)

```bash
# Update package.json version manually, then:
git add package.json
git commit -m "chore: bump version to 1.3.0"
git tag -a v1.3.0 -m "v1.3.0"
git push origin main
git push origin v1.3.0
```

---

## Deployment

| Trigger | Action |
|---------|--------|
| Push to `main` | Vercel deploys automatically |
| Push tag `v*` | GitHub Action creates release |

Both triggers are independent and don't conflict.
