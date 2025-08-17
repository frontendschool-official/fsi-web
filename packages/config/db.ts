import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from './firebase';
import { getAdminAllowlist } from './env';

export type Theme = 'light' | 'dark';

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
    theme: 'light', // Default theme
  });
}

/**
 * Get the user's theme preference from Firebase
 */
export async function getUserTheme(user: User | null): Promise<Theme> {
  if (!user) return 'light';

  try {
    const ref = doc(db(), 'users', user.uid);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return (data.theme as Theme) || 'light';
    }

    return 'light';
  } catch (error) {
    console.error('Error getting user theme:', error);
    return 'light';
  }
}

/**
 * Update the user's theme preference in Firebase
 */
export async function updateUserTheme(
  user: User | null,
  theme: Theme
): Promise<void> {
  if (!user) return;

  try {
    const ref = doc(db(), 'users', user.uid);
    await updateDoc(ref, {
      theme,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user theme:', error);
  }
}
