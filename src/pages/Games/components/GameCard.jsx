
import React from "react";
import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
// import "tippy.js/dist/tippy.css"; // This might be needed if not already global or if I want to play safe. Original file imported it.

import SafeImage from "./SafeImage";

export default function GameCard({ game }) {
    const getPublisher = (gameName) => {
        const publishers = {
            "Genshin Impact": "HOYOVERSE",
            "Honkai Star Rail": "HOYOVERSE",
            "Zenless Zone Zero": "HOYOVERSE",
            "Honkai Impact 3rd": "HOYOVERSE",
            "Wuthering Waves": "KURO GAMES",
            "Arena of Valor": "Tencent Games",
            "Minecraft": "Mojang Studios",
            "VSCode": "Microsoft",
        };
        return publishers[gameName] || "";
    };

    const publisher = getPublisher(game.name);

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-[140px] sm:w-[160px]"
        >
            <Tippy
                content={`${game.time} Hours · ${(game.time / 24).toFixed(2)} Day`}
                animation="scale"
            >
                <div className="bg-white/50 hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 p-4 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-300 border border-white dark:border-slate-700 backdrop-blur-sm cursor-pointer group">
                    <SafeImage
                        src={game.img}
                        alt={game.name}
                        className="w-full h-16 sm:h-20 object-contain mb-3 drop-shadow-sm group-hover:drop-shadow-md transition-all"
                    />
                    <div className="text-center px-2 pb-2">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wider mb-1 uppercase opacity-80 truncate">{publisher || "GAME"}</p>
                        <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 line-clamp-2 leading-tight min-h-[2.5em] flex items-center justify-center">
                            {game.name}
                        </p>
                    </div>
                </div>
            </Tippy>
        </motion.div>
    );
}
