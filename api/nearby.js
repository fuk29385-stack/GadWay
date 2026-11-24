import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

/** Find places no more than 5 km from lng/lat. Runs on the server. */
export async function findNearbyPlaces(lng, lat) {
  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    throw new TypeError("lng must be a number from -180 to 180");
  }
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    throw new TypeError("lat must be a number from -90 to 90");
  }

  return sql`
    SELECT
      id,
      name,
      description,
      ROUND(ST_Distance(location, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography)) AS distance_meters
    FROM places
    WHERE ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
      5000
    )
    ORDER BY distance_meters ASC
  `;
}

// Vercel serverless function endpoint: GET /api/nearby?lng=...&lat=...
export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const lng = Number(request.query.lng);
  const lat = Number(request.query.lat);
  if (request.query.lng === undefined || request.query.lat === undefined || !Number.isFinite(lng) || !Number.isFinite(lat)) {
    return response.status(400).json({ error: "Valid lng and lat query parameters are required" });
  }

  try {
    const places = await findNearbyPlaces(lng, lat);
    return response.status(200).json({ places });
  } catch (error) {
    console.error("Nearby places query failed", error);
    return response.status(500).json({ error: "Could not load nearby places" });
  }
}
