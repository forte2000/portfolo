
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { classNames } from "../utils";

export default function Toast({ message, type = "success", onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={classNames(
                "fixed left-1/2 -translate-x-1/2 bottom-10 z-50 px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold backdrop-blur-xl border flex items-center gap-3",
                type === "success"
                    ? "bg-emerald-500/80 text-white border-emerald-400/30 shadow-emerald-500/20"
                    : "bg-red-500/80 text-white border-red-400/30 shadow-red-500/20"
            )}
        >
            {type === "success" && (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            {message}
        </motion.div>
    );
}
