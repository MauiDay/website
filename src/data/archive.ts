import type { Album } from './gallery';

export interface Speaker {
  id: string;
  fullName: string;
  tagLine: string;
  profilePicture: string;
}

export interface Session {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  speakers: string[];
}

export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  boost?: boolean;
}

export interface EventLocation {
  name: string;
  address: string;
  mapsEmbedUrl: string;
}

export interface ArchiveEvent {
  id: string;
  title: string;
  date: string;
  location: EventLocation;
  sponsors: Sponsor[];
  speakers: Speaker[];
  sessions: Session[];
  galleryAlbumId: string;
}

const archiveModules = import.meta.glob<{ default: ArchiveEvent }>('./archive/*.json', { eager: true });

export function getArchiveEvents(): ArchiveEvent[] {
  const events = Object.values(archiveModules).map((mod) => mod.default);
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArchiveEvent(id: string): ArchiveEvent | undefined {
  return getArchiveEvents().find((e) => e.id === id);
}
