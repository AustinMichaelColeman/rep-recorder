import { auth } from "@/firebase/init.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default async function signUp(email, password) {
  let userCredential = null;
  let verificationResult = null;
  let error = null;

  if (auth) {
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        verificationResult = await sendEmailVerification(userCredential.user);
      }
    } catch (e) {
      console.log("signup error", e);
      error = e;
    }
  } else {
    console.log("signup error: Firebase auth is not initialized.");
    error = new Error("Firebase auth is not initialized.");
  }

  return { userCredential, verificationResult, error };
}
