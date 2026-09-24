import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import useSEO from "../../hooks/useSEO";
import { hentaiList } from "../../config/hentai";
import { pageVariants, containerVariants, itemVariants } from "../../config/animations";

// Heading component
const Heading = ({ name, emoji, sId }) => (
    <h2 id={sId} className="text-2xl font-bold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
        <span>{emoji}</span> {name}
    </h2>
);

// Modal image animation
const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function HentaiListPage() {
    useSEO({
        title: "My Hentai Collection",
        description: "My Favorite Featured Collection",
        keywords: "collection, gallery, art, anime",
        url: "https://forte.is-a.dev/fav-hentai-list"
    });

    const [currentIndex, setCurrentIndex] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const modalData = currentIndex !== null ? hentaiList[currentIndex] : null;

    const handleImageLoad = (rank) => {
        setLoadedImages((prev) => ({ ...prev, [rank]: true }));
    };

    const openModal = (index) => setCurrentIndex(index);
    const closeModal = () => setCurrentIndex(null);

    const goNext = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((prev) => (prev + 1) % hentaiList.length);
        }
    }, [currentIndex]);

    const goPrev = useCallback(() => {
        if (currentIndex !== null) {
            setCurrentIndex((prev) => (prev - 1 + hentaiList.length) % hentaiList.length);
        }
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (currentIndex === null) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, goNext, goPrev]);

    // Lock body scroll when warning is active
    useEffect(() => {
        if (!isVerified) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isVerified]);

    if (!isVerified) {
        return createPortal(
            <motion.div
                className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-slate-950/40 backdrop-blur-xl px-0 sm:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="max-w-md w-full bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2rem] p-8 sm:p-10 text-center shadow-2xl border-t sm:border border-white/20 dark:border-slate-800"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <div className="w-16 h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-8 sm:hidden opacity-50" />

                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-20 animate-pulse" />
                        <div className="relative text-6xl">🔞</div>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">Content Warning</h2>
                    <h3 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-6">Adult Content (18+)</h3>

                    <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed max-w-[280px] mx-auto">
                        This page contains adult content and is only suitable for adults.<br />
                        By continuing, you confirm that you are 18 or older.
                    </p>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => {
                                setIsVerified(true);
                                document.body.style.overflow = 'auto';
                            }}
                            className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-pink-600 hover:scale-[1.02] active:scale-95 text-white font-bold transition-all shadow-xl shadow-pink-900/20"
                        >
                            I am 18 or older, continue browsing
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold transition-all"
                        >
                            Back to Home
                        </button>
                    </div>

                    <p className="mt-8 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                        Safe & Secure Browsing Experience
                    </p>
                </motion.div>
            </motion.div>,
            document.body
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="w-full"
        >
            <Heading name="My Hentai Collection" emoji="🔞" sId="hentai-list" />
            <p className="mt-1 text-neutral-500 text-sm mb-6">
                Private Collection · {hentaiList.length} Item
            </p>

            {/* Grid Layout */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {hentaiList.map(({ rank, name, description, image }, index) => (
                    <motion.div
                        key={rank}
                        variants={itemVariants}
                        className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-pink-500/30"
                        onClick={() => openModal(index)}
                    >
                        {/* Skeleton */}
                        {!loadedImages[rank] && (
                            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                        )}

                        {/* Image */}
                        <img
                            src={image}
                            alt={name}
                            loading="lazy"
                            onLoad={() => handleImageLoad(rank)}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadedImages[rank] ? "opacity-100" : "opacity-0"
                                }`}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 opacity-100 transition-opacity duration-300">
                            <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                                {name}
                            </p>
                            <p className="text-pink-300 text-xs mt-1 line-clamp-1">
                                {description}
                            </p>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-2 right-2 bg-pink-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                            #{rank}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal Preview */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeModal}
                    >
                        {/* Desktop Nav */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 items-center justify-center rounded-full bg-pink-600/20 hover:bg-pink-600 text-white transition-all border border-pink-600/30 text-2xl"
                        >
                            ◀
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 items-center justify-center rounded-full bg-pink-600/20 hover:bg-pink-600 text-white transition-all border border-pink-600/30 text-2xl"
                        >
                            ▶
                        </button>

                        <motion.div
                            className="bg-slate-950 border-t sm:border border-pink-500/20 rounded-t-[2.5rem] sm:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(219,39,119,0.2)] max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col relative"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-5 flex items-center justify-between border-b border-white/5 bg-white/5">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Top {modalData.rank}</span>
                                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Detail View</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white truncate leading-tight">
                                        {modalData.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto flex-1 scrollbar-hide bg-slate-950">
                                <div className="relative group min-h-[300px] flex items-center justify-center bg-black/50">
                                    <motion.img
                                        key={modalData.image}
                                        src={modalData.image}
                                        alt={modalData.name}
                                        className="w-full h-auto max-h-[60vh] object-contain sm:p-2"
                                        variants={imageVariants}
                                        initial="hidden"
                                        animate="visible"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />
                                </div>

                                <motion.div
                                    className="p-8 text-center sm:text-left space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-slate-300 leading-relaxed text-lg italic font-serif">
                                        "{modalData.description}"
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                                        <a
                                            href={modalData.url || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-900/40"
                                        >
                                            View Original Source ↗
                                        </a>

                                        {/* Mobile Next/Prev helpers */}
                                        <div className="flex sm:hidden gap-2">
                                            <button onClick={goPrev} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white/70 font-bold border border-white/10">Prev</button>
                                            <button onClick={goNext} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white/70 font-bold border border-white/10">Next</button>
                                        </div>
                                    </div>

                                    <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest pt-4">
                                        Collection Slide {currentIndex + 1} of {hentaiList.length}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const HentaiListPageSkeleton = () => {
    const dummyData = Array(4).fill(0);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {dummyData.map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-200 rounded-2xl animate-pulse"></div>
            ))}
        </div>
    );
};

const LazyHentaiListPage = React.lazy(() =>
    Promise.resolve({ default: HentaiListPage })
);

export default function HentaiListPageWrapper() {
    return (
        <React.Suspense fallback={<HentaiListPageSkeleton />}>
            <LazyHentaiListPage />
        </React.Suspense>
    );
}
