"use client";
import { useState } from "react";
import NumericControl from "@/components/NumericControl";

import moment from "moment";

export default function WorkoutForm({
  setWorkouts,
  exerciseOptions,
  setExerciseOptions,
}) {
  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exercise: exerciseOptions[0].value,
    weight: 0,
    reps: 0,
  });

  const [workoutId, setworkoutId] = useState(0);

  const handleAddExercise = async () => {
    const exerciseName = prompt("Enter the exercise name:");

    if (exerciseName) {
      const newExercise = { value: exerciseName, label: exerciseName };

      setExerciseOptions((prevOptions) => [...prevOptions, newExercise]);
      setFormValues((prevValues) => ({
        ...prevValues,
        exercise: exerciseName,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const workoutLog = {
      id: workoutId,
      date: formValues.date,
      exercise: formValues.exercise,
      weight: parseFloat(formValues.weight),
      reps: parseInt(formValues.reps),
    };

    setworkoutId(workoutId + 1);

    setFormValues((prevValues) => ({
      ...prevValues,
    }));
    setWorkouts((prevWorkouts) => {
      return [...prevWorkouts, workoutLog];
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="mb-4">
        <label
          htmlFor="date"
          className="mr-2 text-lg text-light-label dark:text-dark-label"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formValues.date}
          onChange={handleInputChange}
          required
          className="border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="exercise"
          className="mr-2 text-lg text-light-label dark:text-dark-label"
        >
          Exercise
        </label>
        <select
          id="exercise"
          name="exercise"
          value={formValues.exercise}
          onChange={handleInputChange}
          required
          className="border rounded p-2"
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
          className="bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded px-4 py-2 ml-2"
        >
          Add Exercise
        </button>
      </div>
      <div className="mb-4">
        <NumericControl
          value={formValues.weight}
          label="Weight (lbs)"
          id="weight"
          name="weight"
          step={5}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <NumericControl
          value={formValues.reps}
          label="Reps"
          id="reps"
          name="reps"
          step={1}
          onChange={handleInputChange}
          className="border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded px-4 py-2"
      >
        Add Workout Log
      </button>
    </form>
  );
}