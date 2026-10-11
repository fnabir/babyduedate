"use client";

import { useEffect, useState } from "react";
import { FACTS } from "@/libs/facts";
import { FACTS_INTERVAL } from "@/libs/constants";
import { AnimatePresence, motion } from "framer-motion";

const factsLength = FACTS.length;

const RandomFact = () => {
  const [factIndex, setFactIndex] = useState<number>(0);

  useEffect(() => {
    if (!factsLength) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFactIndex(Math.floor(Math.random() * factsLength));

    const id = setInterval(() => {
      const next = Math.floor(Math.random() * factsLength);
      setFactIndex(next);
    }, FACTS_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3, delay: 1 }}
      aria-labelledby="fact-heading"
      role="region"
      aria-live="polite"
      className="p-4 rounded-2xl bg-surface border border-line max-w-full w-2xl"
    >
      <h2 id="fact-heading" className="text-xl font-semibold font-display mb-2">
        Did you know?
      </h2>

      <motion.div layout className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={factIndex}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-muted"
          >
            {FACTS[factIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

RandomFact.displayName = "RandomFact";

export { RandomFact };
