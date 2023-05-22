"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import WorkoutTracker from "@/components/WorkoutTracker";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen  dark:bg-gray-800">
      <HeaderBar />
      <WorkoutTracker />
      <Footer />
    </div>
  );
}
