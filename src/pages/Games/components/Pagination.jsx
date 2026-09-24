
import React from "react";
import { motion } from "framer-motion";

export default function Pagination({ current, total, onChange }) {
    if (total <= 1) return null;

    return (
        <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <motion.button
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
                className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-white/50 dark:border-slate-700/50"
                whileTap={{ scale: 0.9 }}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </motion.button>

            <div className="px-4 py-2 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-white/50 dark:border-slate-700/50 font-mono font-medium text-slate-600 dark:text-slate-300 min-w-[80px] text-center">
                {current} / {total}
            </div>

            <motion.button
                onClick={() => onChange(current + 1)}
                disabled={current === total}
                className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 flex items-center justify-center text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-white/50 dark:border-slate-700/50"
                whileTap={{ scale: 0.9 }}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </motion.button>
        </motion.div>
    );
}
