# The Diplomatic Gazette

> Satirical diplomatic correspondence. US proposes peace. Iran has footnotes. Trump posts at 3am.
> Community jokes are shared in real time between all visitors via Supabase.

---

## Setup (~10 minutes total)

### Step 1 — Create a Supabase project (free)

1. Go to [supabase.com](https://supabase.com) → sign up
2. Click **New Project** → give it a name → choose a region → wait ~2 min

### Step 2 — Create the database

1. In Supabase → **SQL Editor** → **New Query**
2. Paste the entire contents of `supabase-setup.sql` → click **Run**

### Step 3 — Enable real-time

1. Supabase → **Database** → **Replication**
2. Find the `jokes` table → toggle **ON**

### Step 4 — Get your API keys

Supabase → **Settings** → **API** → copy:
- **Project URL** (`https://xxxxxx.supabase.co`)
- **anon public** key (long JWT)

### Step 5 — Add keys

Create `.env` in the project root:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Deploy to Netlify

### Option A — GitHub + Netlify (recommended)

1. Push this folder to GitHub (`.env` is gitignored — safe)
2. Netlify → **Add new site** → **Import from Git**
3. Build command: `npm run build` / Publish: `dist`
4. **Site Settings → Environment variables** → add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
5. Trigger deploy → done

### Option B — Manual deploy

```bash
npm install && npm run build
```
Drag the `dist/` folder to Netlify, then add env vars in Site Settings and redeploy.

---

## Local dev

```bash
npm install
npm run dev
```

---

## Architecture

- **Jokes**: Supabase PostgreSQL → shared between all users
- **Voting**: 1 vote/joke/browser (localStorage) → Supabase RPC
- **Real-time**: new jokes + vote counts update live via Supabase websockets
- **Seeding**: DB auto-seeded with 5 jokes on first load if empty

Supabase free tier: 500MB DB, 2GB bandwidth, 200 concurrent connections. More than enough.

Margaret remains unavailable on Tuesdays.
