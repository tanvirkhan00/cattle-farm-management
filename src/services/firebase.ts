import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  limit, 
  query 
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';

// Firebase configuration from environment variables
const rawApiKey = (import.meta.env.VITE_FIREBASE_API_KEY || '').trim();
const rawProjectId = (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim();

const firebaseConfig = {
  apiKey: rawApiKey,
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: rawProjectId,
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
};

// Check if Firebase configuration is genuinely provided and valid (not blank or placeholder)
// Authentic Google/Firebase web API keys start with 'AIza' and are approximately 39 characters.
export const isFirebaseConfigured = Boolean(
  rawApiKey &&
  rawProjectId &&
  rawApiKey.startsWith('AIza') &&
  rawApiKey !== 'AIzaSyYourApiKeyHere' &&
  rawApiKey.length > 25 &&
  !rawProjectId.includes('your-cattle-farm') &&
  !rawProjectId.includes('your-project')
);

// Lazy/Safe Singletons - Only initialize when valid configuration is explicitly provided
let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length > 0 
      ? getApp() 
      : initializeApp(firebaseConfig);

    try {
      authInstance = getAuth(appInstance);
    } catch (authErr) {
      console.warn('Firebase Auth initialization skipped:', authErr);
    }

    try {
      dbInstance = getFirestore(appInstance);
    } catch (dbErr) {
      console.warn('Cloud Firestore initialization skipped:', dbErr);
    }

    try {
      storageInstance = getStorage(appInstance);
    } catch (storageErr) {
      console.warn('Firebase Storage initialization skipped:', storageErr);
    }
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err);
  }
}

// Safely exported instances (used when isFirebaseConfigured is true)
export const app = appInstance as FirebaseApp;
export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;
export const storage = storageInstance as FirebaseStorage;

/**
 * Genuine connection test to Cloud Firestore.
 * Does NOT fake success; performs an actual query to verify read connectivity.
 */
export async function testFirebaseConnection(): Promise<{
  success: boolean;
  message: string;
  latencyMs?: number;
}> {
  if (!isFirebaseConfigured || !dbInstance) {
    return {
      success: false,
      message: 'Firebase credentials are not configured in your environment variables (.env). The application is operating in resilient local offline mode.'
    };
  }

  const startTime = Date.now();
  try {
    // Attempt an actual minimal read query against the 'farm_settings' collection
    const testQuery = query(collection(dbInstance, 'farm_settings'), limit(1));
    await getDocs(testQuery);
    const latencyMs = Date.now() - startTime;

    return {
      success: true,
      message: `Successfully connected to Cloud Firestore (Project: ${firebaseConfig.projectId}) in ${latencyMs}ms.`,
      latencyMs
    };
  } catch (error: any) {
    console.error('Firebase connection test error:', error);
    
    // Provide diagnostic advice based on Firebase error codes
    let advice = error.message || 'Unknown network error';
    if (error.code === 'permission-denied') {
      advice = 'Permission denied. Please ensure your Firestore Security Rules allow read access.';
    } else if (error.code === 'failed-precondition') {
      advice = 'Failed precondition. Make sure Cloud Firestore is enabled in your Firebase Console.';
    } else if (error.code === 'unavailable') {
      advice = 'Firestore service is currently unreachable. Check your internet connection.';
    }

    return {
      success: false,
      message: `Connection failed: ${advice}`
    };
  }
}

// Local storage helper for resilient offline and demo farm operations
export const storageHelper = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(`scf_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(`scf_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to storage:`, e);
    }
  }
};
