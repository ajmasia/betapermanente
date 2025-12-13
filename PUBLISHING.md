# Publishing New Content

Step-by-step checklist for publishing new blog posts.

## Quick Checklist

- [ ] Create feature branch from `main`
- [ ] Create hero image (1200x630px)
- [ ] Create markdown file with frontmatter
- [ ] Write content
- [ ] Preview locally
- [ ] Set `draft: false`
- [ ] Commit and merge to `main`
- [ ] Verify deployment

---

## Step 1: Create Feature Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/post-[post-slug]
```

**Naming convention**: `feature/post-` + post slug (e.g., `feature/post-guia-docker`)

---

## Step 2: Create Hero Image

### Specifications

| Property | Value |
|----------|-------|
| Dimensions | **1200 x 630 px** |
| Aspect ratio | 1.91:1 |
| Format | PNG or JPG |
| Max size | ~500KB |
| Location | `public/images/blog/` |

### File naming

```
public/images/blog/[post-slug].png
```

### Resize command (if needed)

```bash
# ImageMagick
convert input.png -resize 1200x630^ -gravity center -extent 1200x630 output.png

# FFmpeg
ffmpeg -i input.png -vf "scale=1200:630:force_original_aspect_ratio=decrease,pad=1200:630:(ow-iw)/2:(oh-ih)/2" output.png
```

---

## Step 3: Create Post File

### Location

```
src/content/blog/[post-slug].md
```

### Frontmatter template

```yaml
---
title: "Post Title"
description: "Brief description for SEO (150-160 characters)"
date: "Dec 15 2025"
author: "ajmasia"
heroImage: "/images/blog/[post-slug].png"
showHeroImage: true
tags: ["tag1", "tag2"]
lang: es
draft: true
---
```

### Field reference

| Field | Required | Default | Notes |
|-------|----------|---------|-------|
| `title` | Yes | - | Post title |
| `description` | Recommended | - | SEO description |
| `date` | Yes | - | Publication date |
| `author` | No | `ajmasia` | Author ID |
| `heroImage` | Recommended | - | Path to hero image |
| `showHeroImage` | No | `true` | Display hero in post |
| `tags` | Recommended | - | Array of tags |
| `lang` | No | `es` | `es` or `en` |
| `draft` | No | `true` | `false` to publish |

---

## Step 4: Write Content

### Markdown reference

```markdown
## Heading 2

### Heading 3

Paragraph with **bold** and *italic*.

- Bullet item
- Another item

1. Numbered item
2. Another item

[Link](https://example.com)

![Alt text](/images/blog/image.png)

> Blockquote

`inline code`
```

### Code blocks

````markdown
```javascript
const code = "example";
```
````

### Content images

```
Location: public/images/blog/[post-slug]_image01.png
Reference: ![Alt](/images/blog/[post-slug]_image01.png)
```

---

## Step 5: Preview Locally

```bash
npm run dev
```

Open `http://localhost:4321/blog/[post-slug]`

### Verify

- [ ] Hero image displays correctly
- [ ] Content renders properly
- [ ] Code blocks are highlighted
- [ ] Links work
- [ ] Mobile responsive

---

## Step 6: Publish

### Set draft to false

```yaml
draft: false
```

### Commit

```bash
git add .
git commit -m "feat: publish new post - [post-title]"
```

---

## Step 7: Merge to Main

```bash
git checkout main
git pull origin main
git merge feature/post-[post-slug]
git push origin main
```

### Cleanup

```bash
git branch -d feature/post-[post-slug]
```

---

## Step 8: Verify Deployment

1. Wait for Vercel deployment (~1-2 min)
2. Check post at `https://permanentbeta.dev/blog/[post-slug]`
3. Verify social preview:
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## Troubleshooting

### Post not appearing

- Check `draft: false`
- Check `lang: "es"`
- Verify frontmatter YAML syntax
- Run `npm run build` to check errors

### Hero image not showing

- Verify path starts with `/images/blog/`
- Check file exists in `public/images/blog/`
- Filenames are case-sensitive

### Social preview wrong

- Image must be exactly 1200x630
- Clear social platform cache using debug tools
- Wait a few minutes for cache refresh

---

## Tags Reference

Current tags in use:

```
bitwarden, git, hardware, offtopic, privacidad,
reflexión, security, seguridad, ssh, tmux, tools
```

Check all tags: `/blog/tags`
