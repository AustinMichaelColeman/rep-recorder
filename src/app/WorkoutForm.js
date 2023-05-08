"use client";
import { useState } from "react";
import { addWorkoutLog, getWorkoutLogs } from "./workout-db";
import NumericControl from "./NumericControl";

import moment from "moment";
import styles from "./WorkoutForm.module.css";

export default function WorkoutForm({ updateWorkouts }) {
  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exercise: "",
    weight: 0,
    reps: 0,
  });

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
          .then((workouts) => updateWorkouts(workouts))
          .catch((error) =>
            console.error("Failed to retrieve workout logs:", error)
          );
      })
      .catch((error) => console.error("Failed to add workout log:", error));
  };

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

  const handleLabelClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      event.preventDefault();
    }
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

  return (
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
          <option value="Dumbell Curl">Dumbell Curl</option>
          <option value="Leg Press">Leg Press</option>
          <option value="Overhead Press">Overhead Press</option>
        </select>
      </label>
      <NumericControl
        label="Weight (lbs)"
        value={formValues.weight}
        name="weight"
        step={5}
        onChange={handleInputChange}
      />
      <NumericControl
        label="Reps"
        value={formValues.reps}
        name="reps"
        step={1}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.button}>
        Add Workout Log
      </button>
    </form>
  );
}
