# Copilot Instructions

## Build & Dev Commands

- `npm run dev` — Start local dev server at localhost:4321
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build locally

No test suite or linter is configured.

## Architecture

This is an Astro static site for the .NET MAUI Day conference, styled with Tailwind CSS.

### Two-layer configuration system

1. **`mauiday.config.mjs`** (root) — Global settings: site title, description, social media links, and `USE_CONFIG` which selects the active conference.
2. **`src/data/configs/<name>-config.mjs`** — Per-conference settings: Sessionize ID, speakers/schedule feature flags, venue, sponsors, ticket URL, and Code of Conduct contacts. The active config is determined by `USE_CONFIG` (e.g., `"krakow"` loads `krakow-config.mjs`).
3. **`src/configLoader.js`** — Merges both layers at build time. Components use `await loadConfig()` to access the merged result.

Social media links come from `mauiday.config.mjs` and are imported directly (not through `configLoader`). Conference-specific data (speakers, schedule, sponsors) comes through `loadConfig()`.

### Feature flags in conference configs

Conference configs use boolean flags to control which sections render:
- `hasCfs` — Show "Call for Speakers" section (hides Speakers/Schedule nav links)
- `hasAnnouncedSpeakers` — Show speakers section and fetch from Sessionize API
- `hasAnnouncedSchedule` — Show schedule section

### External data

Speaker and session data is fetched at build time from the Sessionize API using the `sessionizeId` in the conference config. Types are defined in `src/types.d.ts`.

## Key Conventions

- **Social media icon order**: Bluesky, X, GitHub, LinkedIn, Flickr, Instagram — maintained consistently across navigation and footer.
- **Dynamic Tailwind classes**: Components use string interpolation for Tailwind classes (e.g., `` hover:text-${accentColor} ``). This is intentional; don't refactor to static classes.
- **Fonts**: `Inter` for body text (`font-sans`), `Poppins` for headings (`font-header`), loaded via Google Fonts CDN.
- **Brand colors**: Defined in `tailwind.config.mjs` — `brand` (purple), `brand-dark` (navy), `brand-light` (light blue), `brand-extra` (pink).
- **Icons**: Font Awesome 6 via CDN. Use `fa-brands` for social icons.
- **Sponsor logos**: Referenced by short name in config (e.g., `"microsoft"`), corresponding to files in `public/images/`.
- **Layout**: Single `Layout.astro` wraps all pages. Pass `isStaticHeader` prop for pages with non-transparent headers (e.g., Code of Conduct page).
