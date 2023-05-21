"use client";
import { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const errorMessages = {
    auth: {
      unverifiedEmail: "Please verify your email before signing in.",
      invalidCredentials:
        "Invalid email or password. Please double-check your credentials and try again.",
      userDisabled:
        "This account has been disabled. If you believe this is an error, please contact support.",
      default:
        "An unexpected error occurred. Please try again later. If the problem persists, contact support.",
    },
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return errorMessages.auth.invalidCredentials;
      case "auth/user-disabled":
        return errorMessages.auth.userDisabled;
      case "auth/unverified-email":
        return errorMessages.auth.unverifiedEmail;
      default:
        return errorMessages.auth.default;
    }
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    const { result, error } = await signIn(email, password);

    if (error) {
      const message = getErrorMessage(error.code);
      setErrorMessage(message);
      return;
    }

    return router.push("/workouts");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 h-screen bg-gray-100">
      <HeaderBar />
      <div className="p-10 bg-white rounded shadow-lg w-80">
        <h1 className="mb-6 text-2xl font-semibold text-gray-700">
          Welcome Back! Sign In to Rep Recorder
        </h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <form onSubmit={handleForm}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 mb-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p>{"Don't have an account?"}</p>
          <Link
            href="/signup"
            className="text-indigo-500 hover:text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
