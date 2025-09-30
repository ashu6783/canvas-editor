import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save scene to Firestore
export const saveScene = async (id, scene) => {
  await setDoc(doc(db, "scenes", id), { data: scene });
};

// Load scene from Firestore
export const loadScene = async (id) => {
  const snap = await getDoc(doc(db, "scenes", id));
  return snap.exists() ? snap.data().data : null;
};

// Initialize new scene and return ID
export const initializeScene = async () => {
  const newId = crypto.randomUUID();
  await setDoc(doc(db, "scenes", newId), { data: {} });
  return newId;
};
