import firebase_app from "../config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default async function passwordReset(email) {
  const auth = getAuth(firebase_app);

  let result = null;
  let error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
  } catch (e) {
    console.log("password reset error", e);
    error = e;
  }

  return { result, error };
}
