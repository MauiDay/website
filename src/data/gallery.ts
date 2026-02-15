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
    console.error('Failed to fetch albums.json');
    return [];
  }

  const albums: Album[] = await response.json();
  return albums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAlbumImageUrls(album: Album): string[] {
  if (!album.images || album.images.length === 0) return [];
  return album.images
    .filter((name) => IMAGE_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext)))
    .map((name) => `${RAW_BASE}/${album.id}/${name}`);
}

export function getAlbumThumbnail(album: Album, imageUrls: string[]): string {
  if (album.thumbnail) {
    const match = imageUrls.find((url) => url.endsWith(`/${album.thumbnail}`));
    if (match) return match;
  }
  if (imageUrls.length > 0) return imageUrls[0];
  return '/images/default.png';
}
