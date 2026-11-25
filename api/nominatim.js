const APP_USER_AGENT = "GadWay/1.0 (https://gadway.sitevo.kz/)";
const APP_REFERER = "https://gadway.sitevo.kz/";
const MIN_REQUEST_INTERVAL = 1100;

let lastUpstreamRequestAt = 0;
let upstreamQueue = Promise.resolve();

function queueNominatimRequest(url) {
  const task = upstreamQueue.then(async () => {
    const wait = Math.max(0, MIN_REQUEST_INTERVAL - (Date.now() - lastUpstreamRequestAt));
    if (wait) await new Promise(resolve => setTimeout(resolve, wait));
    lastUpstreamRequestAt = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      return await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "User-Agent": APP_USER_AGENT,
          Referer: APP_REFERER
        }
      });
    } finally {
      clearTimeout(timeout);
    }
  });

  upstreamQueue = task.catch(() => {});
  return task;
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { operation } = request.query;
  const params = new URLSearchParams({ format: "jsonv2", "accept-language": "ru" });

  if (operation === "reverse") {
    const lat = Number(request.query.lat);
    const lon = Number(request.query.lon);
    if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) {
      return response.status(400).json({ error: "Valid latitude and longitude are required" });
    }
    params.set("lat", String(lat));
    params.set("lon", String(lon));
    params.set("zoom", "18");
    params.set("addressdetails", "1");
  } else if (operation === "search") {
    const search = String(request.query.q || "").trim();
    if (search.length < 3 || search.length > 160) {
      return response.status(400).json({ error: "Search text must contain 3 to 160 characters" });
    }
    params.set("q", search);
    params.set("limit", "1");
    params.set("addressdetails", "1");
  } else {
    return response.status(400).json({ error: "Operation must be reverse or search" });
  }

  response.setHeader("Cache-Control", "private, max-age=86400");

  try {
    const upstreamUrl = "https://nominatim.openstreetmap.org/" + operation + "?" + params.toString();
    const upstream = await queueNominatimRequest(upstreamUrl);
    const body = await upstream.text();
    if (!upstream.ok) {
      return response.status(upstream.status).json({ error: upstream.status === 429 ? "Address service rate limit reached" : "Address service request failed" });
    }
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return response.status(502).json({ error: "Address service returned invalid JSON" });
    }
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    return response.status(200).json(data);
  } catch (error) {
    const status = error.name === "AbortError" ? 504 : 502;
    return response.status(status).json({ error: status === 504 ? "Address service timed out" : "Could not reach address service" });
  }
}
