# Maui Day Website

Welcome to the official website repository for the MAUI Day, the only conference dedicated to all things .NET MAUI!

## 🗺️ City Guide

The website includes a conference city guide page at `/guide`.

- Data source: `src/data/city-guide.ts`
- Active page: `src/pages/guide.astro`

To add new sections (for example `Food`, `Places`, `Transport`) or new cards, edit only `src/data/city-guide.ts`:

- Add a category under `categories`
- Add items with `name`, `imageUrl`, `locationName`, `address`, `shortDescription`, `description`, `mapUrl`, and optional `tips`
- Set `view` on category to control rendering:
	- `map` → list + interactive map panel
	- `transport` → step-by-step transport cards
	- `links` → compact website/app link cards
- Optionally add `quickFacts` at guide root for top summary facts

The page renders all categories and items automatically.

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── hero.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |