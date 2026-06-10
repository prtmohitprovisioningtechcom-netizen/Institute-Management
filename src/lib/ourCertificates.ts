export const OUR_CERTIFICATES_SETTINGS_KEY = "our_certificates";

export type OurCertificateItem = {
  id: string;
  logo: string;
};

export function parseOurCertificatesJson(raw: string | null | undefined): OurCertificateItem[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const id = typeof row.id === "string" ? row.id : "";
        const logo = typeof row.logo === "string" ? row.logo : "";
        if (!id || !logo) return null;
        return { id, logo };
      })
      .filter((item): item is OurCertificateItem => item !== null);
  } catch {
    return [];
  }
}

export function serializeOurCertificatesJson(items: OurCertificateItem[]): string {
  return JSON.stringify(
    items.map((item) => ({
      id: item.id,
      logo: item.logo,
    })),
  );
}
