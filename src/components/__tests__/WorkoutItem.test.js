import { render, screen } from "@testing-library/react";
import WorkoutItem from "@/components/WorkoutItem";
import "@testing-library/jest-dom";

describe("WorkoutItem", () => {
  const testWorkout = {
    id: 1,
    date: "2023-05-20",
    exercise: "Bench Press",
    weight: 50,
    reps: 10,
  };

  it("renders the workout item correctly", () => {
    render(<WorkoutItem workout={testWorkout} />);

    expect(screen.getByText(/2023-05-20/i)).toBeInTheDocument();
    expect(screen.getByText(/Bench Press/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
