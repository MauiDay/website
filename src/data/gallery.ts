const GALLERY_REPO = 'MauiDay/gallery';
const RAW_BASE = `https://raw.githubusercontent.com/${GALLERY_REPO}/main`;
const API_BASE = `https://api.github.com/repos/${GALLERY_REPO}/contents`;

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export interface Album {
  id: string;
  title: string;
  date: string;
}

export interface AlbumWithImages extends Album {
  images: string[];
}

export async function fetchAlbums(): Promise<Album[]> {
  const response = await fetch(`${RAW_BASE}/albums.json`);
  if (!response.ok) {
    console.error('Failed to fetch albums.json');
    return [];
  }

  const albums: Album[] = await response.json();
  return albums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchAlbumImages(albumId: string): Promise<string[]> {
  const response = await fetch(`${API_BASE}/${albumId}`);
  if (!response.ok) {
    console.error(`Failed to fetch images for album: ${albumId}`);
    return [];
  }

  const files: { name: string; download_url: string }[] = await response.json();
  return files
    .filter((f) => IMAGE_EXTENSIONS.some((ext) => f.name.toLowerCase().endsWith(ext)))
    .map((f) => f.download_url);
}

export function getAlbumThumbnail(albumId: string, images: string[]): string {
  if (images.length > 0) return images[0];
  return '/images/default-album.png';
}
