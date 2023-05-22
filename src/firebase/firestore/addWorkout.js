import { db } from "@/firebase/init.js";
import { doc, setDoc } from "firebase/firestore";

export default async function addWorkout(user_id, workout_id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(
      doc(db, "users", user_id, "workouts", workout_id),
      data
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
