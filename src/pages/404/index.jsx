import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";
import { pageVariants, itemVariants } from "../../config/animations";

function NotFound() {
  useSEO({
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist.",
    noIndex: true
  });

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full py-20 text-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >

      <motion.h1
        className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-100 dark:to-slate-400 drop-shadow-sm leading-tight"
        variants={itemVariants}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl font-bold text-slate-800 dark:text-white mt-2"
        variants={itemVariants}
      >
        Oops! Page not found.
      </motion.h2>

      <motion.p
        className="text-slate-500 dark:text-slate-400 mt-4 max-w-md text-base"
        variants={itemVariants}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      <motion.div
        className="mt-8"
        variants={itemVariants}
      >
        <Link
          to="/"
          className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block text-sm"
        >
          Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default NotFound;
