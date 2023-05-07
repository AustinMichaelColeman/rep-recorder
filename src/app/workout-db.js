import { openDB } from "idb";

const DB_NAME = "workout_db";
const DB_VERSION = 1;
const WORKOUT_STORE_NAME = "workout_logs";

// Function to open the database and create the object store
async function openDatabase() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(WORKOUT_STORE_NAME)) {
        db.createObjectStore(WORKOUT_STORE_NAME, { autoIncrement: true });
      }
    },
  });

  return db;
}

// Function to add a workout log to the database
export async function addWorkoutLog(workoutLog) {
  const db = await openDatabase();
  const tx = db.transaction(WORKOUT_STORE_NAME, "readwrite");
  const store = tx.objectStore(WORKOUT_STORE_NAME);

  await store.add(workoutLog);
  await tx.done;
}

// Function to retrieve all workout logs from the database
export async function getWorkoutLogs() {
  const db = await openDatabase();
  const tx = db.transaction(WORKOUT_STORE_NAME, "readonly");
  const store = tx.objectStore(WORKOUT_STORE_NAME);

  return store.getAll();
}

// Rest of your code...
