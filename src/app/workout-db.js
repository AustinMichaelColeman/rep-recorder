import { openDB, deleteDB } from "idb";

const DB_NAME = "workout_db";
const DB_VERSION = 1;
const WORKOUT_STORE_NAME = "workout_logs";
const WORKOUT_INDEX_NAME = "date_index";

// Function to open the database and create the object store
async function openDatabase() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(WORKOUT_STORE_NAME)) {
        const store = db.createObjectStore(WORKOUT_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex(WORKOUT_INDEX_NAME, "date");
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
  db.close();
}

// Function to retrieve all workout logs from the database
export async function getWorkoutLogs() {
  const db = await openDatabase();
  const tx = db.transaction(WORKOUT_STORE_NAME, "readonly");
  const store = tx.objectStore(WORKOUT_STORE_NAME);
  const index = store.index(WORKOUT_INDEX_NAME);

  const workoutLogs = await index.getAll();
  db.close();
  return workoutLogs;
}

// Function to clear all workout logs from the database
export async function clearWorkouts() {
  await deleteDB(DB_NAME, {
    blocked() {
      console.error("Clearing workouts is blocked.");
    },
  });
}
