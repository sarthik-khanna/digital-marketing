// Creates an admin with a password you choose (or sets a new password for an existing one).
// Usage:  npm run admin:add -- name@example.com            (create)
//         npm run admin:add -- name@example.com --update   (set a new password)
// The password is typed at a hidden prompt, so it never lands in your shell history.
// Reads DATABASE_URL from .env.local.
import { neon } from "@neondatabase/serverless";
import { hashPassword } from "../src/lib/password.ts";

const MIN_PASSWORD_LENGTH = 10; // same rule as the reset-password form
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const args = process.argv.slice(2);
const update = args.includes("--update");
const email = (args.find((arg) => !arg.startsWith("--")) ?? "").trim().toLowerCase();

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!emailPattern.test(email)) {
  fail("Usage: npm run admin:add -- name@example.com [--update]");
}
if (!process.env.DATABASE_URL) {
  fail("DATABASE_URL is not set. Add your Neon connection string to .env.local.");
}
if (!process.stdin.isTTY) {
  fail("Run this in a terminal: it asks for the password at a hidden prompt.");
}

/** Reads one line from the terminal without echoing it. */
function askHidden(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    let value = "";
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    const finish = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.off("data", onData);
      process.stdout.write("\n");
    };
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          finish();
          resolve(value);
          return;
        }
        if (char === "\u0003") {
          finish();
          process.exit(130); // Ctrl+C
        }
        if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
        else value += char;
      }
    };
    process.stdin.on("data", onData);
  });
}

const sql = neon(process.env.DATABASE_URL);
const [existing] = await sql`select id from admins where email = ${email}`;

if (existing && !update) {
  fail(`${email} is already an admin. To give them a new password, run again with --update.`);
}
if (!existing && update) {
  fail(`${email} is not an admin yet. Run without --update to create the account.`);
}

console.log(existing ? `Setting a new password for ${email}` : `Creating admin ${email}`);
const password = await askHidden(`Password (at least ${MIN_PASSWORD_LENGTH} characters): `);
if (password.length < MIN_PASSWORD_LENGTH) {
  fail(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
}
const confirm = await askHidden("Type it again: ");
if (confirm !== password) {
  fail("The two passwords don't match. Nothing was changed.");
}

const hash = await hashPassword(password);
if (existing) {
  await sql`update admins set password_hash = ${hash} where id = ${existing.id}`;
  // Anyone signed in with the old password is signed out.
  await sql`delete from admin_sessions where admin_id = ${existing.id}`;
  console.log(`Password updated for ${email}. Existing logins were signed out.`);
} else {
  await sql`insert into admins (email, password_hash) values (${email}, ${hash})`;
  console.log(`Admin created. ${email} can sign in at /admin/login now.`);
}
