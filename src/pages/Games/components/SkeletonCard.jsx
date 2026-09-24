
import React from "react";
import { motion } from "framer-motion";

export default function SkeletonCard({ height = 220 }) {
    return (
        <motion.div
            className="rounded-2xl overflow-hidden bg-white/40 dark:bg-slate-800/40 shadow-sm p-4 animate-pulse border border-white/50 dark:border-slate-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="w-full rounded-xl bg-slate-200/50 dark:bg-slate-700/50" style={{ height }} />
            <div className="mt-3 h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg w-3/4" />
            <div className="mt-2 h-3 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg w-1/2" />
        </motion.div>
    );
}
