# Archive Event Skill

## Description

Archives a past .NET MAUI Day event by snapshotting its Sessionize data, sponsors, location, and gallery link into a static JSON file. This creates an archive page on the website.

## Trigger

When the user asks to "archive" an event, e.g.:
- "Archive Kraków 2026"
- "Snapshot the London event"
- "Add Cologne 2024 to the archive"

## Steps

### 1. Identify the event

Determine from the user's request:
- **Event name and city** (e.g., "Kraków 2026")
- **Config name** — check `src/data/configs/` for a matching `*-config.mjs` file (e.g., `krakow-config.mjs` → config name is `krakow`)

If no config file exists, ask the user for:
- Sessionize API ID
- Location name and address
- Google Maps embed URL

If a config file exists, read it to get the `sessionizeId` from it.

### 2. Determine the event ID

The event ID follows the pattern `{city}-{year}`, e.g., `krakow-2026`, `london-2025`, `cologne-2024`.
For multiple events in the same city/year, add a qualifier: `cologne-feb-2024`.

### 3. Check for existing archive

Look in `src/data/archive/` to see if a `{event-id}.json` already exists. If it does, confirm with the user before overwriting.

### 4. Check for gallery album

Fetch `https://raw.githubusercontent.com/MauiDay/gallery/main/albums.json` and check if an album with a matching ID exists. If not, the `--gallery` flag should be omitted or set to empty string.

### 5. Run the snapshot script

```bash
node scripts/snapshot-event.mjs <sessionize-id> \
  --id <event-id> \
  --title "<Event Title>" \
  --date <YYYY-MM-DD> \
  --config <config-name> \
  --gallery <album-id-or-empty>
```

The `--config` flag automatically pulls sponsors, location, and maps embed URL from the config file.

If there's no config file, use `--location-name`, `--location-address`, and `--maps-url` flags instead.

### 6. Verify the output

- Read the generated JSON file in `src/data/archive/{event-id}.json`
- Confirm it has speakers, sessions, location, and sponsors (where applicable)
- If `galleryAlbumId` is set but no album exists, clear it to empty string in the JSON

### 7. Build and verify

Run `npm run build` to ensure the site builds successfully with the new archive entry.

### 8. Commit and push

Commit the new JSON file with a descriptive message:
```
Archive {Event Title}

Snapshotted {N} speakers, {N} sessions from Sessionize.
```

## File locations

- **Snapshot script**: `scripts/snapshot-event.mjs`
- **Config files**: `src/data/configs/{name}-config.mjs`
- **Archive data**: `src/data/archive/{event-id}.json`
- **Archive types**: `src/data/archive.ts`
- **Archive pages**: `src/pages/archive/index.astro` (overview), `src/pages/archive/[event].astro` (detail)
- **Gallery albums**: fetched from `https://raw.githubusercontent.com/MauiDay/gallery/main/albums.json`

## Existing archived events

Check `src/data/archive/*.json` for already-archived events to avoid duplicates.

## Notes

- The snapshot script requires network access to fetch from the Sessionize API
- Sessionize API endpoint: `https://sessionize.com/api/v2/{id}/view/all`
- Old events may have expired Sessionize APIs — if so, ask the user for an alternative Sessionize ID
- Speaker profile pictures are served from Sessionize's CDN — this is expected
- The gallery section is hidden automatically when `galleryAlbumId` is empty
- The sponsors section is hidden automatically when the sponsors array is empty
- Online events should have location name set to "Online" to skip the map section
