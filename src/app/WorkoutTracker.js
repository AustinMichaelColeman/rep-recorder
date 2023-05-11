"use client";
import { useEffect, useState } from "react";
import { getWorkoutLogs, clearWorkouts } from "./workout-db";
import styles from "./WorkoutTracker.module.css";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import BackupWorkouts from "./BackupWorkouts";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkoutLogs()
      .then((workouts) => setWorkouts(workouts))
      .catch((error) =>
        console.error("Failed to retrieve workout logs:", error)
      );
  }, []);

  const handleClearLogs = () => {
    clearWorkouts()
      .then(() => {
        setWorkouts([]);
        console.log("Workout logs cleared from the database.");
      })
      .catch((error) => console.error("Failed to clear workout logs:", error));
  };

  const updateWorkouts = (newWorkouts) => {
    setWorkouts(newWorkouts);
  };

  return (
    <div className={styles.container}>
      <WorkoutForm updateWorkouts={updateWorkouts} />
      <BackupWorkouts workouts={workouts} setWorkouts={setWorkouts} />
      <button type="button" onClick={handleClearLogs} className={styles.button}>
        Clear Logs
      </button>
      <WorkoutList workouts={workouts} />
    </div>
  );
}
