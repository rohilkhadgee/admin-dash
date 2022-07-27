import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "admin-dash-39658.firebaseapp.com",
  projectId: "admin-dash-39658",
  storageBucket: "admin-dash-39658.appspot.com",
  messagingSenderId: "602101992711",
  appId: "1:602101992711:web:67555402da91daa87009a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
