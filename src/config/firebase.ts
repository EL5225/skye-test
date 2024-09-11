import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const {
  VITE_FIRBASE_STORAGE_BUCKET,
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MESSAGE_SENDER_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
