"use client";
import { useState } from "react";
import NumericControl from "@/components/NumericControl";
import DateInput from "@/components/DateInput";
import ExerciseInput from "@/components/ExerciseInput";
import moment from "moment";
import { useAuthContext } from "@/context/AuthContext";
import addWorkout from "@/firebase/firestore/addWorkout";
import useExerciseTypes from "@/hooks/useExerciseTypes";

const DEFAULT_FORM_VALUES = {
  date: moment().format("YYYY-MM-DD"),
  exerciseValue: "",
  exerciseLabel: "",
  weight: 0,
  reps: 0,
};

const generateWorkoutLogId = (uid) => `${uid}-${Date.now()}`;

export default function WorkoutForm({ setWorkouts }) {
  const { user } = useAuthContext();

  const { exerciseOptions, isLoading, isError } = useExerciseTypes();
  const [formValues, setFormValues] = useState({
    ...DEFAULT_FORM_VALUES,
    exerciseValue:
      exerciseOptions[0]?.value || DEFAULT_FORM_VALUES.exerciseValue,
    exerciseLabel:
      exerciseOptions[0]?.label || DEFAULT_FORM_VALUES.exerciseLabel,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleExerciseSelectChange = (event) => {
    const exerciseValue = event.target.value;
    const selectedExercise = exerciseOptions.find(
      (opt) => opt.value === exerciseValue
    );

    if (selectedExercise) {
      setFormValues((prevValues) => ({
        ...prevValues,
        exerciseValue,
        exerciseLabel: selectedExercise.label,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.log("no user");
      return;
    }

    const workoutLog = {
      id: generateWorkoutLogId(user.uid),
      ...formValues,
      weight: parseFloat(formValues.weight),
      reps: parseInt(formValues.reps),
    };

    setWorkouts((prevWorkouts) => [...prevWorkouts, workoutLog]);

    const { result, error } = await addWorkout(
      user.uid,
      workoutLog.id,
      workoutLog
    );

    if (error) {
      return console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred...</div>;
  }

  return (
    <form
      id="workoutForm"
      name="workoutForm"
      onSubmit={handleSubmit}
      className="flex flex-col items-center"
    >
      <DateInput
        value={formValues.date}
        onChange={handleInputChange}
        name="date"
      />
      <ExerciseInput
        selectedExercise={formValues.exerciseValue}
        exerciseOptions={exerciseOptions}
        handleExerciseSelectChange={handleExerciseSelectChange}
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
    </form>
  );
}
