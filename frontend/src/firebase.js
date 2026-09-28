import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const keys = ['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_STORAGE_BUCKET','VITE_FIREBASE_APP_ID'];
const config = Object.fromEntries(keys.map((key) => [key.replace('VITE_FIREBASE_', '').toLowerCase().replace('storage_bucket','storageBucket').replace('auth_domain','authDomain').replace('project_id','projectId').replace('api_key','apiKey').replace('app_id','appId'), import.meta.env[key]]));
export const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
export const firebaseReady = useEmulators || keys.every((key) => Boolean(import.meta.env[key]));
if (useEmulators) {
  Object.assign(config, { apiKey: 'demo-api-key', authDomain: 'localhost', projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-assignment-portal', storageBucket: 'demo-assignment-portal.firebasestorage.app', appId: 'demo-app-id' });
}
const app = firebaseReady ? initializeApp(config) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
if (useEmulators && auth && db && storage) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}
