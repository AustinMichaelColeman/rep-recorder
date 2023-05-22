import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutItem from "@/components/WorkoutItem";
import "@testing-library/jest-dom";

describe("WorkoutItem", () => {
  const testWorkout = {
    id: "testId",
    date: "2023-05-20",
    exerciseLabel: "Bench Press",
    weight: 50,
    reps: 10,
  };

  it("renders the workout item correctly", () => {
    render(
      <table>
        <tbody>
          <WorkoutItem workout={testWorkout} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/2023-05-20/i)).toBeInTheDocument();
    expect(screen.getByText(/Bench Press/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });

  it("calls the onRemove function when the delete button is clicked", () => {
    const mockOnRemove = jest.fn();

    render(
      <table>
        <tbody>
          <WorkoutItem workout={testWorkout} onRemove={mockOnRemove} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText(/Delete/i));

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
