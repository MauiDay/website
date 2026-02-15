#!/usr/bin/env node

/**
 * Snapshot an event for the archive.
 *
 * Usage:
 *   node scripts/snapshot-event.mjs <sessionize-id> \
 *     --id <event-id> \
 *     --title <title> \
 *     --date <YYYY-MM-DD> \
 *     --location-name <name> \
 *     --location-address <address> \
 *     [--maps-url <url>] \
 *     [--gallery <album-id>] \
 *     [--config <config-name>]       # reads sponsors/location from existing config
 *
 * If --config is provided, sponsors and location are pulled from the config file.
 * Sessionize data is fetched from the API and snapshotted.
 */

import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const archiveDir = resolve(__dirname, '..', 'src', 'data', 'archive');

function parseArgs(argv) {
  const args = { _positional: [] };
  let i = 2;
  while (i < argv.length) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].replace(/^--/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      args[key] = argv[i + 1] || true;
      i += 2;
    } else {
      args._positional.push(argv[i]);
      i++;
    }
  }
  return args;
}

async function fetchSessionize(sessionizeId) {
  const url = `https://sessionize.com/api/v2/${sessionizeId}/view/all`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Warning: Sessionize API returned ${res.status} for ${sessionizeId}`);
    return { speakers: [], sessions: [] };
  }

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    const speakers = (data.speakers || []).map(s => ({
      id: s.id,
      fullName: s.fullName,
      tagLine: s.tagLine || '',
      profilePicture: s.profilePicture || '',
    }));

    const sessions = (data.sessions || []).map(s => ({
      title: s.title,
      description: s.description || '',
      startsAt: s.startsAt,
      endsAt: s.endsAt,
      speakers: s.speakers || [],
    }));

    return { speakers, sessions };
  } catch {
    console.warn(`Warning: Could not parse Sessionize response for ${sessionizeId}`);
    return { speakers: [], sessions: [] };
  }
}

async function loadConfig(configName) {
  const configPath = resolve(__dirname, '..', 'src', 'data', 'configs', `${configName}-config.mjs`);
  try {
    const mod = await import(configPath);
    return mod.default;
  } catch (e) {
    console.warn(`Warning: Could not load config ${configName}: ${e.message}`);
    return null;
  }
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

async function main() {
  const args = parseArgs(process.argv);
  const sessionizeId = args._positional[0];

  if (!sessionizeId || !args.id || !args.title || !args.date) {
    console.error('Usage: node scripts/snapshot-event.mjs <sessionize-id> --id <id> --title <title> --date <YYYY-MM-DD> [--config <name>] [--gallery <album-id>]');
    process.exit(1);
  }

  console.log(`Snapshotting event: ${args.title} (${args.id})`);

  // Fetch Sessionize data
  console.log(`  Fetching Sessionize data (${sessionizeId})...`);
  const { speakers, sessions } = await fetchSessionize(sessionizeId);
  console.log(`  Found ${speakers.length} speakers, ${sessions.length} sessions`);

  // Build event object
  const event = {
    id: args.id,
    title: args.title,
    date: args.date,
    location: {
      name: args.locationName || '',
      address: args.locationAddress || '',
      mapsEmbedUrl: args.mapsUrl || '',
    },
    sponsors: [],
    speakers,
    sessions,
    galleryAlbumId: args.gallery || args.id,
  };

  // Load from config if provided
  if (args.config) {
    console.log(`  Loading config: ${args.config}`);
    const config = await loadConfig(args.config);
    if (config) {
      if (!args.locationName) {
        event.location.name = config.location || '';
        event.location.address = stripHtml(config.locationAddress || '');
        event.location.mapsEmbedUrl = config.mapsEmbedUrl || '';
      }
      event.sponsors = (config.sponsors || []).map(s => ({
        name: s.name,
        logo: s.logo,
        url: s.url,
        boost: s.boost || false,
      }));
    }
  }

  // Write JSON
  const outPath = resolve(archiveDir, `${args.id}.json`);
  writeFileSync(outPath, JSON.stringify(event, null, 2) + '\n');
  console.log(`  Written to ${outPath}`);
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
