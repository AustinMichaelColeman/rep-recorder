"use client";
import { useState, useEffect } from "react";
import NumericControl from "@/components/NumericControl";
import DateInput from "@/components/DateInput";
import ExerciseInput from "@/components/ExerciseInput";
import moment from "moment";
import { useAuthContext } from "@/context/AuthContext";
import addWorkout from "@/firebase/firestore/addWorkout";
import defaultExerciseTypes from "@/data/defaultExerciseTypes";
import { useRouter } from "next/navigation";
import { getExerciseTypes } from "@/firebase/firestore/exerciseTypes"; // import the function to fetch exercise types

export default function WorkoutForm({ setWorkouts }) {
  const { user } = useAuthContext();

  const router = useRouter();

  const [exerciseOptions, setExerciseOptions] = useState(defaultExerciseTypes);
  const [formValues, setFormValues] = useState({
    date: moment().format("YYYY-MM-DD"),
    exerciseValue: defaultExerciseTypes[0].value,
    exerciseLabel: defaultExerciseTypes[0].label,
    weight: 0,
    reps: 0,
  });
  const [workoutId, setworkoutId] = useState(0);

  useEffect(() => {
    if (user !== null) {
      getExerciseTypes(user.uid).then(({ result }) => {
        if (result.length > 0) {
          const options = result.map((exerciseType) => ({
            value: exerciseType.value,
            label: exerciseType.label,
          }));
          setExerciseOptions(options);
          setFormValues((prevValues) => ({
            ...prevValues,
            exerciseValue: options[0].value,
            exerciseLabel: options[0].label,
          }));
        }
      });
    }
  }, [user]);

  const handleAddExercise = () => {
    router.push("/types");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleExerciseSelectChange = (event) => {
    const exerciseValue = event.target.value;
    const exerciseLabel = exerciseOptions.find(
      (opt) => opt.value === exerciseValue
    ).label;
    setFormValues((prevValues) => ({
      ...prevValues,
      exerciseValue,
      exerciseLabel,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workoutLog = {
      id: `${user.uid}-${Date.now()}`,
      ...formValues,
      weight: parseFloat(formValues.weight),
      reps: parseInt(formValues.reps),
    };

    setworkoutId(workoutId + 1);
    setWorkouts((prevWorkouts) => [...prevWorkouts, workoutLog]);

    if (user !== null) {
      const { result, error } = await addWorkout(
        user.uid,
        workoutLog.id,
        workoutLog
      );

      if (error) {
        return console.log(error);
      }
    } else {
      console.log("no user");
    }
  };

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
    </form>
  );
}
