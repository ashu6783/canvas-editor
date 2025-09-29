import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZzF2ullTCFUoLGtWGhr3WUr2RN9ZW8ag",
  authDomain: "canvas-editor-4f4d6.firebaseapp.com",
  projectId: "canvas-editor-4f4d6",
  storageBucket: "canvas-editor-4f4d6.firebasestorage.app",
  messagingSenderId: "671023402817",
  appId: "1:671023402817:web:1d8717aed159d22f75dbc0",
  measurementId: "G-ZH1GY1PJ33"
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
