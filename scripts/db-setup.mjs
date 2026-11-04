// Creates the tables in Neon and any admins listed in ADMIN_EMAILS that don't exist yet.
// Safe to re-run. Usage: npm run db:setup   (reads .env.local)
import { neon } from "@neondatabase/serverless";
import { generatePassword, hashPassword } from "../src/lib/password.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add your Neon connection string to .env.local.");
  process.exit(1);
}
const sql = neon(url);

const schema = [
  `create table if not exists leads (
    id bigint generated always as identity primary key,
    name text not null,
    email text not null,
    phone text not null,
    location text not null,
    company text,
    interest text,
    budget text,
    message text not null,
    created_at timestamptz not null default now()
  )`,
  `create index if not exists leads_created_at_idx on leads (created_at desc)`,
  `create table if not exists callback_requests (
    id bigint generated always as identity primary key,
    name text not null,
    phone text not null,
    email text not null,
    source text not null,
    page text,
    created_at timestamptz not null default now()
  )`,
  `create index if not exists callback_requests_created_at_idx on callback_requests (created_at desc)`,
  `create table if not exists audit_requests (
    id bigint generated always as identity primary key,
    name text,
    phone text,
    email text not null,
    website text,
    service text not null,
    form text not null,
    page text,
    created_at timestamptz not null default now()
  )`,
  `create index if not exists audit_requests_created_at_idx on audit_requests (created_at desc)`,
  `create table if not exists admins (
    id bigint generated always as identity primary key,
    email text not null unique,
    password_hash text not null,
    created_at timestamptz not null default now()
  )`,
  `create table if not exists admin_sessions (
    token_hash text primary key,
    admin_id bigint not null references admins (id) on delete cascade,
    expires_at timestamptz not null
  )`,
  `create index if not exists admin_sessions_admin_id_idx on admin_sessions (admin_id)`,
  `create table if not exists password_resets (
    token_hash text primary key,
    admin_id bigint not null references admins (id) on delete cascade,
    expires_at timestamptz not null,
    used_at timestamptz
  )`,
];

for (const statement of schema) await sql.query(statement);
console.log("Tables ready: leads, callback_requests, audit_requests, admins, admin_sessions, password_resets");

const emails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

if (emails.length === 0) {
  console.log("No ADMIN_EMAILS set, so no admins were created.");
}

for (const email of emails) {
  const password = generatePassword();
  const rows = await sql`
    insert into admins (email, password_hash)
    values (${email}, ${await hashPassword(password)})
    on conflict (email) do nothing
    returning id
  `;
  if (rows.length > 0) {
    console.log(`Created admin ${email}  password: ${password}`);
  } else {
    console.log(`Admin ${email} already exists (unchanged)`);
  }
}

if (emails.length > 0) {
  console.log("\nPasswords are shown once. Admins can change theirs with \"Forgot password\" on /admin/login.");
}
