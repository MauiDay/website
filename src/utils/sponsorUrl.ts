export function sponsorUrl(url: string, eventId: string): string {
  if (!eventId?.trim()) {
    throw new Error("Sponsor tracking requires an eventId (for example, cologne-2026).");
  }

  const trackedUrl = new URL(url);
  trackedUrl.searchParams.set("utm_source", "maui-day");
  trackedUrl.searchParams.set("utm_medium", "website");
  trackedUrl.searchParams.set("utm_campaign", eventId);
  trackedUrl.searchParams.set("utm_content", "sponsor-section");
  return trackedUrl.toString();
}
