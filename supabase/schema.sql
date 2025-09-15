create extension if not exists pgcrypto;

create table if not exists public.tenants(
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text,
  plan text check (plan in ('essentiels','starter','pro','beta')),
  plan_exit_choice text check (plan_exit_choice in ('essentiels','starter','pro')),
  created_at timestamptz default now()
);

create table if not exists public.brands(
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  name text not null,
  logo_url text,
  brandkit jsonb,
  tone_profile jsonb,
  enabled_networks text[] default array['li','ig','fb','x','tt','yt','pin'],
  options jsonb,
  created_at timestamptz default now()
);

create table if not exists public.plans(
  code text primary key,
  price_cents int not null,
  includes_networks int not null,
  value_points int not null,
  quotas jsonb not null
);

create table if not exists public.articles(
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete cascade,
  slug text unique,
  title text, seo_title text, seo_desc text,
  cover_url text,
  body_md text,
  status text check (status in ('draft','published')) default 'published',
  published_at timestamptz default now()
);

create table if not exists public.media(
  id uuid primary key default gen_random_uuid(),
  article_id uuid references public.articles(id) on delete cascade,
  type text check (type in ('image','video')),
  url text not null,
  meta jsonb
);

create table if not exists public.contents(
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references public.brands(id) on delete cascade,
  type text check (type in ('post','story','cover','carousel','video_short')),
  channel text check (channel in ('li','ig','fb','x','tt','yt','pin')),
  status text check (status in ('backlog','scheduled','published','failed')) default 'backlog',
  payload_json jsonb,
  created_at timestamptz default now()
);

create table if not exists public.schedules(
  id uuid primary key default gen_random_uuid(),
  content_id uuid references public.contents(id) on delete cascade,
  channel text check (channel in ('li','ig','fb','x','tt','yt','pin')),
  scheduled_at timestamptz,
  status text check (status in ('scheduled','published','failed')) default 'scheduled',
  postiz_id text
);

create table if not exists public.affiliates(
  id uuid primary key default gen_random_uuid(),
  code text unique,
  clicks int default 0,
  conversions int default 0,
  created_at timestamptz default now()
);

create table if not exists public.events(
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  type text,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists public.profiles(
  user_id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete set null,
  role text check (role in ('client','admin','affiliate')) default 'client'
);

alter table public.tenants enable row level security;
alter table public.brands enable row level security;
alter table public.articles enable row level security;
alter table public.contents enable row level security;
alter table public.schedules enable row level security;

create policy tenants_rw on public.tenants for all
  using (exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.tenant_id = tenants.id));

create policy brands_rw on public.brands for all
  using (exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.tenant_id = brands.tenant_id));

create policy articles_rw on public.articles for all
  using (exists (
    select 1 from public.brands b join public.profiles p on p.tenant_id = b.tenant_id
    where b.id = articles.brand_id and p.user_id = auth.uid()
  ));

create policy contents_rw on public.contents for all
  using (exists (
    select 1 from public.brands b join public.profiles p on p.tenant_id = b.tenant_id
    where b.id = contents.brand_id and p.user_id = auth.uid()
  ));

create policy schedules_rw on public.schedules for all
  using (exists (
    select 1 from public.contents c join public.brands b on b.id = c.brand_id
    join public.profiles p on p.tenant_id = b.tenant_id
    where c.id = schedules.content_id and p.user_id = auth.uid()
  ));
