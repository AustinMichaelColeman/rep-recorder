"use client";
import { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";

const initialExerciseOptions = [
  { value: "Bench Press", label: "Bench Press" },
  { value: "Dumbbell Curl", label: "Dumbbell Curl" },
  { value: "Leg Press", label: "Leg Press" },
  { value: "Overhead Press", label: "Overhead Press" },
];

export default function WorkoutTracker() {
  const [exerciseOptions, setExerciseOptions] = useState(
    initialExerciseOptions
  );
  const [workouts, setWorkouts] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState(
    initialExerciseOptions[0].value
  );

  const handleClearWorkouts = async () => {
    setExerciseOptions(initialExerciseOptions);
    setWorkouts([]);
    setSelectedExercise(initialExerciseOptions[0].value);
  };

  return (
    <>
      <WorkoutForm
        setWorkouts={setWorkouts}
        exerciseOptions={exerciseOptions}
        setExerciseOptions={setExerciseOptions}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleClearWorkouts}
          className="mt-4 px-4 py-2 bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded "
        >
          Clear Workouts
        </button>
      </div>

      <WorkoutList workouts={workouts} />
    </>
  );
}
