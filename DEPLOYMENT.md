# Production deployment

The frontend runs as static files and also works on GitHub Pages. Nearby POIs,
address lookup, photos, and reviews use browser-side OpenStreetMap, Wikimedia,
Panoramax, and localStorage APIs, so they do not need Vercel Functions. The
existing `api/` handlers remain available on Vercel for other app features.

1. Import this repository into Vercel. Use the repository root and the `Other`
   framework preset. There is no frontend build step or output directory;
   Vercel serves `index.html`, `app.js`, and `style.css` directly and detects
   the API handlers under `api/`.
2. In Vercel Project Settings > Environment Variables, set `PUBLIC_APP_URL` to
   `https://gadway.sitevo.kz`. Set `DATABASE_URL` if the existing Neon-backed
   endpoints are needed. Apply these variables to Production.
3. Add `gadway.sitevo.kz` to the Vercel project. Replace the GitHub Pages DNS
   records with the exact records Vercel shows, and remove the custom domain
   from GitHub Pages settings. Keep HTTPS enabled for the Vercel domain.
4. Push to the Vercel production branch or deploy the project from Vercel.
   Run `npm run check` before pushing to verify JavaScript syntax. A bundler
   build is not required.
5. Verify the homepage and map interactions.
   `/api/nearby?lng=30.3146&lat=59.9398` needs a configured database and a
   populated `places` table. `/api/reviews?placeId=hermitage` checks the reviews
   API; the reviews table is created automatically if it does not exist.

## Place reviews on static hosting

Without Supabase, reviews are stored by `place_id` in the visitor's browser
`localStorage`. This is device-local and works without server configuration.
To share reviews across devices, create the `reviews` table in Supabase with
`supabase-reviews.sql`, then set the public project URL and anon key in
`supabase-config.js` (or define `window.SUPABASE_URL` and
`window.SUPABASE_ANON_KEY` before that script loads). Apply the SQL policies as
written; anonymous inserts are intentionally enabled for guest reviews.

POIs are loaded on demand within 3.5 km of the map center or user location and
cached in browser memory and `localStorage`. Nominatim search runs only after
the user submits a search, with reverse lookups cached and spaced out. Add the
visible © OpenStreetMap attribution when changing map styles, and keep request
volume moderate because the public OSM APIs are shared community services.

For local development, copy `.env.example` to `.env` and fill in the values.
Never commit `.env` or copy its secret values into Vercel's public variables.
