import { auth } from "@/firebase/init.js";
import { signOut } from "firebase/auth";

export async function handleSignout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("An error occurred during sign out", error);
  }
}
