"use client";

import { DAY, MILESTONES, SHORT } from "@/libs/constants";
import { selectCalculationResult } from "@/store/calculatorSlice";
import { formattedDate } from "@/libs/utils";
import { useAppSelector } from "@/store/hooks";

const KeyDates = () => {
  const calculationResult = useAppSelector(selectCalculationResult);

  if (!calculationResult) {
    return null;
  }

  const { start, today } = calculationResult;

  return (
    <section aria-live="polite" className="max-w-2xl w-full">
      <h2 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em]">
        Key dates
      </h2>
      <dl className="border-t border-line">
        {MILESTONES.map(({ week, description }) => {
          const t = start + week * 7 * DAY;
          const past = today !== null && t < today;
          return (
            <div
              key={week}
              className={`gap-4 border-b border-line py-3 flex text-base ${past ? "text-muted" : ""}`}
            >
              <dt className="font-display font-semibold tabular-nums lg:text-xl min-w-36 lg:min-w-46">
                {formattedDate(t, SHORT)}
              </dt>
              <dd className="lg:text-lg">
                Week {week}: {description}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-8 text-muted max-w-full w-2xl">
        This is an estimate. Most babies arrive within a couple of weeks either
        side of it, and your midwife or doctor will confirm your dates at your
        dating scan.
      </p>
    </section>
  );
};

export default KeyDates;
