import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentMethod, selectMethod } from "@/store/calculatorSlice";

const MethodHint = () => {
  const method = useAppSelector(selectMethod);
  const current = useAppSelector(selectCurrentMethod);

  return (
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
  );
};

export default MethodHint;
