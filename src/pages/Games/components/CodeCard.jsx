
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../../config/animations";
import { classNames, secondsToDHMS } from "../utils";

export default function CodeCard({ codeObj, onCopy, copied }) {
    const [remaining, setRemaining] = useState(
        codeObj.expiredAt ? Math.max(0, Math.floor(codeObj.expiredAt - Date.now() / 1000)) : null
    );

    useEffect(() => {
        if (remaining === null) return;
        const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, [remaining, codeObj.expiredAt]);

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={classNames(
                "group relative p-5 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700/60 transition-all duration-300",
                copied === codeObj.code ? "ring-2 ring-emerald-400" : ""
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={classNames(
                            "w-2 h-2 rounded-full",
                            codeObj.is_active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-red-400"
                        )} />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {codeObj.is_active ? "ACTIVE" : "EXPIRED"}
                        </span>
                    </div>
                    <p className="font-mono font-bold text-xl text-slate-800 dark:text-white tracking-tight truncate select-all">
                        {codeObj.code}
                    </p>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">
                        {Array.isArray(codeObj.reward) && codeObj.reward.length > 0 ? codeObj.reward.join(" + ") : "Mystery Reward"}
                    </div>
                </div>

                <motion.button
                    onClick={() => onCopy(codeObj.code)}
                    className={classNames(
                        "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 shadow-sm border",
                        copied === codeObj.code
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-200"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600"
                    )}
                    whileTap={{ scale: 0.9 }}
                >
                    {copied === codeObj.code ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    )}
                </motion.button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center text-xs font-medium text-slate-400 dark:text-slate-500">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {remaining !== null ? secondsToDHMS(remaining) : "Permanent / Unknown"}
            </div>
        </motion.div>
    );
}
