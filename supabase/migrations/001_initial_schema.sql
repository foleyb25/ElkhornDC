-- Products table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null default '',
  short_description text not null default '',
  size_tier text not null check (size_tier in ('small', 'medium', 'large', 'x-large')),
  cut_type text not null check (cut_type in ('whole', 'split')),
  chewer_level text not null default '',
  dog_weight_min integer not null default 0,
  dog_weight_max integer not null default 0,
  price_cents integer not null,
  images text[] not null default '{}',
  featured boolean not null default false,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Inquiries table
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text,
  dog_name text not null,
  dog_breed text not null,
  dog_weight_lbs integer not null,
  dog_age text not null,
  chewing_style text not null check (chewing_style in ('light', 'moderate', 'heavy', 'extreme')),
  previous_antler_experience boolean not null default false,
  previous_antler_notes text,
  products_of_interest text,
  quantity integer not null default 1,
  additional_notes text,
  shipping_name text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_zip text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'fulfilled', 'closed')),
  team_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Newsletter signups
create table newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- Contact submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS policies
alter table products enable row level security;
alter table inquiries enable row level security;
alter table newsletter_signups enable row level security;
alter table contact_submissions enable row level security;

-- Products: public read
create policy "Products are viewable by everyone"
  on products for select
  using (true);

-- Inquiries: public insert only
create policy "Anyone can submit an inquiry"
  on inquiries for insert
  with check (true);

-- Newsletter: public insert only
create policy "Anyone can sign up for newsletter"
  on newsletter_signups for insert
  with check (true);

-- Contact: public insert only
create policy "Anyone can submit a contact form"
  on contact_submissions for insert
  with check (true);
