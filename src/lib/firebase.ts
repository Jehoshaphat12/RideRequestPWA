import { getApp, getApps, initializeApp } from "@firebase/app"; // <-- Import getApps and getApp
import { initializeAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { getFirestore } from "@firebase/firestore";
import { getFunctions } from "@firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA3PKIlIK1X3Qf6KQRsHYU84PVVx3kuiEM",
  authDomain: "ride-request-560ef.firebaseapp.com",
  projectId: "ride-request-560ef",
  storageBucket: "ride-request-560ef.appspot.com",
  messagingSenderId: "185616930122",
  appId: "1:185616930122:web:6eef967c852fcc28295db3",
  measurementId: "G-BPWEQ597RP",

  // FIX 1: CORRECTED DATABASE URL TO THE API ENDPOINT
  databaseURL: "https://ride-request-560ef-default-rtdb.firebaseio.com" 
};

// FIX 2: Check if app already exists before initializing
export const app: any = !getApps().length ? initializeApp(firebaseConfig) : getApp(); 

export const firebaseApp = app;
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const functions = getFunctions(app, 'europe-west4');