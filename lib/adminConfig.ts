import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';


let adminApp;
if (!getApps().length) {
  const {
    FIREBASE_ADMIN_PROJECT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY,
  } = process.env;

  if (!FIREBASE_ADMIN_PROJECT_ID || !FIREBASE_ADMIN_CLIENT_EMAIL || !FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error('Missing Firebase admin environment variables.');
  }

  const privateKey = FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n");

  adminApp = initializeApp({
    credential: cert({
      projectId: FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  });
} else {
  adminApp = getApp();
}

// Initialize Firestore with the admin app
const adminDb = getFirestore(adminApp);

export { adminDb, FieldValue };
