
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GameHeader({ activeGame }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Determine game-specific terms
    const getGameContext = (gameId) => {
        switch (gameId) {
            case 'genshin': return { role: 'Traveler', icon: '✨', resetTime: 4 }; // 4 AM
            case 'starrail': return { role: 'Trailblazer', icon: '🚂', resetTime: 4 };
            case 'zenless': return { role: 'Proxy', icon: '📼', resetTime: 4 };
            case 'wuwa': return { role: 'Rover', icon: '🌊', resetTime: 4 };
            default: return { role: 'Player', icon: '🎮', resetTime: 0 };
        }
    };

    const context = getGameContext(activeGame);

    // Time based greeting
const getGreeting = () => {
    const hrs = time.getHours();
    if (hrs < 5) return "It's late at night";
    if (hrs < 11) return "Good morning";
    if (hrs < 13) return "Good afternoon";
    if (hrs < 18) return "Good afternoon";
    return "Good evening";
};
    // Calculate time until daily reset (defaulting to 4 AM next day)
    const getResetCountdown = () => {
        const now = new Date();
        const target = new Date();

        // Set target to configured reset hour
        target.setHours(context.resetTime, 0, 0, 0);

        // If we passed the reset time today, aim for tomorrow
        if (now >= target) {
            target.setDate(target.getDate() + 1);
        }

        const diff = target - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hrs}Hours ${mins}Minutes`;
    };

    return (
        <motion.div
            className="mb-8 mt-6 sm:mt-8 ml-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                {/* Main Title Block */}
                <div className="relative">
                    <motion.div
                        className="flex items-center gap-3 md:gap-4"
                        key={activeGame} // Re-animate on game change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-2 sm:w-2.5 h-10 sm:h-14 bg-slate-800 dark:bg-white rounded-full shadow-lg shadow-slate-300/50 dark:shadow-slate-700/50" />

                        <div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-wider mb-0.5 sm:mb-1">
                                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <span className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full" />
                                <span className="text-indigo-500 dark:text-indigo-400">{context.icon} {context.role}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                                {getGreeting()}
                            </h1>
                        </div>
                    </motion.div>
                </div>

                {/* Smart Widget / Info */}
                <div className="mt-2 sm:mt-0 sm:mb-1.5 sm:ml-auto">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-700/60 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5">Daily Commissions</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Refresh Time Remaining {getResetCountdown()}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
