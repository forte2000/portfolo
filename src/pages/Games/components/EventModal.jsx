
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SafeImage from "./SafeImage";
import { t, FALLBACK_IMAGE } from "../constants";
import { fmtDate, secondsToDHMS } from "../utils";

export default function EventModal({ event, onClose }) {
    const expiresIn = event?.end_time ? Math.max(0, Math.floor(event.end_time - Date.now() / 1000)) : null;
    const [countdown, setCountdown] = useState(expiresIn);

    useEffect(() => {
        if (expiresIn === null) return;
        setCountdown(expiresIn);
        const id = setInterval(() => setCountdown((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, [expiresIn]);

    if (!event) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-slate-950/40 backdrop-blur-md p-0 sm:p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-slate-50 dark:bg-slate-900 border-t sm:border border-white/20 dark:border-slate-800 rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            >
                {/* Mobile Drag Handle */}
                <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-4 mb-4 sm:hidden opacity-50" />

                {/* Header Section */}
                <div className="px-6 py-4 sm:p-8 flex justify-between items-center gap-4 bg-white/50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex-1 min-w-0">
                        <motion.h3
                            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight truncate"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {event.name || event.title}
                        </motion.h3>
                        <motion.p
                            className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {event.start_time ? `${fmtDate(event.start_time)} — ${fmtDate(event.end_time)}` : event.created_at ? fmtDate(event.created_at) : "Special Event"}
                        </motion.p>
                    </div>
                    <motion.button
                        className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-all"
                        onClick={onClose}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </motion.button>
                </div>

                <div className="overflow-y-auto p-6 sm:p-8 flex-1 scrollbar-hide">
                    {expiresIn !== null && (
                        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 shadow-sm animate-pulse">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Event Time Remaining: {secondsToDHMS(countdown)}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Image Column */}
                        <div className="md:col-span-5 lg:col-span-4">
                            <SafeImage
                                src={event.image_url || (typeof event.banner === 'string' ? event.banner : event.banner?.[0]) || FALLBACK_IMAGE}
                                alt={event.name || event.title}
                                className="w-full h-auto aspect-video md:aspect-[3/4] object-cover rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800"
                            />
                        </div>

                        {/* Text Content Column */}
                        <div className="md:col-span-7 lg:col-span-8 space-y-6">
                            <div className="space-y-4">
                                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs opacity-50">
                                    <span className="w-8 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
                                    Event Details
                                </h4>
                                <div className="text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base">
                                    {event.description || t.noDescription}
                                </div>
                            </div>

                            {event.rewards?.length > 0 && (
                                <div className="bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                        </div>
                                        Available Rewards
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {event.rewards.map((r, i) => (
                                            <span key={i} className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl shadow-sm">
                                                {r.name} {r.amount ? <span className="text-amber-500 ml-1">x{r.amount}</span> : ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {event.url && (
                                <motion.a
                                    className="flex w-full items-center justify-center gap-3 mt-8 bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/20 dark:shadow-none"
                                    href={event.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t.viewFull}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </motion.a>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">LumiYi Gaming Experience</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
