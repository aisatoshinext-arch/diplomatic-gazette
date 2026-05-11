# The Diplomatic Gazette

> Satirical diplomatic correspondence. US proposes peace. Iran has footnotes. Trump posts at 3am.

## Deploy to Netlify (2 minutes)

### Option A — Netlify UI (easiest)
1. Zip this entire folder
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
3. Drag and drop the zip
4. Done. It builds automatically.

### Option B — Netlify CLI
```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=dist
```

### Option C — GitHub + Netlify (auto-deploys)
1. Push this folder to a GitHub repo
2. Connect the repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Local development

```bash
npm install
npm run dev
```

## Features

- 3 satirical diplomatic letters (US proposal, Iran's reply, Trump's Truth Social post)
- Community joke submission with emoji flag selector
- Upvoting system (one vote per joke per browser)
- Sort by Top / Recent
- All data stored in localStorage — no backend needed
- Fully responsive

## Customizing

To add more seed jokes, edit the `SEED_JOKES` array in `src/App.jsx`.

To add more letters, edit the `LETTERS` array.

Margaret remains unavailable on Tuesdays.
