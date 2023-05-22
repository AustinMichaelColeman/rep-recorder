import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuthContext } from "@/context/AuthContext";
import useExerciseTypes from "@/hooks/useExerciseTypes";
import WorkoutForm from "@/components/WorkoutForm";
import "@testing-library/jest-dom";

jest.mock("@/firebase/firestore/addWorkout");
jest.mock("@/context/AuthContext");
jest.mock("@/hooks/useExerciseTypes");

const mockSetWorkouts = jest.fn();

const testExerciseOptions = [
  { value: "bench_press", label: "Bench Press" },
  { value: "dumbbell_curl", label: "Dumbbell Curl" },
];

const defaultUser = { uid: "mockUserID" };

describe("WorkoutForm", () => {
  beforeEach(() => {
    useExerciseTypes.mockReturnValue({
      exerciseOptions: testExerciseOptions,
      isLoading: false,
      isError: false,
    });
    useAuthContext.mockReturnValue({ user: defaultUser });
  });

  it("renders the workout form correctly", () => {
    render(<WorkoutForm setWorkouts={mockSetWorkouts} />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Exercise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(lbs\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reps/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Workout Log/i })
    ).toBeInTheDocument();
  });

  it("handles form interactions correctly", () => {
    render(<WorkoutForm setWorkouts={mockSetWorkouts} />);

    fireEvent.change(screen.getByLabelText(/Weight \(lbs\)/i), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByLabelText(/Reps/i), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Exercise/i), {
      target: { value: testExerciseOptions[1].value },
    });

    expect(screen.getByLabelText(/Weight \(lbs\)/i).value).toBe("50");
    expect(screen.getByLabelText(/Reps/i).value).toBe("10");
    expect(screen.getByLabelText(/Exercise/i).value).toBe(
      testExerciseOptions[1].value
    );
  });
});
