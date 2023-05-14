"use client";
import { useEffect, useState } from "react";
import { getWorkoutLogs, clearWorkouts } from "@/utils/workout-db";
import styles from "@/components/WorkoutTracker.module.css";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import BackupWorkouts from "@/components/BackupWorkouts";

export default function WorkoutTracker() {
  const [exerciseOptions, setExerciseOptions] = useState([
    { value: "", label: "Select Exercise" },
    { value: "Bench Press", label: "Bench Press" },
    { value: "Dumbbell Curl", label: "Dumbbell Curl" },
    { value: "Leg Press", label: "Leg Press" },
    { value: "Overhead Press", label: "Overhead Press" },
  ]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkoutLogs()
      .then((workouts) => setWorkouts(workouts))
      .catch((error) =>
        console.error("Failed to retrieve workout logs:", error)
      );
  }, []);

  const handleClearLogs = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the local data?"
    );

    if (confirmation) {
      try {
        await clearWorkouts();
        setExerciseOptions([
          { value: "", label: "Select Exercise" },
          { value: "Bench Press", label: "Bench Press" },
          { value: "Dumbbell Curl", label: "Dumbbell Curl" },
          { value: "Leg Press", label: "Leg Press" },
          { value: "Overhead Press", label: "Overhead Press" },
        ]);
        updateWorkouts([]);
      } catch (error) {
        console.error("Failed to clear local database:", error);
      }
    }
  };

  const updateWorkouts = (newWorkouts) => {
    setWorkouts(newWorkouts);
  };

  return (
    <div className={styles.container}>
      <WorkoutForm
        updateWorkouts={updateWorkouts}
        exerciseOptions={exerciseOptions}
        setExerciseOptions={setExerciseOptions}
      />
      <BackupWorkouts workouts={workouts} setWorkouts={setWorkouts} />
      <button type="button" onClick={handleClearLogs} className={styles.button}>
        Delete local data
      </button>
      <WorkoutList workouts={workouts} />
    </div>
  );
}
