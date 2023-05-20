import { render, screen } from "@testing-library/react";
import WorkoutForm from "@/components/WorkoutForm";
import "@testing-library/jest-dom";
import { addWorkout } from "@/firebase/firestore/addWorkout";
import { useAuthContext } from "@/context/AuthContext";

jest.mock("@/firebase/firestore/addWorkout", () => ({
  addWorkout: jest.fn(() => ({
    result: null,
    error: null,
  })),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuthContext: jest.fn(() => ({
    user: {
      uid: "mockUserID",
    },
  })),
}));

describe("WorkoutForm", () => {
  it("renders the form and buttons correctly", async () => {
    render(<WorkoutForm />);

    const formElement = await screen.findByRole("form");
    expect(formElement).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /add workout log/i });
    expect(addButton).toBeInTheDocument();
  });
});
