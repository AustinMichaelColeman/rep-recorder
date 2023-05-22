"use client";
import { useState, useEffect } from "react";
import WorkoutForm from "@/components/WorkoutForm";
import WorkoutList from "@/components/WorkoutList";
import { useAuthContext } from "@/context/AuthContext";
import { getWorkouts } from "@/firebase/firestore/getWorkouts";
import { useRouter } from "next/navigation";

export default function WorkoutTracker() {
  const { user } = useAuthContext();
  const [workouts, setWorkouts] = useState([]);
  const router = useRouter();

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

  const modifyExerciseTypes = () => {
    router.push("/types");
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <button
        onClick={modifyExerciseTypes}
        className="mt-4 mr-4 ml-auto inline-flex items-center text-gray-900 hover:text-blue-700 focus:outline-none"
      >
        Modify Exercise Types
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <WorkoutForm setWorkouts={setWorkouts} />
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
}
