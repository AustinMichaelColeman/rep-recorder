import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signIn(email, password) {
  let result = null;
  let error = null;
  const auth = getAuth(firebase_app);
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    if (result) {
      if (!result.user.emailVerified) {
        const unverifiedError = new Error("Unverified email");
        unverifiedError.code = "auth/unverified-email";
      }
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}
