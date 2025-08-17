import { getApps, initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from './env';

const firebaseConfig: FirebaseOptions = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Ensure that the Firebase app is initialised exactly once.  Firebase
 * enforces a singleton pattern by throwing if you attempt to initialise
 * more than one app with the same configuration.
 */
export function getFirebaseApp() {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

/**
 * Get the Firebase Auth instance associated with our singleton app.
 */
export function auth() {
  return getAuth(getFirebaseApp());
}

/**
 * Get the Firestore instance associated with our singleton app.
 */
export function db() {
  return getFirestore(getFirebaseApp());
}
