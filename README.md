# kmu-scraper

This repository contains a Python scraper (`kmu_nachfolge_scraper.py`) and a **Next.js** marketing site for the Nachfolge / SME exit-readiness platform under `web/`.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the repository.
3. Set **Root Directory** to `web` (Framework Preset: Next.js should auto-detect).
4. Deploy. Vercel runs `npm install` and `npm run build` inside `web/`.

## Run the site locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
cd web
npm run build
npm run start
```
