"use client";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user !== null) {
      router.push("/workouts");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <HeaderBar />
      <div className="text-center p-6 space-y-2 dark:text-gray-300">
        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-lg transition-all duration-200 ease-in-out"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
          <button
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-lg transition-all duration-200 ease-in-out"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
          Features
        </h1>
        <div className="my-2 max-w-lg">
          <h2 className="text-lg text-gray-700 dark:text-gray-200 mb-1">
            Exercise Logs
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-5 z-10 rounded-md"></div>
            <Image
              src="/exerciseLogs.png"
              alt="Exercise Logs"
              width={759}
              height={339}
              priority={true}
              className="rounded-md"
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-1">
            Screenshot of exercise logs
          </p>
        </div>
        <div className="my-2 max-w-lg">
          <h2 className="text-lg text-gray-700 dark:text-gray-200 mb-1">
            Customizable Exercise Types
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-5 z-10 rounded-md"></div>
            <Image
              src="/exerciseTypes.png"
              alt="Exercise Types"
              width={690}
              height={370}
              priority={true}
              className="rounded-md"
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-1">
            Screenshot of customizable exercise types
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
