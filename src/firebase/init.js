"use client";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase_app from "@/firebase/config";

let auth = null;
let db = null;

if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  try {
    auth = getAuth(firebase_app);
    db = getFirestore(firebase_app);
  } catch (error) {
    console.error(
      "Firebase couldn't be initialized. Please check your Firebase credentials."
    );
  }
}

export { auth, db };
