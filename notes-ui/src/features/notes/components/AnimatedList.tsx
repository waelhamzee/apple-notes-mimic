import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedListProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  children: (item: T) => ReactNode;
  exitDelay?: number;
}

export default function AnimatedList<T>({
  items,
  getKey,
  children,
  exitDelay = 200,
}: AnimatedListProps<T>) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={getKey(item)}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: exitDelay / 1000 } }}
          transition={{ type: "spring", stiffness: 500, damping: 40, duration: 0.2 }}
          style={{ width: "100%" }}
        >
          {children(item)}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
