import { db } from "@/firebase/init.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export async function getWorkouts(userId) {
  const workoutCollection = collection(db, "users", userId, "workouts");

  let result = null;
  let error = null;

  try {
    const querySnapshot = await getDocs(workoutCollection);

    result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
