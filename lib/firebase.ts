// lib/firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8bSFba2Sn8n3jR6JCBFNkZKP1pzIdzKg",
  authDomain: "arenatest-2d5f1.firebaseapp.com",
  projectId: "arenatest-2d5f1",
  storageBucket: "arenatest-2d5f1.firebasestorage.app",
  messagingSenderId: "2807823320",
  appId: "1:2807823320:web:209f3cbae32ed79040d0ad",
  // measurementId: "G-5Y3JP7MHH6" // NE treba za RN, ignoriši
};

// Sprečava duplo inicijalizovanje
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth
export const auth = getAuth(app);
