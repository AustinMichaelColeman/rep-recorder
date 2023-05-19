"use client";
import { useState } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";

export default function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);

  return (
    <div>
      <WorkoutForm setWorkouts={setWorkouts} />
      <WorkoutList workouts={workouts} />
    </div>
  );
}
