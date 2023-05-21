"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user && user.emailVerified) {
      router.push("/workouts");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-2">Verify your email address</h1>
      <p className="mb-4 text-gray-600">
        {"We've sent you a verification email."}
      </p>
      <p className="mb-4 text-gray-600">
        Please check your inbox and click the link in the email.
      </p>
      <p className="mb-4 text-gray-600">Then Sign In again:</p>
      <Link
        href="/signin"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-200"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
