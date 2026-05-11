-- ============================================================
-- The Diplomatic Gazette — Supabase Setup
-- Run this in: Supabase → SQL Editor → New Query → Run
-- ============================================================

-- 1. Create the jokes table
create table jokes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  author text not null,
  country text not null default '🌍',
  text text not null,
  votes integer not null default 0
);

-- 2. Enable Row Level Security
alter table jokes enable row level security;

-- 3. Allow anyone to read jokes (public)
create policy "Anyone can read jokes"
  on jokes for select
  using (true);

-- 4. Allow anyone to insert jokes (anonymous submissions)
create policy "Anyone can insert jokes"
  on jokes for insert
  with check (true);

-- 5. Nobody can delete or update directly (votes go through RPC only)
-- (no update/delete policies = blocked by default)

-- 6. Create the increment_votes function (called by the app to upvote)
create or replace function increment_votes(joke_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update jokes
  set votes = votes + 1
  where id = joke_id;
end;
$$;

-- 7. Enable real-time for the jokes table
-- Go to: Supabase → Database → Replication → enable "jokes" table
-- (can't be done via SQL, must be done in the UI)

-- ============================================================
-- Done! Your database is ready.
-- ============================================================

-- 8. Allow anyone to delete jokes (for self-moderation)
-- Run this if you want users to be able to delete their own dispatches
create policy "Anyone can delete jokes"
  on jokes for delete
  using (true);
