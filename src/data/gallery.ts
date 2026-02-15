const GALLERY_REPO = 'MauiDay/gallery';
const RAW_BASE = `https://raw.githubusercontent.com/${GALLERY_REPO}/main`;

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export interface Album {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  images?: string[];
}

export interface AlbumWithImages extends Album {
  images: string[];
}

export async function fetchAlbums(): Promise<Album[]> {
  const response = await fetch(`${RAW_BASE}/albums.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch albums.json: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid albums.json format: expected an array');
  }

  return (data as Album[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAlbumImageUrls(album: Album): string[] {
  if (!album.images || album.images.length === 0) return [];
  return album.images
    .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
    .map((name) => `${RAW_BASE}/${album.id}/${name}`);
}

export function getAlbumThumbUrls(album: Album): string[] {
  if (!album.images || album.images.length === 0) return [];
  return album.images
    .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
    .map((name) => `${RAW_BASE}/thumbs/${album.id}/${name}`);
}

export function getAlbumMediumUrls(album: Album): string[] {
  if (!album.images || album.images.length === 0) return [];
  return album.images
    .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
    .map((name) => `${RAW_BASE}/medium/${album.id}/${name}`);
}

export function getAlbumThumbnail(album: Album, imageUrls: string[]): string {
  if (album.thumbnail) {
    const match = imageUrls.find((url) => url.endsWith(`/${album.thumbnail}`));
    if (match) return match;
  }
  if (imageUrls.length > 0) return imageUrls[0];
  return '/images/default.png';
}
