// src/pages/About/index.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinBeamSweat } from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faEarthAsia,
  faUserGraduate,
  faXmark,
  faImages,
  faChevronLeft,
  faChevronRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ChillImg from "../../assets/imgs/images.jpg";
import Img from "../../components/img";
import HCMUTLogo from "../../assets/imgs/hcmut.png";
import UITLogo from "../../assets/imgs/uit.png";
import useSEO from "../../hooks/useSEO";
import { pageVariants, sectionVariants, containerVariants, itemVariants } from "../../config/animations";
// Gallery import
import Cert1 from "../../assets/gallery/images1.jpg";
import Cert2 from "../../assets/gallery/images2.jpg";
import Cert3 from "../../assets/gallery/images3.jpg";
import Cert4 from "../../assets/gallery/images4.jpg";
import Cert5 from "../../assets/gallery/images5.jpg";
import Cert6 from "../../assets/gallery/images6.jpg";
import Cert7 from "../../assets/gallery/images7.jpg";
import Cert8 from "../../assets/gallery/images8.jpg";
import Cert9 from "../../assets/gallery/images9.jpg";
import Cert10 from "../../assets/gallery/images10.jpg";
import Cert11 from "../../assets/gallery/images11.jpg";
import Cert12 from "../../assets/gallery/images12.jpg";

function About() {
  useSEO({
    title: "About",
    description: "Tìm hiểu về hành trình lập trình, nền tảng học vấn và kinh nghiệm làm việc của tôi. Khám phá các kỹ năng và thành tựu của tôi.",
    keywords: "about, education, experience, skills, UTT, developer",
    url: "https://forte.is-a.dev/"
  });

  const [preview, setPreview] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoHeight, setVideoHeight] = useState("600px");

  const certImages = [
    { src: Cert1, name: "Images 1" },
    { src: Cert2, name: "Images 2" },
    { src: Cert3, name: "Images 3" },
    { src: Cert4, name: "Images 4" },
    { src: Cert5, name: "Images 5" },
    { src: Cert6, name: "Images 6" },
    { src: Cert7, name: "Images 7" },
    { src: Cert8, name: "Images 8" },
    { src: Cert9, name: "Images 9" },
    { src: Cert10, name: "Images 10" },
    { src: Cert11, name: "Images 11" },
    { src: Cert12, name: "Images 12" },
  ];

  const favoriteVideos = [
{
    id: "https://www.youtube.com/embed/NRz-aGV-p2g",
    title: "Music Video",
    thumbnail: "https://img.youtube.com/vi/NRz-aGV-p2g/maxresdefault.jpg",
},
{
    id: "https://www.youtube.com/embed/gJAbDSse5WM",
    title: "Music Video",
    thumbnail: "https://img.youtube.com/vi/gJAbDSse5WM/maxresdefault.jpg",
},
{
    id: "https://www.youtube.com/embed/4jjOH2FR6-E",
    title: "Music Video",
    thumbnail: "https://img.youtube.com/vi/4jjOH2FR6-E/maxresdefault.jpg",
},
  ];

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) setVideoHeight(`${value}px`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >

      <div className="font-extrabold text-neutral-800 dark:text-neutral-200 w-full pb-20 px-4 md:px-8">
        {/* Title */}
        <motion.div
          className="mb-12 flex items-center gap-3 text-3xl font-extrabold"
          variants={itemVariants}
        >
          <div className="bg-neutral-800 dark:bg-white h-[36px] w-2 rounded"></div>
          <h2>About Me 💤</h2>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-10">
            {/* Programming */}
            <motion.section variants={sectionVariants}>
              <h3 className="mb-4 text-xl font-bold flex items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-600">⬤</span>
              Tôi đã học lập trình như thế nào? 🤔
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
Tôi luôn tò mò về cách các website và trò chơi hoạt động. Từ việc sử dụng HTML để thiết kế giao diện, CSS để tạo kiểu, JavaScript để thêm các chức năng, cho đến khi học React vào đầu năm 2024, mỗi bước đi đều mở ra cho tôi một cánh cửa mới để khám phá sâu hơn về thế giới Internet.
              </p>
            </motion.section>

            {/* About site */}
            <motion.section variants={sectionVariants}>
              <h3 className="mb-6 text-xl font-bold flex items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-600">⬤</span>
                Website này được dùng để làm gì? 🍜
              </h3>
              <div className="flex flex-col lg:flex-row gap-6 items-start pl-7">
                <div className="flex-1 order-2 lg:order-1">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    Đây là trang cá nhân, nơi tôi chia sẻ về bản thân, hành trình học tập và lập trình.
Tại đây, bạn có thể tìm hiểu về kỹ năng, kinh nghiệm và những dự án tôi đã thực hiện.
Tôi cũng chia sẻ những kiến thức, thành tựu và góc nhìn của mình về công nghệ.
Hy vọng trang web sẽ giúp bạn hiểu hơn về tôi và mở ra cơ hội kết nối, hợp tác trong tương lai.

                  </p>
                </div>
                <div className="flex-shrink-0 order-1 lg:order-2 self-center lg:self-start">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl"
                  >
                    <Img
                      className="select-none w-48 md:w-56 lg:w-64 transition-transform duration-700 hover:scale-110"
                      alt="img"
                      src={ChillImg}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Videos */}
            <motion.section variants={sectionVariants}>
              <h3 className="mb-6 text-xl font-bold flex items-center gap-3">
                <span className="text-neutral-400 dark:text-neutral-600">⬤</span>
               My Favorite Video
                <FontAwesomeIcon icon={faYoutube} className="text-slate-700 dark:text-slate-300 text-lg" />
              </h3>

              <div className="relative pl-7 px-5">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.video-swiper-next',
                    prevEl: '.video-swiper-prev',
                  }}
                  modules={[Navigation]}
                  className="rounded-xl"
                >
                  {favoriteVideos.map((video, i) => (
                    <SwiperSlide key={i}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow shadow-slate-200/50 dark:shadow-none hover:shadow-xl transition cursor-pointer"
                        onClick={() => setVideoPreview(video)}
                      >
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center">
                            <FontAwesomeIcon icon={faYoutube} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 dark:text-white text-sm">{video.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">YouTube Video</p>
                          </div>
                        </div>

                        {/* Video thumbnail */}
                        <div className="relative aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center group">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="relative z-10 w-14 h-14 rounded-full bg-slate-800/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <FontAwesomeIcon icon={faPlay} className="text-white text-xl ml-1" />
                          </div>
                        </div>

                        <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4">Click to play the video</p>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation buttons */}
                <button className="video-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center hover:bg-slate-700 transition z-10">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="video-swiper-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center hover:bg-slate-700 transition z-10">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center pl-7">
                Click the card to enlarge the video
              </p>
            </motion.section>
          </div>

          {/* Right */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
          >
            {/* Work */}
            <motion.div
              className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow hover:shadow-xl transition transform"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-3 items-center text-slate-700 dark:text-slate-200 font-semibold">
                <FontAwesomeIcon icon={faBriefcase} />
                <p>Work</p>
              </div>
              <div className="flex mt-6 gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-lg flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faEarthAsia} />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium dark:text-white">A Wide World</h5>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                    <p>Free</p>
                    <p>2026 - Now</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow hover:shadow-xl transition transform"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-3 items-center text-slate-700 dark:text-slate-200 font-semibold">
                <FontAwesomeIcon icon={faUserGraduate} />
                <p>Education</p>
              </div>
              {/* UIT */}
              <div className="flex mt-6 gap-3 items-center">
                <Tippy content="UIT - Đại học Công nghệ Thông tin">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border shadow cursor-pointer p-1"
                  >
                    <img
                      src={UITLogo}
                      alt="UIT"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </Tippy>
                <div className="flex-1">
                  <h5 className="text-sm font-medium dark:text-white">University of Transport Technology</h5>
                  <p className="text-sm font-medium dark:text-slate-300">UTT-HN (UTT)</p>
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                    <p>Undergraduate Student</p>
                    <p>Currently Studying</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="https://utt.edu.vn/vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 flex text-sm font-bold items-center gap-2 justify-center transition-all duration-300 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm"
                >
                  <FontAwesomeIcon icon={faFaceGrinBeamSweat} />
                  <span>Web UTT</span>
                </a>
              </div>
            </motion.div>

            {/* Certifications / Images Gallery */}
            <motion.div
              className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header với icon và counter */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 dark:bg-white flex items-center justify-center shadow-sm">
                    <FontAwesomeIcon icon={faImages} className="text-white dark:text-slate-900 text-sm" />
                  </div>
                  <span className="font-bold text-neutral-700 dark:text-neutral-200">Photo Gallery</span>
                </div>
                <div className="px-3 py-1 bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-full shadow-sm">
                  {certImages.findIndex(c => c.name === activeCert) + 1} / {certImages.length}
                </div>
              </div>

              {/* Title hiển thị tên ảnh hiện tại */}
              <p className="text-center mb-4 text-sm">
                <span className="text-slate-500 dark:text-slate-400">View:</span>{' '}
                <span className="font-bold text-slate-700 dark:text-neutral-200">{activeCert}</span>
              </p>

              <Swiper
                effect="cards"
                grabCursor
                initialSlide={Math.floor(certImages.length / 2)}
                modules={[EffectCards]}
                className="max-w-[320px] md:max-w-[360px] mx-auto"
                onSlideChange={(swiper) =>
                  setActiveCert(certImages[swiper.activeIndex].name)
                }
                onInit={(swiper) =>
                  setActiveCert(certImages[swiper.activeIndex].name)
                }
              >
                {certImages.map((cert, i) => (
                  <SwiperSlide
                    key={i}
                    className="rounded-xl cursor-pointer flex items-center justify-center bg-transparent"
                    onClick={() => setPreview(cert)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative w-full overflow-hidden rounded-xl shadow-lg group"
                    >
                      <img
                        src={cert.src}
                        alt={cert.name}
                        className="w-full h-[280px] object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay khi hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <FontAwesomeIcon icon={faImages} className="text-3xl mb-2" />
                          <p className="text-sm font-medium">Click to enlarge</p>
                        </div>
                      </div>
                      {/* Image name badge */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                          <span className="text-sm font-bold text-slate-700">{cert.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation hint */}
              <div className="mt-4 flex items-center justify-center gap-4 text-slate-400 text-xs">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>Drag</span>
                </div>
                <div className="w-16 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                <div className="flex items-center gap-1">
                  <span>Switch</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {videoPreview && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center z-[10001] p-0 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setVideoPreview(null);
                setVideoLoading(true);
              }}
            >
              <motion.div
                className="relative w-full max-w-5xl bg-slate-900 border-t sm:border border-white/10 rounded-t-[2.5rem] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-5 sm:p-6 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider">YouTube</span>
                      <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Video Stream</span>
                    </div>
                    <h3 className="text-white font-bold truncate text-lg sm:text-xl leading-tight">
                      {videoPreview.title}
                    </h3>
                  </div>
                  <button
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-all active:scale-90"
                    onClick={() => {
                      setVideoPreview(null);
                      setVideoLoading(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                  </button>
                </div>

                {/* Video controls helper (Desktop only) */}
                <div className="hidden sm:flex px-6 py-3 bg-black/40 items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                    <p className="text-white/50 text-xs font-medium uppercase">Quality optimized Viewing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-tighter">Height:</label>
                    <input
                      type="text"
                      value={videoHeight.replace("px", "")}
                      onChange={handleHeightChange}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white w-12 text-center text-xs outline-none"
                    />
                    <span className="text-white/40 text-xs">px</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="w-full bg-black relative aspect-video"
                  style={{ height: "auto", maxHeight: "calc(100vh - 160px)" }}
                >
                  {/* Loading Skeleton */}
                  {videoLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-4">
                      <div className="w-10 h-10 border-2 border-slate-700 border-t-white rounded-full animate-spin"></div>
                      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Loading...</p>
                    </div>
                  )}

                  <iframe
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
                    src={videoPreview.id + "?autoplay=1&rel=0&showinfo=0&mute=0"}
                    title={videoPreview.title}
                    allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setVideoLoading(false)}
                    style={{ border: "none" }}
                  ></iframe>
                </div>

                {/* Footer status for mobile */}
                <div className="p-4 sm:hidden bg-black/50 text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Cinema Mode Interactive</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Modal */}
        <AnimatePresence>
          {preview && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[10001] p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreview(null)}
            >
              <motion.div
                className="relative max-w-4xl w-full flex flex-col gap-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center text-white px-2">
                  <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-widest text-white/50 font-bold mb-0.5">Gallery Preview</p>
                    <p className="font-bold text-lg">
                      <span className="text-blue-400">{preview.name}</span>
                    </p>
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-95"
                    onClick={() => setPreview(null)}
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xl" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-neutral-900">
                  <img
                    src={preview.src}
                    alt={preview.name}
                    className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] object-contain mx-auto"
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-center flex-col items-center gap-3">
                  <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/90 text-sm font-bold">
                    {certImages.findIndex(c => c.name === preview.name) + 1} / {certImages.length}
                  </div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">
                    Click outside to exit preview
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default About;