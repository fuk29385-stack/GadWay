/** Browser-side helper for the server endpoint. */
export async function getNearbyPlaces(lng, lat) {
  const query = new URLSearchParams({ lng: String(lng), lat: String(lat) });
  const response = await fetch(`/api/nearby?${query}`);
  if (!response.ok) throw new Error(`Nearby places request failed (${response.status})`);
  const { places } = await response.json();
  return places;
}
