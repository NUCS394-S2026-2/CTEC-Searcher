import { connectorConfig } from '@dataconnect/generated';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDataConnect } from 'firebase/data-connect';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abc123def456',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dataConnect = getDataConnect(app, connectorConfig);
