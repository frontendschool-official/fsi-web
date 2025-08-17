import { z } from 'zod';

/**
 * Define the client‑side environment variables we expect.  These come
 * exclusively from `.env.local` files and should never include secrets.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().default('dev-api-key'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
    .string()
    .default('dev-project.firebaseapp.com'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().default('dev-project-id'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
    .string()
    .default('dev-project.appspot.com'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().default('123456789'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z
    .string()
    .default('1:123456789:web:abcdef123456'),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_ADMIN_ALLOWLIST: z.string().default(''),
});

/**
 * Parse and validate environment variables at runtime.  Throws if any
 * required variables are missing.  Use this object throughout the app.
 */
export const env = clientSchema.parse({
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  NEXT_PUBLIC_ADMIN_ALLOWLIST: process.env.NEXT_PUBLIC_ADMIN_ALLOWLIST,
});

/**
 * Return the list of email addresses that should be granted admin privileges.
 */
export function getAdminAllowlist(): string[] {
  if (!env.NEXT_PUBLIC_ADMIN_ALLOWLIST) return [];
  return env.NEXT_PUBLIC_ADMIN_ALLOWLIST.split(',')
    .map(e => e.trim())
    .filter(Boolean);
}
