import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Calculator from "./Calculator";
import StoreProvider from "@/store/StoreProvider";
import { METHODS } from "@/libs/methods";

describe("Calculator component", () => {
  it("renders the calculator", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/calculator/i)).toBeInTheDocument();
    });
  });

  it("renders all method options", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      METHODS.forEach((method) => {
        expect(
          screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
        ).toBeInTheDocument();
      });
    });
  });

  it("renders the initial hint", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(METHODS[0].hint)).toBeInTheDocument();
    });
  });

  it("able to change to all method options", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      METHODS.forEach((method) => {
        fireEvent.click(
          screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
        );
        expect(
          screen.getByRole("radio", { name: new RegExp(method.label, "i") }),
        ).toBeChecked();
      });
    });
  });

  it("updates the hint when the method changes", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/calculator/i)).toBeInTheDocument();
    });

    for (const method of METHODS) {
      await waitFor(() => {
        const radio = screen.getByRole("radio", {
          name: new RegExp(method.label, "i"),
        });
        fireEvent.click(radio);
      });

      await waitFor(() => {
        expect(screen.getByText(method.hint)).toBeInTheDocument();
      });
    }
  });

  it("shows the cycle length input for the period method", async () => {
    render(
      <StoreProvider>
        <Calculator />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/calculator/i)).toBeInTheDocument();
    });

    for (const method of METHODS) {
      await waitFor(() => {
        const radio = screen.getByRole("radio", {
          name: new RegExp(method.label, "i"),
        });
        fireEvent.click(radio);
      });

      const cycleLengthInput = screen.queryByLabelText(/cycle length/i);
      await waitFor(() => {
        if (method.id === "period") {
          expect(screen.getByLabelText(/cycle length/i)).toBeInTheDocument();
        } else {
          expect(cycleLengthInput).not.toBeInTheDocument();
        }
      });
    }
  });
});
