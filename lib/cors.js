const PRODUCTION_ORIGIN = "https://gadway.sitevo.kz";

export function getPublicAppOrigin() {
  try {
    return new URL(process.env.PUBLIC_APP_URL || PRODUCTION_ORIGIN).origin;
  } catch {
    return PRODUCTION_ORIGIN;
  }
}

/** Allow the production site and this deployment's own Vercel URL only. */
export function applyCors(request, response) {
  const origin = request.headers.origin;
  const allowedOrigins = new Set([PRODUCTION_ORIGIN]);

  allowedOrigins.add(getPublicAppOrigin());
  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "86400");

  if (!origin) return true;
  if (!allowedOrigins.has(origin)) return false;

  response.setHeader("Access-Control-Allow-Origin", origin);
  return true;
}
