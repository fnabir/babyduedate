import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectBounds,
  selectCurrentMethod,
  selectCycle,
  selectDate,
  selectMethod,
  setCycle,
  setDate,
} from "@/store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const style = {
  label: "block font-display text-sm font-semibold mb-1",
  input:
    "w-full rounded-xl border border-line bg-canvas px-4 py-2 font-display text-lg font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition",
};

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const cycle = useAppSelector(selectCycle);
  const method = useAppSelector(selectMethod);
  const bounds = useAppSelector(selectBounds);
  const current = useAppSelector(selectCurrentMethod);
  const isMobile = useIsMobile();
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

  return (
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
        ></input>
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
                onChange={(e) => dispatch(setCycle(Number(e.target.value)))}
                className={style.input}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
