// lib/firebaseAdmin.js
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../../chat-example-9ea60-firebase-adminsdk-v7lih-cc1e164c55.json' with { type: "json" };

// Check if an app is already initialized; if not, initialize it
let adminApp;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  adminApp = getApp();
}

const adminDb = getFirestore(adminApp);

export { adminDb, FieldValue };
