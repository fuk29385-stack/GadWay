/** Browser-side helper for the server endpoint. */
export async function getNearbyPlaces(lng, lat) {
  if (!Number.isFinite(Number(lng)) || !Number.isFinite(Number(lat))) return [];
  const query = new URLSearchParams({ lng: String(lng), lat: String(lat) });
  try {
    const response = await fetch(`/api/nearby?${query}`);
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload?.places) ? payload.places : [];
  } catch {
    return [];
  }
}
