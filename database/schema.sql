create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('Administrador', 'Funcionário/Equipe', 'Comercial/Atendimento')),
  created_at timestamptz not null default now()
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  document text,
  phone text,
  email text,
  address text,
  internal_notes text,
  created_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  name text not null,
  event_type text not null,
  event_date date not null,
  starts_at time not null,
  ends_at time not null,
  estimated_guests integer not null default 0,
  status text not null check (status in ('Orçamento', 'Pré-reserva', 'Confirmado', 'Realizado', 'Cancelado')),
  contract_responsible text,
  notes text,
  total_amount numeric(12,2) not null default 0,
  entry_amount numeric(12,2) not null default 0,
  paid_amount numeric(12,2) not null default 0,
  payment_method text,
  payment_status text not null check (payment_status in ('Pendente', 'Parcial', 'Pago')),
  next_due_date date,
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  amount numeric(12,2) not null,
  paid_at date,
  due_date date,
  method text,
  status text not null check (status in ('Pendente', 'Pago', 'Atrasado')),
  receipt_url text,
  created_at timestamptz not null default now()
);

create table services (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  active boolean not null default true
);

create table event_services (
  event_id uuid references events(id) on delete cascade,
  service_id uuid references services(id),
  notes text,
  primary key (event_id, service_id)
);

create table checklist_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  updated_by uuid references users(id),
  updated_at timestamptz
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  document_type text not null,
  file_url text not null,
  uploaded_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table agenda_blocks (
  id uuid primary key default gen_random_uuid(),
  block_date date not null,
  starts_at time,
  ends_at time,
  reason text not null,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create unique index no_confirmed_overlap
on events (event_date, starts_at, ends_at)
where status = 'Confirmado';
