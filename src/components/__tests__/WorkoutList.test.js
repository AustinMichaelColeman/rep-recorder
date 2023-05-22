import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutList from "@/components/WorkoutList";
import WorkoutItem from "@/components/WorkoutItem";
import "@testing-library/jest-dom";
import { useAuthContext } from "@/context/AuthContext";
import removeWorkout from "@/firebase/firestore/removeWorkout";

// Mocking removeWorkout
jest.mock("@/firebase/firestore/removeWorkout", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mocking WorkoutItem
jest.mock("@/components/WorkoutItem", () => ({
  __esModule: true,
  default: jest.fn(),
}));

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

jest.mock("@/context/AuthContext", () => ({
  useAuthContext: jest.fn(() => ({
    user: {
      uid: "mockUserID",
    },
  })),
}));

describe("WorkoutList", () => {
  it("renders the workout list correctly and handles workout removal", async () => {
    // Mocking the removeWorkout to resolve successfully
    removeWorkout.mockResolvedValue({ result: true, error: null });

    const mockSetWorkouts = jest.fn();

    // Define what the mock WorkoutItem should render
    WorkoutItem.mockImplementation(({ workout, onRemove }) => (
      <tr>
        <td>{workout.date}</td>
        <td>{workout.exercise}</td>
        <td>{workout.weight}</td>
        <td>{workout.reps}</td>
        <td>
          <button onClick={onRemove}>Delete</button>
        </td>
      </tr>
    ));

    render(
      <WorkoutList workouts={testWorkouts} setWorkouts={mockSetWorkouts} />
    );

    // Check if table headers are correctly rendered
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Exercise")).toBeInTheDocument();
    expect(screen.getByText("Weight (lbs)")).toBeInTheDocument();
    expect(screen.getByText("Reps")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check if workout details are correctly rendered
    testWorkouts.forEach((workout) => {
      expect(screen.getByText(workout.date)).toBeInTheDocument();
      expect(screen.getByText(workout.exercise)).toBeInTheDocument();
      expect(screen.getByText(String(workout.weight))).toBeInTheDocument();
      expect(screen.getByText(String(workout.reps))).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText("Delete");
    await fireEvent.click(deleteButtons[0]);

    // Check if setWorkouts has been called with the remaining workouts
    expect(mockSetWorkouts).toHaveBeenCalledWith([testWorkouts[1]]);
  });
});
