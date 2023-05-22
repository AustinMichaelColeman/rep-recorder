"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import ExerciseTypes from "@/components/ExerciseTypes";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  const handleBackClick = () => {
    router.push("/workouts");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderBar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={handleBackClick}
          className="mb-4 inline-flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Workouts
        </button>

        <ExerciseTypes />
      </div>
      <Footer />
    </div>
  );
}
