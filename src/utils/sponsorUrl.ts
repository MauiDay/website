export function sponsorUrl(url: string, eventId?: string | null): string {
  if (!eventId?.trim()) {
    return url;
  }

  const trackedUrl = new URL(url);
  trackedUrl.searchParams.set("utm_source", "maui-day");
  trackedUrl.searchParams.set("utm_medium", "website");
  trackedUrl.searchParams.set("utm_campaign", eventId);
  trackedUrl.searchParams.set("utm_content", "sponsor-section");
  return trackedUrl.toString();
}
