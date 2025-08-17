import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';
import { getAdminAllowlist } from './env';

/**
 * Determine whether the given email belongs to the admin allowlist.  Emails
 * are compared case‑insensitively.
 */
export function isAdmin(email: string): boolean {
  const allowlist = getAdminAllowlist();
  return allowlist.some(
    allowed => allowed.toLowerCase() === email.toLowerCase()
  );
}

/**
 * Ensure that a Firestore user document exists for the given Firebase Auth
 * user.  When the user logs in for the first time, we create a
 * `users/{uid}` record containing their basic profile information and a
 * computed `role` property (either `admin` or `user`).
 */
export async function ensureUserDocument(user: User | null): Promise<void> {
  if (!user) return;
  const { uid, email, displayName, photoURL } = user;
  const ref = doc(db(), 'users', uid);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    return;
  }
  await setDoc(ref, {
    uid,
    email,
    displayName,
    photoURL,
    createdAt: serverTimestamp(),
    role: email && isAdmin(email) ? 'admin' : 'user',
  });
}
