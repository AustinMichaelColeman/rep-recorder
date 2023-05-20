import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function handleSignout() {
  try {
    await signOut(auth);
  } catch (error) {
    // Error occurred during logout
    console.log("An error occurred during sign out", error);
  }
}
