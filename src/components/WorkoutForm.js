"use client";
import { useState } from "react";
import NumericControl from "@/components/NumericControl";
import DateInput from "@/components/DateInput";
import ExerciseInput from "@/components/ExerciseInput";
import moment from "moment";

const initialExerciseOptions = [
  { value: "Bench Press", label: "Bench Press" },
  { value: "Dumbbell Curl", label: "Dumbbell Curl" },
  { value: "Leg Press", label: "Leg Press" },
  { value: "Overhead Press", label: "Overhead Press" },
];

export default function WorkoutForm({ setWorkouts }) {
  const [exerciseOptions, setExerciseOptions] = useState(
    initialExerciseOptions
  );
  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exercise: initialExerciseOptions[0].value,
    weight: 0,
    reps: 0,
  });
  const [workoutId, setworkoutId] = useState(0);

  const handleAddExercise = () => {
    const exerciseName = prompt("Enter the exercise name:");
    if (!exerciseName) return;

    const newExercise = { value: exerciseName, label: exerciseName };
    setExerciseOptions((prevOptions) => [...prevOptions, newExercise]);
    setFormValues((prevValues) => ({
      ...prevValues,
      exercise: exerciseName,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleExerciseSelectChange = (event) => {
    const exercise = event.target.value;
    setFormValues((prevValues) => ({ ...prevValues, exercise }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const workoutLog = {
      id: workoutId,
      ...formValues,
      weight: parseFloat(formValues.weight),
      reps: parseInt(formValues.reps),
    };

    setworkoutId(workoutId + 1);
    setWorkouts((prevWorkouts) => [...prevWorkouts, workoutLog]);
  };

  const handleClearWorkouts = async () => {
    setExerciseOptions(initialExerciseOptions);
    setWorkouts([]);
    setFormValues((prevValues) => ({
      ...prevValues,
      exercise: initialExerciseOptions[0].value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <DateInput
        value={formValues.date}
        onChange={handleInputChange}
        name="date"
      />
      <ExerciseInput
        selectedExercise={formValues.exercise}
        exerciseOptions={exerciseOptions}
        handleExerciseSelectChange={handleExerciseSelectChange}
        handleAddExercise={handleAddExercise}
        name="exercise"
      />
      <NumericControl
        value={formValues.weight}
        label="Weight (lbs)"
        id="weight"
        name="weight"
        step={5}
        onChange={handleInputChange}
        className="border rounded p-2"
      />
      <NumericControl
        value={formValues.reps}
        label="Reps"
        id="reps"
        name="reps"
        step={1}
        onChange={handleInputChange}
        className="border rounded p-2"
      />
      <button
        type="submit"
        className="bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded px-4 py-2"
      >
        Add Workout Log
      </button>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleClearWorkouts}
          className="mt-4 px-4 py-2 bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded "
        >
          Clear Workouts
        </button>
      </div>
    </form>
  );
}
