
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";

import useSEO from "../../hooks/useSEO";
import { pageVariants } from "../../config/animations";
import { fetchNews, fetchCodes } from "../../api/hoyoverse";

import GameHeader from "./components/GameHeader";

// Components
import GameCarousel from "./components/GameCarousel";
import SearchBar from "./components/SearchBar";
import EventCard from "./components/EventCard";
import CodeCard from "./components/CodeCard";
import SkeletonCard from "./components/SkeletonCard";
import Pagination from "./components/Pagination";
import EventModal from "./components/EventModal";
import Toast from "./components/Toast";

// Data & Utils
import {
  t,
  GAME_THEMES,
  ACTIVE_COLORS,
  TOP_GAMES,
  ALL_GAMES,
  GAME_SELECTOR_ITEMS,
  TABS
} from "./constants";
import { classNames } from "./utils";

export default function Games() {
  useSEO({
    title: "Games - Explore the game world",
    description: "Genshin Impact, Honkai Star Rail events and codes.",
    keywords: "genshin, star rail, codes, events",
    url: "https://Forte.is-a.dev/games"
  });

  const [activeGame, setActiveGame] = useState("genshin");
  const [activeTab, setActiveTab] = useState("news");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [codes, setCodes] = useState([]);
  const [toast, setToast] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [copied, setCopied] = useState(null);
  const abortRef = useRef(null);

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const paginated = useMemo(() => {
    return items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  }, [items, page]);

  useEffect(() => {
    setPage(1);
  }, [items, activeTab]);

  const load = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      let news = [];
      let codeList = [];

      if (activeTab === "news") {
        news = (await fetchNews(activeGame, { signal: abortRef.current.signal })) || [];
        news = news.map((n) => ({
          ...n,
          is_active: n.end_time ? Date.now() / 1000 < n.end_time : true
        }));
        news.sort((a, b) => (b.created_at || b.createdAt || 0) - (a.created_at || a.createdAt || 0));
      } else {
        const cd = await fetchCodes(activeGame, { signal: abortRef.current.signal });
        codeList = [
          ...(cd?.active || []).map(c => ({ ...c, is_active: true })),
          ...(cd?.inactive || []).map(c => ({ ...c, is_active: false }))
        ];
      }

      setItems(news);
      setCodes(codeList);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(true);
        console.error('Load error:', err);
      }
      setItems([]);
      setCodes([]);
    } finally {
      setLoading(false);
    }
  }, [activeGame, activeTab]);

  useEffect(() => {
    document.title = "Games | LumiYi";
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const handleCopy = useCallback((codeStr) => {
    navigator.clipboard.writeText(codeStr).then(() => {
      setCopied(codeStr);
      setToast(`${t.copied} ${codeStr}`);
      setTimeout(() => setCopied(null), 2500);
    }).catch(err => {
      console.error('Copy failed:', err);
      setToast("Copy failed, please try again", "error");
    });
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const handleGameChange = useCallback((game) => {
    setActiveGame(game);
    setPage(1);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  }, [totalPages]);

  const handleSearch = useCallback((query) => {
    console.log('Search:', query);
    setToast("Search is still being developed...", "success");
  }, []);

  const activeThemeColor = ACTIVE_COLORS[activeGame] || ACTIVE_COLORS.default;
  const activeGradient = GAME_THEMES[activeGame] || GAME_THEMES.default;

  return (
    <>

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen bg-gradient-to-br ${activeGradient} transition-colors duration-1000 py-6 sm:py-8 overflow-x-hidden`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">

          {/* Smart Header */}
          <GameHeader activeGame={activeGame} />

          {/* Games carousels */}
          <div className="mb-12 space-y-8">
            <GameCarousel items={TOP_GAMES} title={t.topGames} />
            <GameCarousel items={ALL_GAMES} title={t.allGames} />
          </div>

          {/* sticky toolbar section */}
          <div className="sticky top-2 sm:top-4 z-40 mb-6 sm:mb-8">
            <motion.div
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[1.2rem] sm:rounded-[1.5rem] p-2 sm:p-3 shadow-xl border border-white/60 dark:border-slate-700 flex flex-col lg:flex-row justify-between items-center gap-2 sm:gap-4 transition-all duration-300"
              layout
            >
              {/* Horizontal Scrollable Game Selector */}
              <div className="w-full lg:w-auto overflow-x-auto hide-scrollbar">
                <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 p-1 min-w-max w-full">
                  {GAME_SELECTOR_ITEMS.map((g) => (
                    <motion.button
                      key={g.id}
                      onClick={() => handleGameChange(g.id)}
                      className={classNames(
                        'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border flex-shrink-0 flex-1 sm:flex-none justify-center',
                        activeGame === g.id
                          ? `bg-slate-800 text-white shadow-lg border-transparent transform scale-105 dark:bg-slate-700`
                          : 'bg-white/50 text-slate-600 hover:bg-white border-transparent hover:shadow-md dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                      )}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={g.icon} alt={g.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-md object-cover" />
                      {g.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl flex items-center gap-1 w-full lg:w-auto border border-slate-200/50 dark:border-slate-700/50">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={classNames(
                      "flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 relative",
                      activeTab === tab.id ? "text-slate-800 shadow-sm bg-white" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-black/5 dark:border-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeTab === tab.id ? 'dark:text-white' : ''}`}>{tab.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <motion.div
            className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 min-h-[500px] border border-white/50 dark:border-slate-700/50"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className={classNames("w-1.5 h-8 rounded-full", activeThemeColor.split(' ')[0])}></div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                {activeTab === 'news' ? t.gameEvents : t.activeCodes}
              </h2>
            </div>

            <SearchBar onSearch={handleSearch} />

            {error && (
              <motion.div
                className="text-red-500 mb-8 p-6 bg-red-50/90 rounded-2xl text-center border border-red-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="font-bold">{t.errorLoading}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {activeTab === 'news' ? (
                <motion.div
                  key="news"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {loading ? (
                      Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : paginated.length > 0 ? (
                      paginated.map((event, index) => (
                        <div key={event.id || index}>
                          <EventCard event={event} onClick={setSelectedEvent} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center text-slate-400">
                        <p className="text-xl font-bold">No event data available</p>
                      </div>
                    )}
                  </div>
                  <Pagination current={page} total={totalPages} onChange={handlePageChange} />
                </motion.div>
              ) : (
                <motion.div
                  key="codes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading ? (
                      Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} height={100} />)
                    ) : codes.length > 0 ? (
                      codes.map((code, index) => (
                        <div key={code.code}>
                          <CodeCard codeObj={code} onCopy={handleCopy} copied={copied} />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center text-slate-400">
                        <p className="text-xl font-bold">No redeem codes available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {selectedEvent && (
              <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </AnimatePresence>

          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <Toast
                message={toast}
                onClose={() => setToast(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Global Styles for hide-scrollbar */}
        <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.div>
    </>
  );
}
