'use client';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { ensureUserDocument } from './db';

/**
 * Initiate a sign‑in flow using the Google provider.  On success we
 * automatically call `ensureUserDocument` to persist the user in
 * Firestore.
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth(), provider);
  await ensureUserDocument(result.user);
  return result;
}

/**
 * Sign the current user out of Firebase Auth.
 */
export function signOut(): Promise<void> {
  return fbSignOut(auth());
}

/**
 * Subscribe to the Firebase Auth user.  Provides both the user and a
 * loading flag indicating whether the initial auth state is resolved.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), u => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
