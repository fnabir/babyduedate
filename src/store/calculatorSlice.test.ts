import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer, { selectBounds, setMethod, setToday } from "./calculatorSlice";

describe("calculatorSlice selectors", () => {
  it("limits due-date max bound to 280 days ahead", () => {
    const store = configureStore({
      reducer: {
        calculator: calculatorReducer,
      },
    });

    store.dispatch(setToday(Date.UTC(2026, 9, 9)));
    store.dispatch(setMethod("due"));

    const bounds = selectBounds(store.getState());

    expect(bounds.max).toBe("2027-07-16");
    expect(bounds.min).toBe("2026-08-21");
  });
});
