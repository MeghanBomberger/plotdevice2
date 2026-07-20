-- Allow scenes without a physical location (dreams, menus, abstract interludes).
alter table public.scenes
  alter column location_id drop not null;
