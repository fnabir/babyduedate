import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Calculator from "./Calculator";
import StoreProvider from "@/store/StoreProvider";
import { METHODS } from "@/libs/methods";

describe("Calculator component", () => {
  it("renders the calculator", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    expect(screen.getByLabelText(/calculator/i)).toBeInTheDocument();
  });

  it("renders all method options", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    METHODS.forEach((method) => {
      expect(
        screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
      ).toBeInTheDocument();
    });
  });

  it("renders the initial hint", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    expect(screen.getByText(METHODS[0].hint)).toBeInTheDocument();
  });

  it("able to change to all method options", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    METHODS.forEach((method) => {
      fireEvent.click(
        screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
      );
      expect(
        screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
      ).toBeChecked();
    });
  });

  it("updates the hint when the method changes", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    METHODS.forEach(async (method) => {
      fireEvent.click(
        screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
      );

      await waitFor(() => {
        expect(screen.getByText(method.hint)).toBeInTheDocument();
      });
    });
  });

  it("shows the cycle length input for the period method", () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    METHODS.forEach(async (method) => {
      fireEvent.click(
        screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
      );

      const cycleLengthInput = screen.getByLabelText(/cycle length/i);
      await waitFor(() => {
        if (method.id === "period") {
          expect(cycleLengthInput).toBeInTheDocument();
        } else {
          expect(cycleLengthInput).not.toBeInTheDocument();
        }
      });
    });
  });
});
