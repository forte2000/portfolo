import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSEO from "../../hooks/useSEO";
import { pinterest } from "../../config/pinterest";
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

function PinterestPage() {
  useSEO({
    title: "Pinterest",
    description: "Browse my collection of Pinterest images and inspiration. Explore designs and artwork that inspire me.",
    keywords: "pinterest, images, gallery, design inspiration, art",
    url: "https://forte.is-a.dev/pinterest"
  });

  const [currentIndex, setCurrentIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const modalData = currentIndex !== null ? pinterest[currentIndex] : null;

  const handleImageLoad = (rank) => {
    setLoadedImages((prev) => ({ ...prev, [rank]: true }));
  };

  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);

  const goNext = useCallback(() => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev + 1) % pinterest.length);
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev - 1 + pinterest.length) % pinterest.length);
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >


      <Heading name="Pinterest" emoji="🌟" sId="pinterest" />
      <p className="mt-1 text-neutral-500 text-sm mb-6">
        Pinterest Image Preview · {pinterest.length} images
      </p>

      {/* Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {pinterest.map(({ rank, name, description, image }, index) => (
          <motion.div
            key={rank}
            variants={itemVariants}
            className="group relative aspect-[7/8] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => openModal(index)}
          >
            {/* Skeleton */}
            {!loadedImages[rank] && (
              <div className="absolute inset-0 bg-neutral-200 dark:bg-slate-700 animate-pulse" />
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

            {/* Overlay - Always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
              <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                <span className="text-slate-300">{rank}</span> {name}
              </p>
              <p className="text-white/70 text-xs mt-1 line-clamp-1">
                # {description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal Preview */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            {/* Desktop Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 text-2xl"
            >
              <span className="mb-1 mr-1">◀</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 text-2xl"
            >
              <span className="mb-1 ml-1">▶</span>
            </button>

            <motion.div
              className="bg-slate-900 border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-2xl overflow-hidden shadow-2xl sm:max-w-xl max-w-full w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col relative"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div className="flex-1 min-w-0">
                  <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">
                    Pinterest Gallery • {currentIndex + 1} / {pinterest.length}
                  </p>
                  <h3 className="text-white font-bold truncate text-lg">
                    {modalData.name}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Main Content Area */}
              <div className="overflow-y-auto flex-1 scrollbar-hide">
                {/* Image Container */}
                <div className="bg-black/40 flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
                  <motion.img
                    key={modalData.image}
                    src={modalData.image}
                    alt={modalData.name}
                    className="max-w-full h-auto max-h-[65vh] object-contain sm:p-5 shadow-2xl"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </div>

                {/* Info Container */}
                <motion.div
                  className="p-6 sm:p-8 space-y-4 bg-gradient-to-b from-slate-900 to-black text-center sm:text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white/80 leading-relaxed">
                        {modalData.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20 uppercase">
                          Pinterest
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase">
                          Inspiration
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-center shrink-0">
                      <a
                        href={modalData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition shadow-lg shadow-red-900/40"
                      >
                        Source ↗
                      </a>
                      <a
                        href={modalData.image}
                        download
                        className="w-12 h-12 inline-flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition border border-white/10"
                        title="Download Image"
                      >
                        ⬇
                      </a>
                    </div>
                  </div>

                  {/* Mobile Navigation controls */}
                  <div className="flex sm:hidden items-center justify-between pt-6 border-t border-white/5">
                    <button onClick={goPrev} className="px-4 py-2 rounded-lg bg-white/5 text-white/50 font-bold active:bg-white/10 transition">
                      Prev
                    </button>
                    <div className="h-1 w-12 bg-white/10 rounded-full" />
                    <button onClick={goNext} className="px-4 py-2 rounded-lg bg-white/5 text-white/50 font-bold active:bg-white/10 transition">
                      Next
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Skeleton khi load
const PinterestPageSkeleton = () => {
  const dummyData = Array(6).fill(0);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {dummyData.map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-neutral-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  );
};

// Lazy load
const LazyPinterestPage = React.lazy(() =>
  Promise.resolve({ default: PinterestPage })
);

export default function PinterestPageWrapper() {
  return (
    <React.Suspense fallback={<PinterestPageSkeleton />}>
      <LazyPinterestPage />
    </React.Suspense>
  );
}
