"use client";
import { useState, useEffect } from "react";
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

  const [selectedExercise, setSelectedExercise] = useState(
    initialExerciseOptions[0].value
  );

  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exercise: selectedExercise,
    weight: 0,
    reps: 0,
  });

  const [workoutId, setworkoutId] = useState(0);

  const handleAddExercise = () => {
    const exerciseName = prompt("Enter the exercise name:");

    if (exerciseName) {
      const newExercise = { value: exerciseName, label: exerciseName };

      setExerciseOptions((prevOptions) => [...prevOptions, newExercise]);
      setFormValues((prevValues) => ({
        ...prevValues,
        exercise: exerciseName,
      }));
      setSelectedExercise(newExercise.label);
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

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      exercise: selectedExercise,
    }));
  }, [selectedExercise]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleExerciseSelectChange = (event) => {
    const exercise = event.target.value;
    setSelectedExercise(exercise);
    setFormValues((prevValues) => ({ ...prevValues, exercise: exercise }));
  };

  const handleClearWorkouts = async () => {
    setExerciseOptions(initialExerciseOptions);
    setWorkouts([]);
    setSelectedExercise(initialExerciseOptions[0].value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <DateInput value={formValues.date} onChange={handleInputChange} />
      <ExerciseInput
        selectedExercise={selectedExercise}
        exerciseOptions={exerciseOptions}
        handleExerciseSelectChange={handleExerciseSelectChange}
        handleAddExercise={handleAddExercise}
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
