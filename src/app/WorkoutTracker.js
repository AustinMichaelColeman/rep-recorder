"use client";
import React, { useEffect, useState } from "react";
import { addWorkoutLog, getWorkoutLogs } from "./workout-db";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getWorkoutLogs()
      .then((workouts) => setWorkouts(workouts))
      .catch((error) =>
        console.error("Failed to retrieve workout logs:", error)
      );
  }, []);

  const handleAddWorkoutLog = () => {
    const workoutLog = {
      date: new Date().toISOString().split("T")[0],
      exercise: "New Exercise",
      weight: 0,
      reps: 0,
    };

    addWorkoutLog(workoutLog)
      .then(() => {
        getWorkoutLogs()
          .then((workouts) => setWorkouts(workouts))
          .catch((error) =>
            console.error("Failed to retrieve workout logs:", error)
          );
      })
      .catch((error) => console.error("Failed to add workout log:", error));
  };

  return (
    <div>
      <button onClick={handleAddWorkoutLog}>Add Workout Log</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            {workout.date}: {workout.exercise} - {workout.weight} lbs x{" "}
            {workout.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}
