"use client";
import React, { useEffect, useState } from "react";
import { addWorkoutLog, getWorkoutLogs } from "./workout-db";
import styles from "./WorkoutTracker.module.css";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [formValues, setFormValues] = useState({
    date: "",
    exercise: "",
    weight: "",
    reps: "",
  });

  useEffect(() => {
    getWorkoutLogs()
      .then((workouts) => setWorkouts(workouts))
      .catch((error) =>
        console.error("Failed to retrieve workout logs:", error)
      );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const workoutLog = {
      date: formValues.date,
      exercise: formValues.exercise,
      weight: parseFloat(formValues.weight),
      reps: parseInt(formValues.reps),
    };

    addWorkoutLog(workoutLog)
      .then(() => {
        setFormValues({
          date: "",
          exercise: "",
          weight: "",
          reps: "",
        });
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Date:
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Exercise:
          <input
            type="text"
            name="exercise"
            value={formValues.exercise}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Weight (lbs):
          <input
            type="number"
            name="weight"
            value={formValues.weight}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Reps:
          <input
            type="number"
            name="reps"
            value={formValues.reps}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Workout Log
        </button>
      </form>
      <ul className={styles.workoutList}>
        {workouts.map((workout, index) => (
          <li key={index} className={styles.workoutItem}>
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
