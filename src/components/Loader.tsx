"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading" }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 gap-4"
      role="status"
      aria-label={message}
    >
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-3 border-transparent border-t-ink border-r-ink"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/icons/heartbeat.png"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
      </div>
      <p className="text-muted text-sm font-display font-medium">{message}</p>
    </motion.div>
  );
}
