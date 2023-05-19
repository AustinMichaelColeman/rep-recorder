import { render, fireEvent, screen } from "@testing-library/react";
import NumericControl from "@/components/NumericControl";
import "@testing-library/jest-dom";

describe("NumericControl", () => {
  it("renders an input field with the correct type, name and step, and increment/decrement buttons", () => {
    const testProps = {
      label: "Test Label",
      value: 10,
      name: "testName",
      step: 1,
      onChange: jest.fn(),
    };

    render(<NumericControl {...testProps} />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "number");
    expect(inputElement).toHaveAttribute("name", "testName");

    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });
    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    const testProps = {
      label: "Test Label",
      value: 10,
      name: "testName",
      step: 1,
      onChange: jest.fn(),
    };

    render(<NumericControl {...testProps} />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toHaveValue(10);
  });

  it("calls the onChange handler when the value changes", () => {
    const mockOnChange = jest.fn();

    const testProps = {
      label: "Test Label",
      value: 10,
      name: "testName",
      step: 1,
      onChange: mockOnChange,
    };

    render(<NumericControl {...testProps} />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    fireEvent.change(inputElement, { target: { value: 15 } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls the onChange handler with correct value when the increment button is clicked", () => {
    const mockOnChange = jest.fn();

    const testProps = {
      label: "Test Label",
      value: 10,
      name: "testName",
      step: 1,
      onChange: mockOnChange,
    };

    render(<NumericControl {...testProps} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(incrementButton);

    expect(mockOnChange).toHaveBeenCalledWith({
      target: { name: "testName", value: 11 },
    });
  });

  it("calls the onChange handler with correct value when the decrement button is clicked", () => {
    const mockOnChange = jest.fn();

    const testProps = {
      label: "Test Label",
      value: 10,
      name: "testName",
      step: 1,
      onChange: mockOnChange,
    };

    render(<NumericControl {...testProps} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(decrementButton);

    expect(mockOnChange).toHaveBeenCalledWith({
      target: { name: "testName", value: 9 },
    });
  });
});
