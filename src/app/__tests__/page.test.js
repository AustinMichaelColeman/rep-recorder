import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import WorkoutTracker from "@/components/WorkoutTracker";
import Credits from "@/components/Credits";
import "@testing-library/jest-dom";

jest.mock("@/components/WorkoutTracker", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>WorkoutTracker</div>;
    },
  };
});

jest.mock("@/components/Credits", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>Credits</div>;
    },
  };
});

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders main heading", () => {
    const heading = screen.getByRole("heading", {
      name: /Rep Recorder/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders sub heading", () => {
    const subHeading = screen.getByRole("heading", {
      name: /A workout tracking website/i,
    });
    expect(subHeading).toBeInTheDocument();
  });

  it("renders Credits component", () => {
    expect(screen.getByText(/Credits/i)).toBeInTheDocument();
  });

  it("renders WorkoutTracker component", () => {
    expect(screen.getByText(/WorkoutTracker/i)).toBeInTheDocument();
  });
});
