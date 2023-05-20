import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

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
