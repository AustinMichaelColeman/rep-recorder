"use client";
import { useEffect, useState } from "react";
import { getWorkoutLogs, clearWorkouts } from "./workout-db";
import styles from "./WorkoutTracker.module.css";
import WorkoutForm from "./WorkoutForm";

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
      <button type="button" onClick={handleClearLogs} className={styles.button}>
        Clear Logs
      </button>
      <ul className={styles.workoutList}>
        {workouts.map((workout) => (
          <li key={workout.id} className={styles.workoutItem}>
            <span className={styles.workoutDate}>{workout.date}</span>
            <span className={styles.workoutDetails}>
              {workout.exercise} - {workout.weight} lbs x {workout.reps}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
