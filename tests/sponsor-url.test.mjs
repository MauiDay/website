import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { sponsorUrl } from "../src/utils/sponsorUrl.ts";

test("matches the requested sponsor URL", () => {
  assert.equal(
    sponsorUrl("https://grialkit.com/", "cologne-2026"),
    "https://grialkit.com/?utm_source=maui-day&utm_medium=website&utm_campaign=cologne-2026&utm_content=sponsor-section",
  );
});

test("preserves destination parameters and fragments while replacing tracking", () => {
  const url = new URL(sponsorUrl(
    "https://example.com/maui?product=ui&utm_source=old&utm_campaign=old&utm_campaign=duplicate&utm_medium=email&utm_content=logo#pricing",
    "london-2026",
  ));
  assert.equal(url.pathname, "/maui");
  assert.equal(url.hash, "#pricing");
  assert.deepEqual([...url.searchParams], [
    ["product", "ui"],
    ["utm_source", "maui-day"],
    ["utm_campaign", "london-2026"],
    ["utm_medium", "website"],
    ["utm_content", "sponsor-section"],
  ]);
  assert.equal(sponsorUrl(url.href, "london-2026"), url.href);
});

test("rejects missing event identities and invalid URLs", () => {
  for (const eventId of [undefined, "", " "]) {
    assert.throws(() => sponsorUrl("https://example.com", eventId), /requires an eventId/);
  }
  assert.throws(() => sponsorUrl("not a URL", "cologne-2026"), TypeError);
});

test("all named conference sponsor and supporter links have event-specific tracking", async () => {
  const directory = new URL("../src/data/configs/", import.meta.url);
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith("-config.mjs") || filename === "default-config.mjs") continue;
    const { default: config } = await import(new URL(filename, directory));
    assert.equal(config.eventId, `${filename.replace("-config.mjs", "")}-2026`);
    for (const sponsor of [...config.sponsors, ...(config.supporters ?? [])]) {
      const url = new URL(sponsorUrl(sponsor.url, config.eventId));
      assert.equal(url.searchParams.get("utm_campaign"), config.eventId);
    }
  }
});

test("all archive sponsor and supporter links use the snapshot identity", async () => {
  const directory = new URL("../src/data/archive/", import.meta.url);
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith(".json")) continue;
    const event = JSON.parse(await readFile(new URL(filename, directory), "utf8"));
    for (const sponsor of [...event.sponsors, ...(event.supporters ?? [])]) {
      const url = new URL(sponsorUrl(sponsor.url, event.id));
      assert.equal(url.searchParams.get("utm_campaign"), event.id);
    }
  }
});
