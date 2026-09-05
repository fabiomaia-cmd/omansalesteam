create table if not exists public.price_records (
  id uuid primary key,
  date date not null,
  manufacturer text not null,
  collector text not null,
  channel text not null,
  city text,
  country text not null,
  currency text not null,
  retailer text not null,
  protein text not null,
  temperature text not null,
  product text not null,
  sub_product text,
  package_weight_kg numeric,
  package_price numeric,
  price_kg numeric,
  price_usd_kg numeric,
  margin_pct numeric,
  industry_price numeric,
  manual_industry_price boolean default false,
  promotion boolean default false,
  full_price numeric,
  promo_pack boolean default false,
  combo_qty numeric,
  combo_unit_weight numeric,
  combo_total_price numeric,
  created_at timestamptz not null default now()
);

alter table public.price_records enable row level security;

create policy "Public can read price records"
  on public.price_records for select to anon using (true);

create policy "Public can insert price records"
  on public.price_records for insert to anon with check (true);

create policy "Public can update price records"
  on public.price_records for update to anon using (true) with check (true);

create policy "Public can delete price records"
  on public.price_records for delete to anon using (true);
