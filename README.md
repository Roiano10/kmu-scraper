# kmu-scraper

Python tooling (`kmu_nachfolge_scraper.py`) and a **Next.js** marketing site for the Nachfolge / SME exit-readiness platform at the **repository root** (so Vercel works without setting a subfolder).

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com) → **Add New… → Project** → import the repo.
3. Leave **Root Directory** empty (or `.`) — `package.json` is at the repo root.
4. Deploy.

If you still see **404** on `*.vercel.app`: open the project → **Deployments** → open the latest deployment and check the **Build** log. A failed build means nothing is served.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```
