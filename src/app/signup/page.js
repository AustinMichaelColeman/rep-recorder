"use client";
import { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";
import Link from "next/link";

const errorMessages = {
  "auth/invalid-email": "Please enter a valid email.",
  "auth/email-already-in-use":
    "This email is already registered. Please use a different email or sign in.",
  "auth/operation-not-allowed":
    "Sign up with email and password is currently not allowed. Please try again later or contact support.",
  "auth/weak-password":
    "Your password is too weak. Please enter a stronger password.",
};
const defaultErrorMessage =
  "An unknown error occurred. Please try again later.";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    const { result, error } = await signUp(email, password);

    if (error) {
      const message = errorMessages[error.code] || defaultErrorMessage;
      setErrorMessage(message);
      return;
    }

    router.push("/verify");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderBar />
      <div className="p-10 bg-white dark:bg-gray-800 rounded shadow-lg w-80">
        <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-white">
          Get Started: Sign Up for Rep Recorder
        </h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-3 py-2 placeholder-gray-300 dark:placeholder-gray-700 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 placeholder-gray-300 dark:placeholder-gray-700 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
            />
          </div>
          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <Link href="/privacy" className="underline">
              privacy policy
            </Link>{" "}
            and our{" "}
            <Link href="/terms" className="underline">
              terms and conditions
            </Link>
            .
          </p>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-indigo-500 dark:bg-indigo-400 rounded-md hover:bg-indigo-600 dark:hover:bg-indigo-500"
          >
            Sign up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="dark:text-gray-300">Already have an account?</p>
          <Link
            href="/signin"
            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 hover:underline"
          >
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}
