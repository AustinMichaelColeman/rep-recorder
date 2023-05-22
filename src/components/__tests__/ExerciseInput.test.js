import { render, fireEvent, screen } from "@testing-library/react";
import ExerciseInput from "@/components/ExerciseInput";
import "@testing-library/jest-dom";

describe("ExerciseInput", () => {
  const exerciseOptions = [
    { value: "exercise1", label: "Exercise 1" },
    { value: "exercise2", label: "Exercise 2" },
  ];

  it("renders a select field with the correct name and options", () => {
    const testProps = {
      selectedExercise: "exercise1",
      exerciseOptions,
      handleExerciseSelectChange: jest.fn(),
      name: "testName",
    };

    render(<ExerciseInput {...testProps} />);

    const selectElement = screen.getByLabelText(/Exercise/i);
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("name", "testName");

    for (let option of exerciseOptions) {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  });

  it("displays the correct selected exercise", () => {
    const testProps = {
      selectedExercise: "exercise1",
      exerciseOptions,
      handleExerciseSelectChange: jest.fn(),
      name: "testName",
    };

    render(<ExerciseInput {...testProps} />);

    const selectElement = screen.getByLabelText(/Exercise/i);
    expect(selectElement).toHaveValue("exercise1");
  });

  it("calls the handleExerciseSelectChange handler when the selected exercise changes", () => {
    const mockHandleExerciseSelectChange = jest.fn();

    const testProps = {
      selectedExercise: "exercise1",
      exerciseOptions,
      handleExerciseSelectChange: mockHandleExerciseSelectChange,
      name: "testName",
    };

    render(<ExerciseInput {...testProps} />);

    const selectElement = screen.getByLabelText(/Exercise/i);
    fireEvent.change(selectElement, { target: { value: "exercise2" } });
    expect(mockHandleExerciseSelectChange).toHaveBeenCalled();
  });
});
