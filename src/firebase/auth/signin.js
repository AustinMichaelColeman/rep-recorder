import { auth } from "@/firebase/init.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signIn(email, password) {
  let result = null;
  let error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
