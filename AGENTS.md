# AGENTS.md

Guide for agents working on this Astro blog.

## Session workflow (read first)

At the start of every session, ask the user which mode they want:

1. **Create a blog post** - a session for writing or editing blog content.
2. **Develop** - a session for building or fixing the site itself.

How to behave:

- If the user picks **Create a blog post** (or their first message is clearly about writing a post), read `BLOG_CREATE.md` and follow its workflow step by step.
- If the user picks **Develop** (or the message is clearly about the code, layout, or config), continue with the development guide below.
- If the mode is unclear, ask before doing any work.
- Do not silently choose a mode. When in doubt, ask.

## Project

Personal blog built with Astro, Tailwind CSS, Astro Content Collections, and Bun.

Note: Astro is pinned to 7.2.0. Do not downgrade. Earlier 6.x versions fail to build this project (see the Giscus section below for context on why).

Main folders:

- `src/pages` - routes and pages
- `src/components` - reusable Astro components
- `src/layouts` - page layouts
- `src/content/blogs` - Markdown blog posts
- `src/data` - site copy, links, SEO data
- `src/assets/blogs` - featured post images (optimized by astro:assets, see Images below)
- `src/utils` - helpers (formatDate, postSlug, tagSlug, postImage)
- `src/styles/global.css` - global Tailwind and CSS
- `public` - static assets (body screenshots, OG fallbacks, favicons)

## Commands

Use Bun.

```bash
bun install
bun run dev
bun run check
bun run build    # also runs postbuild: pagefind --site dist
bun run preview
```

Before finishing changes, run:

```bash
bun run check
bun run build
```

`bun run build` also triggers `postbuild`, which generates the Pagefind search index into `dist/pagefind`. The site search (see below) only has an index after a build; in dev mode it shows a hint instead of results.

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
- The site uses Astro view transitions (`<ClientRouter />` in `BaseLayout`). Inline scripts re-run on every navigation, but `document`/`documentElement` persist across soft navigations, so any document-level listeners or observers (scroll, `astro:page-load`, `MutationObserver`) must be de-duplicated. The existing pattern stores the previous handler on `window` (e.g. `window.__tocScrollHandler`, `window.__giscusThemeObserver`) and removes/disconnects it before re-adding. Follow this pattern for any new interactive script (see `Toc.astro`, `CommentSection.astro`, `CodeBlockEnhancer.astro`, `SearchModal.astro`).

## Design standards

- Preserve current visual identity.
- Match existing spacing, typography, colors, and responsive behavior.
- Blog pages should stay close to original Nuxt design.
- Footer should remain simple and centered.
- Header should remain clean, sticky, and readable.
- Prefer calm neutral colors.
- Keep animations subtle.

## Site search (Pagefind)

Full-site search is powered by Pagefind. The index is generated at build time by the `postbuild` script (`pagefind --site dist`), so it only exists after `bun run build`.

- UI lives in `src/components/SearchModal.astro`, opened from the header search button (`#search-open`) or the `/` keyboard shortcut.
- The Pagefind JS API is loaded lazily with a `/* @vite-ignore */` dynamic import of `/pagefind/pagefind.js`. In dev there is no index yet, so the modal shows a hint message instead.
- Because of view transitions, the script re-binds on every `astro:page-load` and de-duplicates its document-level keydown handler (stored on `window.__searchModalPageLoad`).
- Keep the header button id (`search-open`) in sync with the modal script.

## Images

Featured post images (the `image` frontmatter field) are stored in `src/assets/blogs/` and optimized by astro:assets (resize + WebP + responsive srcset). The frontmatter path mirrors the folder structure:

```txt
file:         src/assets/blogs/4.my-post-slug/cover.png
frontmatter:  image: /4.my-post-slug/cover.png
```

- `src/utils/postImages.ts` maps frontmatter paths to `ImageMetadata` via `import.meta.glob`. `PostCard` and `BlogHeader` render optimized WebP variants; the social/OG image is generated with `getImage()` (1200x630 WebP) in `src/pages/blogs/[...slug].astro`, falling back to frontmatter `ogImage`/`image`.
- `postImage()` logs a build warning when a frontmatter path does not resolve. Do not ignore it: it means the file is missing or the path does not mirror `src/assets/blogs`.
- Screenshots inside post bodies stay in `public` and are referenced from root (e.g. `/4.my-post-slug/shot1.png`). They are served as-is. Never delete a `public` image that a post body still references.
- Full content-creation rules live in `BLOG_CREATE.md`.

## Tag pages

- Static tag archives are generated from `src/pages/tags/`: `/tags` lists every tag with post counts, `/tags/[tag]` lists the posts for one tag.
- Tag URLs use `tagSlug()` from `src/utils/helper.ts` (lowercase, hyphens). Keep tag slugs stable once published; tags on `PostCard` and `BlogHeader` link to `/tags/[tag]`.

## Code copy buttons

`src/components/CodeBlockEnhancer.astro` (rendered once in `BaseLayout`) adds a language label and a "Copy" button to every rendered `<pre>` code block at runtime. New posts need no extra work; just use normal fenced code blocks with a language tag.

## Comments (Giscus)

Blog posts show a comment section powered by Giscus, which stores comments as GitHub Discussions in the `jo0707/blog` repo. Visitors need a GitHub account to comment.

The widget lives in `src/components/CommentSection.astro` and is rendered on every blog post by `src/pages/blogs/[...slug].astro`.

Current Giscus config (keep in sync with the giscus.app wizard):

```txt
repo: jo0707/blog
repo-id: R_kgDOPFwa2Q   (repo node_id from the GitHub API)
category: Announcements  (only maintainers can create threads; anyone can comment)
category-id: DIC_kwDOPFwa2c4DC7Ta
mapping: pathname
strict: 0
reactions: on
input-position: bottom
lang: en
```

Dark mode sync:

- The site toggles a `dark` class on `<html>`.
- Initial Giscus load uses `data-theme="preferred_color_scheme"`.
- An inline script in `CommentSection.astro` observes class changes on `document.documentElement` with a `MutationObserver` and posts `{ giscus: { setConfig: { theme } } }` to the `iframe.giscus-frame` (targetOrigin `https://giscus.app`) so comments follow the manual dark/light toggle. The observers are stored on `window` (`__giscusThemeObserver`, `__giscusFrameObserver`) and disconnected before re-creation, because the script re-runs on every view transition.
- If you change the theme toggle logic in `Header.astro`, keep this observer in sync.

If the config ever needs regenerating:

1. Enable Discussions on the repo (Settings, General, Discussions).
2. Install the giscus GitHub App on `jo0707/blog` only.
3. Open giscus.app, pick the repo and the Announcements category, and copy `data-repo-id` and `data-category-id` into the component defaults.

Do not change the `mapping` or post URLs casually: Giscus ties each discussion to the page pathname, so a URL change orphans the comment thread.

## Content creation

All rules for writing blog posts (frontmatter, file naming, images, tone, structure, checklist, and validation) live in `BLOG_CREATE.md` at the project root. Read it and follow it whenever the session mode is "Create a blog post".

## SEO standards

- Use descriptive titles.
- Keep descriptions concise.
- Prefer one clear topic per post.
- Use canonical URLs from existing layout behavior.
- Keep RSS working: the feed (`src/pages/rss.xml.ts`) includes full post content rendered with markdown-it and absolute URLs. Don't break body image paths or move files referenced by post bodies out of `public`.
- Keep sitemap generation working.
- `og:image`/`twitter:image` are generated from the optimized featured image (1200x630 WebP) in `[...slug].astro`; RSS auto-discovery (`<link rel="alternate" type="application/rss+xml">`) lives in `BaseLayout`.

## Safety rules

- Do not delete content unless asked.
- Do not change existing blog URLs without asking.
- Do not expose secrets or commit `.env` files.
- Do not edit generated files in `dist`, `.astro`, or `node_modules`.
- Do not add tracking scripts without explicit approval.
