"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { METHODS } from "@/libs/methods";
import { formattedDate, todayUTC } from "@/libs/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  CALCULATOR_CYCLE_KEY,
  CALCULATOR_DATE_KEY,
  CALCULATOR_METHOD_KEY,
  CALCULATOR_REMEMBER_ME_KEY,
  SHORT,
} from "@/libs/constants";
import {
  calculate,
  hydrateFromCookies,
  selectBounds,
  selectCalculationResult,
  selectCurrentMethod,
  selectCycle,
  selectDate,
  selectMethod,
  selectRememberMe,
  setCycle,
  setDate,
  setMethod,
  setRememberMe,
  setToday,
  startNewCalculation,
} from "@/store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Method } from "@/libs/types";

const style = {
  label: "block font-display text-sm font-semibold mb-1",
  input:
    "w-full rounded-xl border border-line bg-canvas px-4 py-2 font-display text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition",
};

const isMethod = (value: string | undefined): value is Method =>
  value !== undefined && METHODS.some((item) => item.id === value);

export default function Calculator() {
  const dispatch = useAppDispatch();
  const [cookiesReady, setCookiesReady] = useState(false);
  const date = useAppSelector(selectDate);
  const cycle = useAppSelector(selectCycle);
  const method = useAppSelector(selectMethod);
  const rememberMe = useAppSelector(selectRememberMe);
  const bounds = useAppSelector(selectBounds);
  const current = useAppSelector(selectCurrentMethod);
  const calculationResult = useAppSelector(selectCalculationResult);
  const isMobile = useIsMobile();

  const showCalculateNew = calculationResult?.inRange ?? false;
  const hasDate = date !== "";
  const isDateInBounds =
    hasDate &&
    (bounds.min === undefined || date >= bounds.min) &&
    (bounds.max === undefined || date <= bounds.max);
  const canCalculate = isDateInBounds;
  const showOutOfRangeMessage = hasDate && !isDateInBounds;
  const outOfRangeMessage =
    bounds.min && bounds.max
      ? `Please choose a date between ${formattedDate(
          Date.parse(bounds.min),
          SHORT,
        )} and ${formattedDate(Date.parse(bounds.max), SHORT)}.`
      : "Please choose a valid date.";
  const cycleMotion = isMobile
    ? {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
      }
    : {
        initial: { opacity: 0, x: 24, width: 0 },
        animate: { opacity: 1, x: 0, width: "auto" },
        exit: { opacity: 0, x: 24, width: 0 },
      };

  useEffect(() => {
    dispatch(setToday(todayUTC()));
  }, [dispatch]);

  useEffect(() => {
    const rememberMeCookie = Cookies.get(CALCULATOR_REMEMBER_ME_KEY) === "true";

    if (!rememberMeCookie) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCookiesReady(true);
      return;
    }

    const cookieMethod = Cookies.get(CALCULATOR_METHOD_KEY);
    const cookieDate = Cookies.get(CALCULATOR_DATE_KEY) ?? "";
    const cookieCycle = Number(Cookies.get(CALCULATOR_CYCLE_KEY));
    dispatch(
      hydrateFromCookies({
        rememberMe: true,
        method: isMethod(cookieMethod) ? cookieMethod : "period",
        date: cookieDate,
        cycle: Number.isFinite(cookieCycle) ? cookieCycle : 28,
      }),
    );
    setCookiesReady(true);
  }, [dispatch]);

  useEffect(() => {
    if (!cookiesReady) {
      return;
    }

    if (rememberMe) {
      Cookies.set(CALCULATOR_REMEMBER_ME_KEY, "true");
      Cookies.set(CALCULATOR_METHOD_KEY, method);
      Cookies.set(CALCULATOR_DATE_KEY, date);
      Cookies.set(CALCULATOR_CYCLE_KEY, String(cycle));
      return;
    }

    Cookies.remove(CALCULATOR_REMEMBER_ME_KEY);
    Cookies.remove(CALCULATOR_METHOD_KEY);
    Cookies.remove(CALCULATOR_DATE_KEY);
    Cookies.remove(CALCULATOR_CYCLE_KEY);
  }, [cookiesReady, rememberMe, method, date, cycle]);

  return (
    <AnimatePresence>
      <motion.section
        layout
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{ duration: 0.3, delay: 0.3, layout: { duration: 0.3 } }}
        aria-label="Calculator"
        className="rounded-[1.25rem] border border-line bg-surface p-6 max-w-full w-2xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!showCalculateNew ? (
            <motion.div
              key="calculator-inputs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <fieldset className="mb-5">
                <legend className="font-display text-[1rem] font-semibold">
                  Count based on
                </legend>
                <div className="grid gap-1 rounded-xl border border-line bg-canvas p-1 grid-cols-3">
                  {METHODS.map((m) => (
                    <label
                      key={m.id}
                      className="cursor-pointer rounded-lg px-2 py-2.5 text-center content-center font-display text-sm font-semibold text-muted transition-colors has-checked:bg-ink has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
                    >
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={method === m.id}
                        onChange={() => dispatch(setMethod(m.id))}
                        className="sr-only"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <motion.div layout className="flex flex-col md:flex-row gap-2">
                <motion.div
                  layout
                  className="flex-1 min-w-0 p-1"
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.label
                      htmlFor="date"
                      className={style.label}
                      key={method}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {current.field}
                    </motion.label>
                  </AnimatePresence>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                    className={style.input}
                    {...bounds}
                  />
                </motion.div>
                <AnimatePresence initial={false}>
                  {method === "period" && (
                    <motion.div
                      key="cycle"
                      {...cycleMotion}
                      transition={{ duration: 0.3 }}
                      className="w-full overflow-hidden md:shrink-0 md:w-auto"
                    >
                      <div className="w-full p-1 md:w-48">
                        <label htmlFor="cycle" className={style.label}>
                          Cycle length
                        </label>
                        <input
                          id="cycle"
                          type="number"
                          inputMode="numeric"
                          min={21}
                          max={45}
                          value={cycle}
                          onChange={(e) =>
                            dispatch(setCycle(Number(e.target.value)))
                          }
                          className={style.input}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div layout className="overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={method}
                    initial={{ opacity: 0, y: 4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-base text-muted min-h-12 lg:min-h-8"
                  >
                    {current.hint}
                  </motion.p>
                </AnimatePresence>
              </motion.div>

              <div className="mt-4 rounded-xl border border-line bg-canvas px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      Remember my inputs
                    </p>
                    <p className="text-sm text-muted">
                      We don&apos;t collect or store your information.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={rememberMe}
                    aria-label="Remember my inputs"
                    onClick={() => dispatch(setRememberMe(!rememberMe))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      rememberMe ? "bg-ink" : "bg-line"
                    }`}
                  >
                    <motion.span
                      className="inline-block h-5 w-5 rounded-full bg-canvas"
                      animate={{ x: rememberMe ? 20 : 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Inputs are saved only in your browser cookies. Clearing
                  browser data will remove saved date, method, and cycle length.
                </p>
              </div>

              <button
                type="button"
                onClick={() => dispatch(calculate())}
                disabled={!canCalculate}
                className="mt-5 w-full rounded-xl bg-ink px-4 py-3 font-display text-base font-semibold text-canvas cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                Calculate
              </button>
              <AnimatePresence initial={false}>
                {showOutOfRangeMessage && (
                  <motion.p
                    key="out-of-range"
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-sm text-muted"
                  >
                    {outOfRangeMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="calculator-reset"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                onClick={() => dispatch(startNewCalculation())}
                className="w-full rounded-xl bg-ink px-4 py-3 font-display text-base font-semibold text-canvas cursor-pointer"
              >
                Calculate new
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimatePresence>
  );
}
