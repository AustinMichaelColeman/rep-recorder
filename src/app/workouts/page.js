"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
import WorkoutTracker from "@/components/WorkoutTracker";

function Page() {
  const { user, emailVerified } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      {emailVerified ? (
        <WorkoutTracker />
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-center p-4 border rounded-lg shadow bg-white">
            <h2 className="text-2xl mb-4 font-semibold">
              Email Verification Needed
            </h2>
            <p className="text-lg mb-4">
              To access the Workout Tracker, please verify your email address
              first. Check your inbox for the verification email we sent you.
            </p>
            <p className="text-sm text-gray-500">
              {
                "If you didn't receive the email, please check your spam folder."
              }
            </p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Page;
