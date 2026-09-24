import React from "react";
import { motion } from "framer-motion";

const SpotifyAvatarRing = ({ isPlaying }) => {
    if (!isPlaying) return null;

    return (
        <div className="absolute inset-[-10px] z-0 pointer-events-none">
            {/* Outer Pulse Ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-[3px] border-slate-400/20 dark:border-white/10"
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Rotating Visualizer Bars */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-gradient-to-t from-slate-600 to-slate-400 dark:from-green-500 dark:to-green-300 rounded-full shadow-[0_0_8px_rgba(100,116,139,0.6)] dark:shadow-[0_0_8px_rgba(74,222,128,0.4)]"
                        style={{
                            width: "4px",
                            transform: `rotate(${i * 30}deg) translateY(-68px)`,
                        }}
                        animate={{
                            height: ["6px", "14px", "6px"],
                            opacity: [0.3, 1, 0.3],
                            translateY: ["-68px", "-72px", "-68px"]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Orbiting Particle */}
            <motion.div
                className="absolute w-2 h-2 bg-slate-600 dark:bg-green-400 rounded-full shadow-[0_0_15px_rgba(71,85,105,0.8)] dark:shadow-[0_0_15px_rgba(74,222,128,0.6)]"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    transformOrigin: "center center",
                    top: "50%",
                    left: "50%",
                    marginTop: "-1px",
                    marginLeft: "-1px",
                    x: 74
                }}
            />
        </div>
    );
};

export default SpotifyAvatarRing;
