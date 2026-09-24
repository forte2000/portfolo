import React from "react";
import { motion } from "framer-motion";

const SpotifyVisualizer = ({ spotify }) => {
    if (!spotify) return null;

    const { song, artist, album_art_url, track_id } = spotify;
    const spotifyUrl = `https://open.spotify.com/track/${track_id}`;

    return (
        <motion.div
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            whileHover={{ y: -5 }}
            className="w-full relative z-10 group"
            style={{ minWidth: '280px' }}
        >
            <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {/* Main Card */}
                <div
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center w-full relative overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300 dark:group-hover:border-slate-700"
                    style={{ padding: '14px', gap: '16px' }}
                >

                    {/* Album Art with Visualizer Overlay */}
                    <div
                        className="relative flex-shrink-0 shadow-lg rounded-xl overflow-hidden"
                        style={{ width: '64px', height: '64px', minWidth: '64px', minHeight: '64px' }}
                    >
                        <motion.img
                            src={album_art_url}
                            alt={song}
                            className="object-cover"
                            style={{ width: '100%', height: '100%' }}
                            whileHover={{ scale: 1.05 }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-2 px-2">
                            <div className="flex items-end justify-center" style={{ gap: '4px', width: '100%', height: '32px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        className="bg-white rounded-full"
                                        style={{ width: '4px' }}
                                        animate={{
                                            height: ["20%", "100%", "40%", "100%", "20%"],
                                        }}
                                        transition={{
                                            duration: 0.8 + Math.random() * 0.4,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Song Info Section */}
                    <div className="flex-1 min-w-0 z-10" style={{ overflow: 'hidden' }}>
                        <div className="flex items-center mb-1.5" style={{ gap: '8px' }}>
                            <span className="relative flex" style={{ height: '8px', width: '8px' }}>
                                <span className="animate-ping absolute inline-flex rounded-full bg-green-500 opacity-75" style={{ height: '100%', width: '100%' }}></span>
                                <span className="relative inline-flex rounded-full bg-green-500" style={{ height: '8px', width: '8px' }}></span>
                            </span>
                            <p className="font-bold text-slate-500 dark:text-slate-400 uppercase" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                                Now Playing
                            </p>
                        </div>

                        <h4
                            className="font-bold text-slate-800 dark:text-slate-200 leading-tight transition-colors group-hover:text-slate-900 dark:group-hover:text-white"
                            style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {song}
                        </h4>
                        <p
                            className="text-slate-500 dark:text-slate-400 font-medium"
                            style={{ fontSize: '12px', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {artist}
                        </p>
                    </div>

                    {/* Spotify Icon */}
                    <div className="absolute opacity-5 group-hover:opacity-10 transition-opacity" style={{ right: '-12px', bottom: '-12px' }}>
                        <svg style={{ width: '64px', height: '64px' }} className="text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.492 17.311c-.22.36-.67.48-1.03.26-2.88-1.761-6.51-2.16-10.791-1.181-.41.09-.83-.16-.92-.57-.09-.41.16-.83.57-.92 4.69-1.07 8.711-.62 11.911 1.341.36.21.48.67.26 1.03zm1.47-3.26c-.28.451-.87.59-1.32.31-3.3-2.03-8.331-2.621-12.241-1.441-.51.15-1.05-.14-1.2-.65-.15-.51.14-1.05.65-1.2 4.47-1.351 10.021-.69 13.821 1.661.45.28.59.86.31 1.32zm.12-3.39c-4.14-2.46-10.951-2.691-14.891-1.491-.64.19-1.31-.17-1.5-.81-.19-.64.17-1.31.81-1.5 4.53-1.371 12.061-1.11 16.821 1.721.57.34.76 1.08.42 1.65-.34.57-1.08.76-1.65.42z" />
                        </svg>
                    </div>

                    {/* Side Accent */}
                    <div className="absolute bg-green-500 rounded-r-full" style={{ left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '50%' }} />
                </div>
            </a>
        </motion.div>
    );
};

export default SpotifyVisualizer;
