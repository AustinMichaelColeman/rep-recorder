"use client";
import { useState, useEffect } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import { useAuthContext } from "@/context/AuthContext";
import { getWorkouts } from "@/firebase/firestore/getWorkouts";

export default function WorkoutTracker() {
  const { user } = useAuthContext();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (user == null) return;

    const fetchWorkouts = async () => {
      const { result, error } = await getWorkouts(user.uid);
      if (error) {
        console.log("Error fetching workouts:", error);
      } else {
        setWorkouts(result);
      }
    };

    fetchWorkouts();
  }, [user]);

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <WorkoutForm setWorkouts={setWorkouts} />
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
}
