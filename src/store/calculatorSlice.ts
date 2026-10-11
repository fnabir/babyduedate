"use client";

import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { DAY } from "@/libs/constants";
import { isoDate, parseToDate } from "@/libs/utils";
import { METHODS } from "@/libs/methods";
import type { Method } from "@/libs/types";
import type { RootState } from "./index";

type DateBounds = { min?: string; max?: string };
const EMPTY_BOUNDS: DateBounds = {};
const DEFAULT_CYCLE = 28;
const MAX_IN_RANGE_DAYS = 329; // 47 weeks

type CalculationInput = {
  method: Method;
  date: string;
  cycle: number;
};

type CalculatorState = {
  method: Method;
  date: string;
  cycle: number;
  today: number | null;
  rememberMe: boolean;
  submitted: CalculationInput | null;
};

const clampCycle = (value: number) => Math.min(45, Math.max(21, value));

const defaultState: CalculatorState = {
  method: "period",
  date: "",
  cycle: DEFAULT_CYCLE,
  today: null,
  rememberMe: false,
  submitted: null,
};

const initialState: CalculatorState = defaultState;

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<Method>) => {
      state.method = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCycle: (state, action: PayloadAction<number>) => {
      state.cycle = action.payload;
    },
    setToday: (state, action: PayloadAction<number | null>) => {
      state.today = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    hydrateFromCookies: (
      state,
      action: PayloadAction<{
        rememberMe: boolean;
        method: Method;
        date: string;
        cycle: number;
      }>,
    ) => {
      const { rememberMe, method, date, cycle } = action.payload;
      state.rememberMe = rememberMe;
      state.method = method;
      state.date = date;
      state.cycle = clampCycle(cycle);
    },
    calculate: (state) => {
      if (!state.date) {
        state.submitted = null;
        return;
      }

      state.submitted = {
        method: state.method,
        date: state.date,
        cycle: clampCycle(state.cycle),
      };
    },
    startNewCalculation: (state) => {
      state.submitted = null;
    },
  },
});

export const {
  setMethod,
  setDate,
  setCycle,
  setToday,
  setRememberMe,
  hydrateFromCookies,
  calculate,
  startNewCalculation,
} = calculatorSlice.actions;

export const selectCalculatorState = (state: RootState) => state.calculator;
export const selectMethod = (state: RootState) => state.calculator.method;
export const selectDate = (state: RootState) => state.calculator.date;
export const selectCycle = (state: RootState) => state.calculator.cycle;
export const selectToday = (state: RootState) => state.calculator.today;
export const selectRememberMe = (state: RootState) =>
  state.calculator.rememberMe;
export const selectSubmitted = (state: RootState) => state.calculator.submitted;

export const selectCurrentMethod = createSelector([selectMethod], (method) => {
  return METHODS.find((item) => item.id === method) ?? METHODS[0];
});

export const selectBounds = createSelector(
  [selectMethod, selectToday],
  (method, today): DateBounds => {
    if (today === null) {
      return EMPTY_BOUNDS;
    }

    if (method === "due") {
      return {
        min: isoDate(today - 49 * DAY),
        max: isoDate(today + 280 * DAY),
      };
    }

    return { min: isoDate(today - 320 * DAY), max: isoDate(today) };
  },
);

export const selectCalculationResult = createSelector(
  [selectSubmitted, selectToday],
  (submitted, today) => {
    if (today === null || submitted === null || submitted.date === "") {
      return null;
    }

    const d = parseToDate(submitted.date);
    const cycleLength = clampCycle(submitted.cycle);

    const start =
      submitted.method === "period"
        ? d + (cycleLength - 28) * DAY
        : submitted.method === "conception"
          ? d - 14 * DAY
          : d - 280 * DAY;
    const days = Math.round((today - start) / DAY);
    const week = Math.floor(days / 7);
    const daysAfterWeeks = days % 7;
    const due = start + 280 * DAY;
    const left = Math.round((due - today) / DAY);
    const inRange = days >= 0 && days <= MAX_IN_RANGE_DAYS;
    const trimester = week < 14 ? "First" : week < 28 ? "Second" : "Third";

    const warning =
      days < 0
        ? submitted.method === "due"
          ? "Your due date is more than typical 40 weeks away."
          : "That date is in the future. Check it and try again."
        : days > 294
          ? "Your due date passed the typical 42-week range."
          : "";

    return {
      start,
      today,
      days,
      week,
      daysAfterWeeks,
      left,
      due,
      inRange,
      trimester,
      warning,
    };
  },
);

export default calculatorSlice.reducer;
