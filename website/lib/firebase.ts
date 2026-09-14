import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "sdischool",
  appId: "1:867557624637:web:98b6a440afc4653eab9354",
  apiKey: "AIzaSyAXB5uztoh3FMaDGnoqR8n4kENMXN0Q8K0",
  authDomain: "sdischool.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-siddharthaintern-20b89128-89d5-404c-b0e6-c6bde80d3553",
  storageBucket: "sdischool.firebasestorage.app",
  messagingSenderId: "867557624637",
  oAuthClientId: "867557624637-41rcibes87l5aoie401oen2esljjhbu8.apps.googleusercontent.com"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export default app;
