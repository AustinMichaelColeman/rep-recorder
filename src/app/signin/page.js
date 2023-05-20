"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import HeaderBar from "@/components/HeaderBar";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    const { result, error } = await signIn(email, password);

    if (error) {
      console.log(error);
      return setErrorMessage("Incorrect email or password");
    }

    return router.push("/workouts");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-4 h-screen bg-gray-100">
      <HeaderBar />
      <div className="p-10 bg-white rounded shadow-lg w-80">
        <h1 className="mb-6 text-2xl font-semibold text-gray-700">Sign In</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
        <button
          onClick={() => router.push("/signup")}
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Page;
