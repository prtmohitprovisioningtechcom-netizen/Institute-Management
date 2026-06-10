export function galleryMediaUrl(id: string | undefined | null): string | null {
  const normalized = String(id ?? "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return `/api/public/gallery/media/${normalized}`;
}

export function isGalleryVideo(item: { type?: string; image?: string }): boolean {
  return item.type === "video" || (item.image?.startsWith("data:video/") ?? false);
}

export function parseDataUrl(dataUrl: string): { contentType: string; buffer: Buffer } | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  try {
    return {
      contentType: match[1],
      buffer: Buffer.from(match[2], "base64"),
    };
  } catch {
    return null;
  }
}
