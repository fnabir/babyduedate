import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders with correct accessibility attributes", () => {
    render(<Loader />);

    const status = screen.getByRole("status", { name: /loading/i });
    expect(status).toBeInTheDocument();
  });

  it("displays a loading spinner", () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector(".rounded-full");
    expect(spinner).toBeInTheDocument();
  });
});
