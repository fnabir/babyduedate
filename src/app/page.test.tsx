import { render, screen } from "@testing-library/react";
import Home from "./page";
import StoreProvider from "@/store/StoreProvider";

describe("Home page", () => {
  it("renders the main heading", () => {
    render(
      <StoreProvider>
        <Home />
      </StoreProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /when is your baby due\?/i }),
    ).toBeInTheDocument();
  });
});
