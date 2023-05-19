import { render, screen } from "@testing-library/react";
import WorkoutTracker from "@/components/WorkoutTracker";
import "@testing-library/jest-dom";

describe("WorkoutTracker", () => {
  it("renders the WorkoutForm and WorkoutList components correctly", async () => {
    render(<WorkoutTracker />);

    const formElement = await screen.findByRole("form");
    expect(formElement).toBeInTheDocument();

    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
