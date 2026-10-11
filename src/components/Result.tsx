"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCalculationResult } from "@/store/calculatorSlice";
import { formattedDate, plural } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LONG, LEGENDS } from "@/libs/constants";
import KeyDates from "./KeyDates";
import { BabySize } from "./BabySize";

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      delay: 0.3,
      staggerChildren: 0.3,
      delayChildren: 0.2,
      layout: { duration: 0.3 },
    },
  },
  hide: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      delay: 0,
      staggerChildren: 0.06,
      staggerDirection: -1,
      delayChildren: 0,
      layout: { duration: 0.2 },
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6, height: 0 },
  show: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.3 },
  },
  hide: {
    opacity: 0,
    y: -6,
    height: 0,
    transition: { duration: 0.2, delay: 0 },
  },
};

function dotClass(week: number, current: number) {
  const elapsed = week - 1;

  const tone =
    week > 40
      ? "border-danger"
      : week === 40
        ? "border-sun"
        : elapsed < 14
          ? "border-tri-1"
          : elapsed < 28
            ? "border-tri-2"
            : "border-tri-3";
  const fill =
    week > 40
      ? "bg-danger"
      : week === 40
        ? "bg-sun"
        : elapsed < 14
          ? "bg-tri-1"
          : elapsed < 28
            ? "bg-tri-2"
            : "bg-tri-3";
  const filled = week <= current;
  const ring =
    week === current
      ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas"
      : "ring-0";
  return `aspect-square rounded-full border-2 flex items-center justify-center font-mono font-bold ${tone} ${filled ? fill + " text-surface" : "bg-transparent text-ink"} ${ring}`;
}

const Result = () => {
  const calculationResult = useAppSelector(selectCalculationResult);
  const showResult = calculationResult?.inRange ?? false;

  return (
    <AnimatePresence initial={false}>
      {showResult && calculationResult && (
        <motion.section
          layout
          key="result"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hide"
          aria-live="polite"
          className="max-w-full w-2xl mx-auto flex flex-col gap-12"
        >
          {calculationResult.warning && (
            <p className="text-sun text-center -my-4">
              {calculationResult.warning}
            </p>
          )}
          <motion.p
            layout
            variants={itemVariants}
            className="max-w-2xl w-full text-center lg:text-xl"
          >
            Today you are{" "}
            <strong className="font-display font-semibold text-[22px] lg:text-3xl">
              {plural(calculationResult.week, "week")}
              {calculationResult.daysAfterWeeks
                ? ` and ${plural(calculationResult.daysAfterWeeks, "day")}`
                : ""}
            </strong>{" "}
            pregnant.
          </motion.p>

          <motion.div
            className="text-center -mt-8"
            layout
            variants={itemVariants}
          >
            <p className="text-muted lg:text-xl">Estimated due date</p>
            <p className="font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              {formattedDate(calculationResult.due, LONG)}
            </p>
          </motion.div>

          <motion.div
            className="text-center -mt-8"
            layout
            variants={itemVariants}
          >
            <p className="text-muted lg:text-xl">Phase</p>
            <p className="font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl">
              {calculationResult.trimester} trimester
            </p>
          </motion.div>

          <motion.div
            className="text-center -mt-8"
            layout
            variants={itemVariants}
          >
            <p className="text-muted lg:text-xl">
              Days
              {calculationResult.left < 0 ? " past " : " until "} due date
            </p>
            <p className="font-display text-xl font-bold tracking-[-0.03em] sm:text-3xl">
              {Math.abs(calculationResult.left)}
            </p>
          </motion.div>
          <motion.div className="text-center" layout variants={itemVariants}>
            <ol
              aria-label="The 40 weeks of pregnancy"
              className="m-0 mb-4 grid list-none grid-cols-10 gap-1.5 p-0 sm:gap-2.5"
            >
              {Array.from(
                {
                  length:
                    calculationResult.week < 40 ? 40 : calculationResult.week,
                },
                (_, i) => {
                  const week = i + 1;
                  const cur = calculationResult.week;
                  return (
                    <li
                      key={week}
                      title={`Week ${week}`}
                      className={dotClass(week, cur)}
                    >
                      {week}
                    </li>
                  );
                },
              )}
            </ol>
            <ul className="flex list-none flex-col sm:flex-row text-start sm:text-center sm:flex-wrap gap-5 gap-y-1.5 text-sm text-muted pt-4">
              {LEGENDS.map(({ color, description }) => (
                <li key={description}>
                  <span
                    className={`mr-2 inline-block size-3 rounded-full align-[-0.05em] ${color}`}
                  />
                  {description}
                </li>
              ))}
            </ul>
          </motion.div>
          {calculationResult.week > 3 && calculationResult.week <= 40 && (
            <motion.div layout variants={itemVariants}>
              <BabySize week={calculationResult.week} />
            </motion.div>
          )}

          <motion.div layout variants={itemVariants}>
            <KeyDates />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Result;
