# Production deployment

This project serves the static page from the repository root and runs the files
in `api/` as Vercel Functions. GitHub Pages can serve the page but cannot run
these API handlers; the current production domain is still on GitHub Pages.

1. Import this repository into Vercel. Use the repository root and the `Other`
   framework preset. There is no frontend build step or output directory;
   Vercel serves `index.html`, `app.js`, and `style.css` directly and detects
   the API handlers under `api/`.
2. In Vercel Project Settings > Environment Variables, set `PUBLIC_APP_URL` to
   `https://gadway.sitevo.kz`. Set `DATABASE_URL` to the Neon connection string
   if the nearby places endpoint is needed. Apply these variables to Production.
3. Add `gadway.sitevo.kz` to the Vercel project. Replace the GitHub Pages DNS
   records with the exact records Vercel shows, and remove the custom domain
   from GitHub Pages settings. Keep HTTPS enabled for the Vercel domain.
4. Push to the Vercel production branch or deploy the project from Vercel.
   Run `npm run check` before pushing to verify JavaScript syntax. A bundler
   build is not required.
5. Verify the homepage, then check `/api/nominatim?operation=search&q=Hermitage`.
   `/api/nearby?lng=30.3146&lat=59.9398` needs a configured database and a
   populated `places` table.

For local development, copy `.env.example` to `.env` and fill in the values.
Never commit `.env` or copy its secret values into Vercel's public variables.
