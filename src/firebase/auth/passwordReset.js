import { auth } from "@/firebase/init.js";
import { sendPasswordResetEmail } from "firebase/auth";

export default async function passwordReset(email) {
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
