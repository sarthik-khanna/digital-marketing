// Creates the tables in Neon, the starter blog articles, and any admins listed in
// ADMIN_EMAILS that don't exist yet.
// Safe to re-run. Usage: npm run db:setup   (reads .env.local)
import { neon } from "@neondatabase/serverless";
import { seedPosts } from "../src/lib/blog-seed.ts";
import { unsplashImage } from "../src/lib/cover-image.ts";
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
  `create table if not exists blog_posts (
    id bigint generated always as identity primary key,
    slug text not null unique,
    title text not null,
    excerpt text not null,
    category text not null,
    content text not null,
    author text not null default 'Tech Digital Marketer team',
    cover_image text,
    published boolean not null default false,
    published_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create index if not exists blog_posts_published_idx on blog_posts (published, published_at desc)`,
  // Added after the first release; harmless when the column already exists.
  `alter table blog_posts add column if not exists cover_image text`,
  // Invoices: numbered per Indian financial year when first sent (TDM/2026-27/0001).
  `create table if not exists invoice_counters (
    fy text primary key,
    last integer not null
  )`,
  `create table if not exists invoices (
    id bigint generated always as identity primary key,
    number text unique,
    status text not null default 'draft' check (status in ('draft', 'sent', 'paid')),
    lead_id bigint references leads (id) on delete set null,
    client_name text not null,
    client_email text not null,
    client_phone text,
    client_company text,
    client_address text,
    client_gstin text,
    issue_date date,
    due_date date,
    due_days integer not null default 7,
    items jsonb not null,
    tax_rate numeric(5, 2) not null default 0,
    notes text,
    subtotal bigint not null,
    tax bigint not null,
    total bigint not null,
    view_token_hash text unique,
    sent_at timestamptz,
    paid_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create index if not exists invoices_created_at_idx on invoices (created_at desc)`,
];

for (const statement of schema) await sql.query(statement);
console.log(
  "Tables ready: leads, callback_requests, audit_requests, admins, admin_sessions, password_resets, blog_posts, invoices, invoice_counters",
);

// Starter articles: inserted once, matched by slug, never overwritten (edit them at /admin/blog).
let seeded = 0;
for (const post of seedPosts) {
  const rows = await sql`
    insert into blog_posts (slug, title, excerpt, category, content, cover_image, published, published_at, updated_at)
    values (${post.slug}, ${post.title}, ${post.excerpt}, ${post.category}, ${post.content}, ${unsplashImage(post.cover)}, true, ${post.publishedAt}, ${post.publishedAt})
    on conflict (slug) do nothing
    returning id
  `;
  seeded += rows.length;
}
console.log(`Blog: ${seeded} starter article(s) added, ${seedPosts.length - seeded} already present.`);

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
