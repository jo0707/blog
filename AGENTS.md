# AGENTS.md

Guide for agents working on this Astro blog.

## Project

Personal blog built with Astro, Tailwind CSS, Astro Content Collections, and Bun.

Main folders:

- `src/pages` - routes and pages
- `src/components` - reusable Astro components
- `src/layouts` - page layouts
- `src/content/blogs` - Markdown blog posts
- `src/data` - site copy, links, SEO data
- `src/styles/global.css` - global Tailwind and CSS
- `public` - static assets

## Commands

Use Bun.

```bash
bun install
bun run dev
bun run check
bun run build
bun run preview
```

Before finishing changes, run:

```bash
bun run check
bun run build
```

## Coding standards

- Prefer Astro components for static UI.
- Use client JavaScript only when needed.
- Keep pages mostly static and fast.
- Use Tailwind utilities for styling.
- Keep component markup readable.
- Prefer small focused components.
- Keep public URLs stable, especially blog URLs.
- Use semantic HTML when possible.
- Add accessible labels for buttons and links with icons.
- Avoid adding large dependencies unless clear benefit exists.
- Keep dark mode classes paired with light mode classes.
- Do not reintroduce Nuxt, Vue, Nuxt UI, or Nuxt config.

## Design standards

- Preserve current visual identity.
- Match existing spacing, typography, colors, and responsive behavior.
- Blog pages should stay close to original Nuxt design.
- Footer should remain simple and centered.
- Header should remain clean, sticky, and readable.
- Prefer calm neutral colors.
- Keep animations subtle.

## Content creation rules

Blog posts live in:

```txt
src/content/blogs
```

Use Markdown with frontmatter:

```md
---
title: Post title
date: 2026-05-01
description: Short friendly summary.
image: /path-to-image.png
alt: Helpful image alt text.
ogImage: /path-to-image.png
tags:
  - tag-one
  - tag-two
published: true
---
```

Rules:

- File names should start with a number, then a dot, then slug text.
  - Example: `3.my-new-post.md`
- Blog URL removes leading number.
  - `3.my-new-post.md` becomes `/blogs/my-new-post`
- Keep `description` short and useful.
- Use real alt text for images.
- Store static images in `public`.
- Reference public images from root path.
  - Example: `/blogs-img/my-image.png`
- Use tags in lowercase or natural category form.
- Set `published: false` for drafts.
- Do not commit broken image paths.

## Writing tone

Write posts with an enjoy, happy, relaxed tone.

Preferred style:

- Friendly and natural.
- Clear and practical.
- Curious and honest.
- A little playful is fine.
- Explain lessons like sharing with a friend.
- Keep paragraphs short.
- Use simple words when possible.
- Sound human, not corporate.

Avoid:

- Robotic GPT or LLM style.
- Em dash characters.
- Overly polished marketing tone.
- Big claims without context.
- Too many buzzwords.
- Fake certainty.
- Long intros that delay the point.

Use normal punctuation. Prefer comma, period, colon, semicolon, or simple hyphen instead of em dash.

## Content quality checklist

Before adding or editing a post:

- Title is clear.
- Date is valid.
- Description fits SEO and preview cards.
- Images exist in `public`.
- Alt text describes the image.
- Headings follow a logical order.
- Code blocks have language tags when possible.
- Links work.
- Tone feels relaxed and human.
- No em dash characters.
- Run `bun run check` and `bun run build`.

## SEO standards

- Use descriptive titles.
- Keep descriptions concise.
- Prefer one clear topic per post.
- Use canonical URLs from existing layout behavior.
- Keep RSS working.
- Keep sitemap generation working.

## Safety rules

- Do not delete content unless asked.
- Do not change existing blog URLs without asking.
- Do not expose secrets or commit `.env` files.
- Do not edit generated files in `dist`, `.astro`, or `node_modules`.
- Do not add tracking scripts without explicit approval.
