import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

export async function handleSignout() {
  const auth = getAuth(firebase_app);
  try {
    await signOut(auth);
  } catch (error) {
    console.log("An error occurred during sign out", error);
  }
}
