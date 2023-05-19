import { render, fireEvent, screen } from "@testing-library/react";
import DateInput from "@/components/DateInput";
import "@testing-library/jest-dom";

describe("DateInput", () => {
  it("renders an input field with the correct type and name", () => {
    const testProps = {
      value: "",
      onChange: jest.fn(),
      name: "testName",
    };

    render(<DateInput {...testProps} />);

    const inputElement = screen.getByLabelText(/Date/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "date");
    expect(inputElement).toHaveAttribute("name", "testName");
  });

  it("displays the correct value", () => {
    const testProps = {
      value: "2023-01-01",
      onChange: jest.fn(),
      name: "testName",
    };

    render(<DateInput {...testProps} />);

    const inputElement = screen.getByLabelText(/Date/i);
    expect(inputElement).toHaveValue("2023-01-01");
  });

  it("calls the onChange handler when the value changes", () => {
    const mockOnChange = jest.fn();

    const testProps = {
      value: "",
      onChange: mockOnChange,
      name: "testName",
    };

    render(<DateInput {...testProps} />);

    const inputElement = screen.getByLabelText(/Date/i);
    fireEvent.change(inputElement, { target: { value: "2023-01-02" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
