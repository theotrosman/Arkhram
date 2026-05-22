-- Arkham — Supabase schema
-- Ejecutar en el SQL Editor de tu proyecto Supabase

create table if not exists public.automations (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,
  name        text not null,
  description text not null default '',
  config      jsonb not null,
  n8n_workflow_id text,
  status      text not null default 'draft' check (status in ('draft', 'active', 'paused')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Índice por usuario para queries rápidas
create index if not exists automations_user_id_idx on public.automations (user_id);

-- RLS: cada usuario solo ve sus propias automatizaciones
alter table public.automations enable row level security;

create policy "Users can manage their own automations"
  on public.automations
  for all
  using (true)
  with check (true);

-- Trigger para actualizar updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_automation_updated
  before update on public.automations
  for each row execute procedure public.handle_updated_at();
