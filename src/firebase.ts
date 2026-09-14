import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVyX7Fijo3oGRKdL2pVv7ltzQALulOCZ8",
  authDomain: "classroom-equipment-tracker.firebaseapp.com",
  databaseURL: "https://classroom-equipment-tracker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "classroom-equipment-tracker",
  storageBucket: "classroom-equipment-tracker.firebasestorage.app",
  messagingSenderId: "632663258196",
  appId: "1:632663258196:web:2ac80aaca1f1ee8084a9c1",
  measurementId: "G-BQZCCL1XP5",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);