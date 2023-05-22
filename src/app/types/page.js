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
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <button onClick={handleBackClick}>← Back to Workouts</button>

      <ExerciseTypes />
      <Footer />
    </div>
  );
}
