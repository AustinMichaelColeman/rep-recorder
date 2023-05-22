import { db } from "@/firebase/init.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

export async function getExerciseTypes(userId) {
  const exerciseTypeCollection = collection(
    db,
    "users",
    userId,
    "exerciseTypes"
  );

  let result = null;
  let error = null;

  try {
    const querySnapshot = await getDocs(exerciseTypeCollection);

    result = querySnapshot.docs.map((doc) => ({
      value: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addExerciseType(user_id, data) {
  let result = null;
  let error = null;

  try {
    const docRef = await addDoc(
      collection(db, "users", user_id, "exerciseTypes"),
      data
    );
    result = { value: docRef.id, ...data };
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function addExerciseTypes(userId, types) {
  const exerciseTypesCollection = collection(
    db,
    `users/${userId}/exerciseTypes`
  );

  const batch = writeBatch(db);

  types.forEach((type) => {
    const newDoc = doc(exerciseTypesCollection, type.value);
    batch.set(newDoc, type);
  });

  await batch.commit();
}

export async function updateExerciseType(user_id, exerciseType_id, data) {
  const batch = writeBatch(db);

  try {
    // First, update the exercise type
    const exerciseTypeRef = doc(
      db,
      "users",
      user_id,
      "exerciseTypes",
      exerciseType_id
    );
    batch.update(exerciseTypeRef, data);

    // Then, get all workouts of this exercise type
    const workoutCollection = collection(db, "users", user_id, "workouts");
    const workoutSnapshot = await getDocs(workoutCollection);

    // Filter workouts by exercise type
    const workoutsToUpdate = workoutSnapshot.docs.filter(
      (workout) => workout.data().exerciseValue === exerciseType_id
    );

    // Update each workout's exerciseLabel to the new exercise label
    workoutsToUpdate.forEach((workout) => {
      const workoutRef = doc(db, "users", user_id, "workouts", workout.id);
      batch.update(workoutRef, { exerciseLabel: data.label });
    });

    // Commit the batch
    await batch.commit();
    return { result: true };
  } catch (e) {
    return { error: e };
  }
}

export async function removeExerciseType(user_id, exerciseType_id) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(
      doc(db, "users", user_id, "exerciseTypes", exerciseType_id)
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
