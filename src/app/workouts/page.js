"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import WorkoutTracker from "@/components/WorkoutTracker";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <WorkoutTracker />
      <Footer />
    </div>
  );
}

export default Page;
