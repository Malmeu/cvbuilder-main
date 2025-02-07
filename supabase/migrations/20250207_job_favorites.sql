-- Création de la table job_favorites
create table if not exists public.job_favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, job_id)
);

-- Activation RLS
alter table public.job_favorites enable row level security;

-- Suppression des politiques existantes
drop policy if exists "Users can view their own favorites" on public.job_favorites;
drop policy if exists "Users can add their own favorites" on public.job_favorites;
drop policy if exists "Users can remove their own favorites" on public.job_favorites;

-- Création des politiques
create policy "Users can view their own favorites"
  on public.job_favorites for select
  using (auth.uid() = user_id);

create policy "Users can add their own favorites"
  on public.job_favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their own favorites"
  on public.job_favorites for delete
  using (auth.uid() = user_id);

-- Index pour les performances
create index if not exists job_favorites_user_id_idx on public.job_favorites(user_id);
create index if not exists job_favorites_job_id_idx on public.job_favorites(job_id);
