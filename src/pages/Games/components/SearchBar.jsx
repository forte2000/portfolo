
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="relative group">
                <motion.input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search events or redeem codes..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 dark:bg-slate-800/50 dark:border-slate-700/50 dark:focus:bg-slate-800 pl-12 shadow-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-white"
                    whileFocus={{ scale: 1.005 }}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </motion.form>
    );
}
