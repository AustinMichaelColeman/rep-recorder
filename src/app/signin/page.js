"use client";
import { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import passwordReset from "@/firebase/auth/passwordReset";
import { useAuthContext } from "@/context/AuthContext";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const { setUser } = useAuthContext();

  const router = useRouter();

  const errorMessages = {
    auth: {
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

    if (result && result.user && result.user.emailVerified) {
      setUser(result.user);
    }

    if (result.user.emailVerified) {
      router.push("/workouts");
    } else {
      router.push("/verify");
    }
  };

  const handlePasswordReset = async () => {
    if (email) {
      const { error } = await passwordReset(email);
      if (!error) {
        setResetEmailSent(true);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderBar />
      <div className="p-10 bg-white dark:bg-gray-800 rounded shadow-lg w-80">
        <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-white">
          Welcome Back! Sign In to Rep Recorder
        </h1>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <form onSubmit={handleForm}>
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
            <p
              onClick={handlePasswordReset}
              className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 hover:underline cursor-pointer"
            >
              Forgot password?
            </p>
            {resetEmailSent && (
              <p className="text-green-500 dark:text-green-400">
                Password reset email sent! Please check your inbox.
              </p>
            )}
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
          <button
            type="submit"
            className="w-full px-3 py-2 mb-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="dark:text-gray-300">{"Don't have an account?"}</p>
          <Link
            href="/signup"
            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
