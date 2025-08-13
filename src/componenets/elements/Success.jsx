import { motion, AnimatePresence } from "motion/react";

export default function Success({ show, msg }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alert"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="alert alert-success fixed right-2 text-white bottom-2 bg-emerald-600 p-4 rounded-md flex items-center gap-2 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Success. {msg}.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
