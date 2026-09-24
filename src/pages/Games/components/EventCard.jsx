
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "../../../config/animations";
import { classNames, fmtDate } from "../utils";
import { FALLBACK_IMAGE } from "../constants";
import SafeImage from "./SafeImage";

export default function EventCard({ event, onClick }) {
    const active = event.is_active;

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer transition-all duration-300 relative"
            onClick={() => onClick(event)}
        >
            <div className="relative overflow-hidden">
                <SafeImage
                    src={event.image_url || (typeof event.banner === 'string' ? event.banner : event.banner?.[0]) || FALLBACK_IMAGE}
                    alt={event.name || event.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                    <div className={classNames(
                        "text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md shadow-sm border uppercase tracking-wide",
                        active ? "bg-emerald-500/90 text-white border-white/20" : "bg-slate-800/80 text-white border-white/20"
                    )}>
                        {active ? "Ongoing" : "Ended"}
                    </div>
                </div>
            </div>

            <div className="p-5">
                <h4 className="font-bold text-lg leading-snug text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.name || event.title}
                </h4>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="truncate">{event.start_time ? `${fmtDate(event.start_time)} - ${fmtDate(event.end_time)}` : event.created_at ? fmtDate(event.created_at) : "TBA"}</span>
                </div>
            </div>
        </motion.div>
    );
}
