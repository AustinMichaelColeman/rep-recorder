import { render, screen } from "@testing-library/react";
import WorkoutList from "@/components/WorkoutList";
import "@testing-library/jest-dom";

describe("WorkoutList", () => {
  const testWorkouts = [
    {
      id: 1,
      date: "2023-05-20",
      exercise: "Bench Press",
      weight: 50,
      reps: 10,
    },
    {
      id: 2,
      date: "2023-05-21",
      exercise: "Dumbbell Curl",
      weight: 40,
      reps: 8,
    },
  ];

  it("renders the workout list correctly", () => {
    render(<WorkoutList workouts={testWorkouts} />);

    // Check if table headers are correctly rendered
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Exercise")).toBeInTheDocument();
    expect(screen.getByText("Weight (lbs)")).toBeInTheDocument();
    expect(screen.getByText("Reps")).toBeInTheDocument();

    // Check if workout details are correctly rendered
    testWorkouts.forEach((workout) => {
      expect(screen.getByText(workout.date)).toBeInTheDocument();
      expect(screen.getByText(workout.exercise)).toBeInTheDocument();
      expect(screen.getByText(workout.weight)).toBeInTheDocument();
      expect(screen.getByText(workout.reps)).toBeInTheDocument();
    });
  });

  it("renders no headers when there are no workouts", () => {
    render(<WorkoutList workouts={[]} />);

    // Check that no headers are displayed
    expect(screen.queryByText("Date")).not.toBeInTheDocument();
    expect(screen.queryByText("Exercise")).not.toBeInTheDocument();
    expect(screen.queryByText("Weight (lbs)")).not.toBeInTheDocument();
    expect(screen.queryByText("Reps")).not.toBeInTheDocument();
  });
});
