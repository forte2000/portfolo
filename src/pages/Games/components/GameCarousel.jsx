
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, scaleVariants } from "../../../config/animations";
import GameCard from "./GameCard";

export default function GameCarousel({ items, title }) {
    return (
        <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-slate-800 dark:bg-white rounded-full" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
            </motion.div>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto py-2 -mx-3 px-3 sm:mx-0 sm:px-0 hide-scrollbar pb-6">
                {items.map((game, index) => (
                    <motion.div
                        key={game.name}
                        variants={scaleVariants}
                        custom={index}
                    >
                        <GameCard game={game} />
                    </motion.div>
                ))}
                {/* Spacer to ensure last item has Right Padding on mobile */}
                <div className="w-1 shrink-0 sm:hidden" />
            </div>
        </motion.div>
    );
}
