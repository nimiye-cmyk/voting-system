import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUQr_b3EXbGBmR0W8qjyNWIFlSQjBjLPQ",
  authDomain: "voting-system-1af4a.firebaseapp.com",
  projectId: "voting-system-1af4a",
  storageBucket: "voting-system-1af4a.firebasestorage.app",
  messagingSenderId: "337983702263",
  appId: "1:337983702263:web:19ca3571e06a4b6166fff2"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
