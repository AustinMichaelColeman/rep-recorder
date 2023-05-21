import firebase_app from "../config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

export default async function signUp(email, password) {
  const auth = getAuth(firebase_app);

  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      await sendEmailVerification(auth.currentUser);
    }
  } catch (e) {
    console.log("signup error", e);
    error = e;
  }

  return { result, error };
}
