"use client";
import React, { useEffect, useState } from "react";
import { addWorkoutLog, getWorkoutLogs, clearWorkouts } from "./workout-db";
import styles from "./WorkoutTracker.module.css";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [formValues, setFormValues] = useState({
    date: new Date().toISOString().split("T")[0],
    exercise: "",
    weight: 0,
    reps: 0,
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

  const handleWeightIncrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      weight: prevValues.weight + 5,
    }));
  };

  const handleWeightDecrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      weight: prevValues.weight - 5,
    }));
  };

  const handleRepsIncrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      reps: prevValues.reps + 1,
    }));
  };

  const handleRepsDecrement = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      reps: prevValues.reps - 1,
    }));
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
        setFormValues((prevValues) => ({
          ...prevValues,
        }));
        getWorkoutLogs()
          .then((workouts) => setWorkouts(workouts))
          .catch((error) =>
            console.error("Failed to retrieve workout logs:", error)
          );
      })
      .catch((error) => console.error("Failed to add workout log:", error));
  };

  const handleClearLogs = () => {
    clearWorkouts()
      .then(() => {
        setWorkouts([]);
        console.log("Workout logs cleared from the database.");
      })
      .catch((error) => console.error("Failed to clear workout logs:", error));
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
          <select
            name="exercise"
            value={formValues.exercise}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="">Select Exercise</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Dumbell Curl">Squat</option>
            <option value="Leg Press">Deadlift</option>
            <option value="Overhead Press">Overhead Press</option>
          </select>
        </label>
        <label className={styles.label}>
          Weight (lbs):
          <div className={styles.weightControl}>
            <button
              type="button"
              onClick={handleWeightDecrement}
              className={styles.incrementButton}
            >
              -
            </button>
            <input
              type="number"
              name="weight"
              value={formValues.weight}
              onChange={handleInputChange}
              className={styles.input}
              required
              min="1"
            />
            <button
              type="button"
              onClick={handleWeightIncrement}
              className={styles.incrementButton}
            >
              +
            </button>
          </div>
        </label>
        <label className={styles.label}>
          Reps:
          <div className={styles.repsControl}>
            <button
              type="button"
              onClick={handleRepsDecrement}
              className={styles.incrementButton}
            >
              -
            </button>
            <input
              type="number"
              name="reps"
              value={formValues.reps}
              onChange={handleInputChange}
              className={styles.input}
              required
              min="1"
            />
            <button
              type="button"
              onClick={handleRepsIncrement}
              className={styles.incrementButton}
            >
              +
            </button>
          </div>
        </label>
        <button type="submit" className={styles.button}>
          Add Workout Log
        </button>
      </form>
      <button type="button" onClick={handleClearLogs} className={styles.button}>
        Clear Logs
      </button>
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
