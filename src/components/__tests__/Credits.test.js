import { render, screen } from "@testing-library/react";
import Credits from "@/components/Credits";
import "@testing-library/jest-dom";

describe("Credits", () => {
  it("renders a link to the GitHub repository", () => {
    render(<Credits />);

    const linkElement = screen.getByRole("link", {
      name: /GitHub/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/AustinMichaelColeman/rep-recorder"
    );
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });
});
