import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function removeWorkout(user_id, workout_id) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(doc(db, "users", user_id, "workouts", workout_id));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
