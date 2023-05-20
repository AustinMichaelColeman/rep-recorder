"use client";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user !== null) {
      router.push("/workouts");
    }
  }, [user, router]);

  return (
    <main className="items-center flex flex-col  min-h-screen">
      <HeaderBar />
      <div className="flex flex-col space-y-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out w-40"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out w-40"
          onClick={() => router.push("/signin")}
        >
          Sign in
        </button>
      </div>
      <Footer />
    </main>
  );
}
