import { render, screen } from "@testing-library/react";
import WorkoutTracker from "@/components/WorkoutTracker";
import "@testing-library/jest-dom";

import { getWorkouts } from "@/firebase/firestore/getWorkouts";
import { useAuthContext } from "@/context/AuthContext";

// Mocking getWorkouts to provide fake workouts
jest.mock("@/firebase/firestore/getWorkouts", () => ({
  getWorkouts: jest.fn(() => ({
    result: [
      {
        id: "123456",
        date: "2023-05-20",
        exercise: "Bench Press",
        weight: 70,
        reps: 10,
      },
      {
        id: "987485",
        date: "2023-05-21",
        exercise: "Dumbbell Curl",
        weight: 20,
        reps: 7,
      },
    ],
    error: null,
  })),
}));

// Mocking useAuthContext to provide a fake user
jest.mock("@/context/AuthContext", () => ({
  useAuthContext: jest.fn(() => ({
    user: {
      uid: "mockUserID",
    },
  })),
}));

describe("WorkoutTracker", () => {
  it("renders the WorkoutForm and WorkoutList components correctly", async () => {
    render(<WorkoutTracker />);

    const formElement = await screen.findByRole("form");
    expect(formElement).toBeInTheDocument();

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
