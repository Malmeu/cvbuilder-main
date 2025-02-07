-- Création des tables
-- Création de la table pour les offres d'emploi
create table if not exists public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  location text not null,
  description text not null,
  requirements text[],
  salary_range jsonb,
  job_type text not null check (job_type in ('full-time', 'part-time', 'contract', 'internship')),
  remote_type text not null check (remote_type in ('on-site', 'hybrid', 'remote')),
  source_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Création de la table pour les CV des utilisateurs
create table if not exists public.user_cvs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content jsonb not null,
  type text not null check (type in ('classic', 'canadian')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Création de la table pour les candidatures
create table if not exists public.job_applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  cv_id uuid references public.user_cvs(id) on delete set null,
  status text not null check (status in ('draft', 'applied', 'interviewing', 'accepted', 'rejected')),
  notes text,
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Création des index pour améliorer les performances
create index if not exists user_cvs_user_id_idx on public.user_cvs(user_id);
create index if not exists job_applications_user_id_idx on public.job_applications(user_id);
create index if not exists job_applications_job_id_idx on public.job_applications(job_id);
create index if not exists job_applications_cv_id_idx on public.job_applications(cv_id);

-- Activation de la protection RLS
alter table public.jobs enable row level security;
alter table public.user_cvs enable row level security;
alter table public.job_applications enable row level security;

-- Suppression des politiques existantes
drop policy if exists "Users can view their own CVs" on public.user_cvs;
drop policy if exists "Users can create their own CVs" on public.user_cvs;
drop policy if exists "Users can update their own CVs" on public.user_cvs;
drop policy if exists "Users can delete their own CVs" on public.user_cvs;

drop policy if exists "Users can view their own applications" on public.job_applications;
drop policy if exists "Users can create their own applications" on public.job_applications;
drop policy if exists "Users can update their own applications" on public.job_applications;
drop policy if exists "Users can delete their own applications" on public.job_applications;

drop policy if exists "Everyone can view jobs" on public.jobs;
drop policy if exists "Only admins can insert jobs" on public.jobs;
drop policy if exists "Only admins can update jobs" on public.jobs;
drop policy if exists "Only admins can delete jobs" on public.jobs;

-- Création des nouvelles politiques
-- Politiques pour user_cvs
create policy "Users can view their own CVs"
  on public.user_cvs for select
  using (auth.uid() = user_id);

create policy "Users can create their own CVs"
  on public.user_cvs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own CVs"
  on public.user_cvs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own CVs"
  on public.user_cvs for delete
  using (auth.uid() = user_id);

-- Politiques pour job_applications
create policy "Users can view their own applications"
  on public.job_applications for select
  using (auth.uid() = user_id);

create policy "Users can create their own applications"
  on public.job_applications for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own applications"
  on public.job_applications for update
  using (auth.uid() = user_id);

create policy "Users can delete their own applications"
  on public.job_applications for delete
  using (auth.uid() = user_id);

-- Politiques pour jobs
create policy "Everyone can view jobs"
  on public.jobs for select
  using (true);

create policy "Only admins can insert jobs"
  on public.jobs for insert
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Only admins can update jobs"
  on public.jobs for update
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Only admins can delete jobs"
  on public.jobs for delete
  using (auth.jwt() ->> 'role' = 'admin');
