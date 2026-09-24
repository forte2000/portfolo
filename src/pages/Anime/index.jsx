import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAnilistData } from "../../api/anilist";
import animeConfig from "../../config/anime";
import useSEO from "../../hooks/useSEO";
import { pageVariants, itemVariants } from "../../config/animations";
import { FaPlay, FaBook, FaStar, FaSearch } from "react-icons/fa";

function Anime() {
    useSEO({
        title: "Anime List",
        description: "Check out my anime and manga list on AniList.",
        keywords: "anime, manga, anilist, list",
        url: "https://forte.is-a.dev/anime"
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(animeConfig.defaultType); // ANIME or MANGA
    const [activeTab, setActiveTab] = useState("Watching");
    const [searchQuery, setSearchQuery] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchAnilistData(animeConfig.username, type);
            if (result) {
                setData(result.lists);
                setUserInfo(result.user);
                // Set default tab to the first list name if "Watching" doesn't exist
                const hasWatching = result.lists.some((l) => l.name === "Watching" || l.name === "Reading");
                if (!hasWatching && result.lists.length > 0) {
                    setActiveTab(result.lists[0].name);
                } else if (type === 'MANGA') {
                    setActiveTab("Reading");
                } else {
                    setActiveTab("Watching");
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [type]);

    const handleTypeChange = (newType) => {
        setType(newType);
        setSearchQuery("");
    };

    const currentList = data?.find((list) => list.name === activeTab)?.entries || [];

    const filteredList = currentList.filter((entry) => {
        const title = entry?.media?.title?.english || entry?.media?.title?.romaji || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (loading && !data) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-800 dark:border-white"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="w-full pb-20 px-4 md:px-8 font-sans text-slate-800 dark:text-white"
        >


            {/* Header Profile */}
            {userInfo && (
                <motion.div variants={itemVariants} className="mb-10 relative">
                    <div className="h-48 md:h-64 rounded-2xl overflow-hidden bg-slate-200">
                        {userInfo.bannerImage && (
                            <img src={userInfo.bannerImage} alt="banner" className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div className="absolute -bottom-10 left-8 md:bottom-[-3rem] flex items-end gap-4">
                        <img
                            src={userInfo.avatar.large}
                            alt="avatar"
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
                        />
                        <div className="mb-2 md:mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">{userInfo.name}</h1>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{type} LIST</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Controls */}
            <motion.div variants={itemVariants} className="mt-16 md:mt-12 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => handleTypeChange("ANIME")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${type === "ANIME" ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        <FaPlay size={12} /> ANIME
                    </button>
                    <button
                        onClick={() => handleTypeChange("MANGA")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${type === "MANGA" ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        <FaBook size={12} /> MANGA
                    </button>
                </div>

                <div className="relative w-full md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {data?.map((list) => (
                    <button
                        key={list.name}
                        onClick={() => setActiveTab(list.name)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors border ${activeTab === list.name
                            ? "bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900"
                            : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                            }`}
                    >
                        {list.name} <span className="ml-1 opacity-60 text-xs">{list.entries.length}</span>
                    </button>
                ))}
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredList.map((entry) => (
                        <motion.a
                            href={entry.media.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={entry.media.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                            <div className="aspect-[2/3] overflow-hidden relative">
                                <img
                                    src={entry.media.coverImage.large}
                                    alt={entry.media.title.romaji}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                    <FaStar className="text-yellow-400" size={10} />
                                    {entry.score > 0 ? entry.score : "-"}
                                </div>
                                {entry.progress > 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                                        <p className="text-white font-bold text-xs">
                                            Progress: {entry.progress} {entry.media.episodes ? `/ ${entry.media.episodes}` : ""}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm line-clamp-2 min-h-[2.5em]" title={entry.media.title.romaji}>
                                    {entry.media.title.english || entry.media.title.romaji}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize">
                                    {entry.media.format?.replace("_", " ") || "TV"} • {entry.media.seasonYear || "TBA"}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </AnimatePresence>
            </div>

            {filteredList.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No entries found.
                </div>
            )}

        </motion.div>
    );
}

export default Anime;
