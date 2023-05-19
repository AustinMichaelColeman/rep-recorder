import { render, fireEvent, screen } from "@testing-library/react";
import WorkoutForm from "@/components/WorkoutForm";
import "@testing-library/jest-dom";

describe("WorkoutForm", () => {
  const setWorkoutsMock = jest.fn();
  const testProps = {
    setWorkouts: setWorkoutsMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and all inputs correctly", () => {
    render(<WorkoutForm {...testProps} />);

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Exercise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(lbs\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reps/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Workout Log/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Clear Workouts/i })
    ).toBeInTheDocument();
  });

  it("updates the form values correctly when inputs change", () => {
    render(<WorkoutForm {...testProps} />);

    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2023-05-20" },
    });
    expect(screen.getByLabelText(/Date/i)).toHaveValue("2023-05-20");

    fireEvent.change(screen.getByLabelText(/Weight \(lbs\)/i), {
      target: { value: "50" },
    });
    expect(screen.getByLabelText(/Weight \(lbs\)/i)).toHaveValue(50);

    fireEvent.change(screen.getByLabelText(/Reps/i), {
      target: { value: "10" },
    });
    expect(screen.getByLabelText(/Reps/i)).toHaveValue(10);
  });

  it("submits the form correctly", () => {
    render(<WorkoutForm {...testProps} />);

    fireEvent.click(screen.getByRole("button", { name: /Add Workout Log/i }));

    expect(setWorkoutsMock).toHaveBeenCalled();
  });

  it("clears the workout logs when 'Clear Workouts' button is clicked", () => {
    render(<WorkoutForm {...testProps} />);

    fireEvent.click(screen.getByRole("button", { name: /Clear Workouts/i }));

    expect(setWorkoutsMock).toHaveBeenCalledWith([]);
  });
});
