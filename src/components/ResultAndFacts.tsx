"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCalculationResult, selectIsCalculating } from "@/store/calculatorSlice";
import Result from "./Result";
import { RandomFact } from "./Facts";
import { AnimatePresence, motion } from "framer-motion";

export default function ResultAndFacts() {
  const calculationResult = useAppSelector(selectCalculationResult);
  const isCalculating = useAppSelector(selectIsCalculating);
  const showResult = calculationResult?.inRange ?? false;

  return (
    <AnimatePresence mode="wait">
      {showResult && !isCalculating && (
        <motion.div
          key="result-facts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Result />
          <RandomFact />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
