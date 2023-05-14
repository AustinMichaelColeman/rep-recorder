"use client";
import { useState, useEffect } from "react";
import {
  addWorkoutLog,
  getWorkoutLogs,
  addExercise,
  getExercises,
} from "@/utils/workout-db";
import NumericControl from "@/components/NumericControl";

import moment from "moment";
import styles from "@/components/WorkoutForm.module.css";

export default function WorkoutForm({
  updateWorkouts,
  exerciseOptions,
  setExerciseOptions,
}) {
  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exercise: "",
    weight: 0,
    reps: 0,
  });

  const handleAddExercise = async () => {
    const exerciseName = prompt("Enter the exercise name:");

    if (exerciseName) {
      const newExercise = { value: exerciseName, label: exerciseName };
      try {
        await addExercise(newExercise);
        setExerciseOptions((prevOptions) => [...prevOptions, newExercise]);
        setFormValues((prevValues) => ({
          ...prevValues,
          exercise: exerciseName,
        }));
      } catch (error) {
        console.error("Failed to add exercise:", error);
      }
    }
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exercises = await getExercises();

        if (exercises && exercises.length > 0) {
          setExerciseOptions(exercises);
        } else {
          // Load default exercises if there are no existing exercises in the database
          const defaultExercises = [
            { value: "", label: "Select Exercise" },
            { value: "Bench Press", label: "Bench Press" },
            { value: "Dumbbell Curl", label: "Dumbbell Curl" },
            { value: "Leg Press", label: "Leg Press" },
            { value: "Overhead Press", label: "Overhead Press" },
          ];

          setExerciseOptions(defaultExercises);

          for (const exercise of defaultExercises) {
            await addExercise(exercise);
          }
        }
      } catch (error) {
        console.error("Failed to retrieve exercises:", error);
      }
    };

    loadExercises();
  }, [setExerciseOptions]);

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
          {exerciseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddExercise}
          className={styles.addButton}
        >
          Add Exercise
        </button>
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
