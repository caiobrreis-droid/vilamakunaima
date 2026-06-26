create table if not exists app_state (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists app_documents (
  id bigserial primary key,
  event_id text not null,
  file_name text not null,
  doc_type text not null default 'Documento',
  content_type text not null default 'application/pdf',
  data bytea not null,
  created_at timestamptz not null default now(),
  unique(event_id, file_name)
);

create index if not exists app_documents_event_id_idx
on app_documents(event_id);

create table if not exists app_users (
  id bigserial primary key,
  name text not null,
  email text not null unique,
  role text not null,
  password_hash text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists app_events (
  id text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
