import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { AnimatePresence, motion } from "framer-motion";
import SpotifyVisualizer from "../components/SpotifyVisualizer";
import SpotifyAvatarRing from "../components/SpotifyAvatarRing";

function CustomStatus({ customStatus }) {
  return (
    <>
      {customStatus && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-[2px]">
          ▸ {customStatus.emoji && <span className="mr-1">{customStatus.emoji.name}</span>}
          {customStatus.state}
        </p>
      )}
    </>
  );
}

function UserInfo() {
  const userId = "805390931640451072";

  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWeather, setIsWeather] = useState(false);
  const [weather, setWeather] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Avatar decoration (frame)
  const [avatarFrame, setAvatarFrame] = useState(null);

  // Preview modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.lanyard.rest/v1/users/${userId}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=Lao%20Cai&appid=a601622a383aee1aea5573743d8e8875&units=metric&lang=vi"
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAvatarFrame = async () => {
    try {
      const res = await fetch(`https://discord-lookup-api-alpha.vercel.app/v1/user/${userId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data?.avatar_decoration?.asset) {
        setAvatarFrame(`https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration.asset}`);
      } else {
        setAvatarFrame(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAvatarFrame(null);
    }
  };

  useEffect(() => {
    fetchData();
    fetchWeather();
    fetchAvatarFrame();

    const intervalId = setInterval(() => {
      fetchData();
      fetchWeather();
      fetchAvatarFrame();
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const startTimestamp = userData?.activities?.find((a) => a.type === 0)?.timestamps?.start;
    if (!startTimestamp) return;

    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userData]);

  const formatElapsedTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds || 0) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  if (!userData || !weather) {
    return (
      <>
        <div className="md:flex gap-6 items-center">
          <div className="md:m-0 mb-5 mx-auto rounded-full min-w-32 size-32 overflow-hidden border-4 border-slate-700">
            <div className="rounded-full overflow-hidden border-4 border-transparent">
              <div className="size-[112px] bg-slate-300 animate-pulse"></div>
            </div>
          </div>
          <div className="text-gray-900 dark:text-gray-100">
            <h2 className="font-semibold text-2xl">
              Hi , I`m{" "}
              <Tippy animation="scale" content="Quang Huy">
                <span className="text-slate-700 dark:text-slate-200">Forte</span>
              </Tippy>{" "}
              👋
            </h2>
            <div className="w-full h-1 bg-slate-700 rounded-sm my-1"></div>
            <div className="font-semibold text-justify">
              Halo Halo I`m Forte (<span className="text-slate-700 dark:text-slate-300">200x</span>), Deverloper, Designer Minecraft{" "}
              <Link className="text-slate-600 dark:text-slate-400 underline" to="/skills">
                About me ?
              </Link>{" "}
              ✒️
            </div>
          </div>
        </div>
        <div className="w-56 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse h-4 mt-4"></div>
        <div className="w-52 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse h-4 mt-3"></div>
      </>
    );
  }

  const { discord_user, activities = [], discord_status } = userData;
  const customStatus = activities.find((activity) => activity.type === 4);


  // STATUS UI (khôi phục đầy đủ)
  const online = (
    <div className="flex items-center">
      <div className="translate-y-[-1px] size-3 rounded-full bg-green-500">
        <div className="size-3 rounded-full bg-green-500 animate-ping"></div>
      </div>
      <div
        className="ml-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>Online</p>
        {isHovered && (
          <div className="cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border-dashed border-slate-400 dark:border-slate-600 border-4">
            <p className="font-bold">Tôi đang ở nhà 🏡 Hay quán Cafe nào đó ☕</p>
            {activities.length > 0 &&
              activities.map((activity) => (
                <div className="" key={`${activity?.id || activity?.name || "act"}-${activity?.type}`}>
                  {activity.type === 0 && (
                    <p>
                      ▸ Hoạt Động 🌠: {activity.name}{" "}
                      <span className="text-sm text-slate-600 dark:text-slate-400">({formatElapsedTime(elapsedTime)} Đã Qua Rồi!)</span>
                    </p>
                  )}
                </div>
              ))}

            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const idle = (
    <div className="flex items-center">
      <div className="translate-y-[-1px] size-3 rounded-full bg-yellow-500">
        <div className="size-3 rounded-full bg-yellow-500 animate-ping"></div>
      </div>
      <div
        className="ml-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>Idle</p>
        {isHovered && (
          <div className="cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-dashed border-slate-400 dark:border-slate-600 border-4">
            <p>🧩 Có vẻ đang làm việc khác</p>

            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const offline = (
    <div className="flex items-center">
      <div className="translate-y-[-1px] size-3 rounded-full bg-red-600">
        <div className="size-3 rounded-full bg-red-600 animate-ping"></div>
      </div>
      <div
        className="ml-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>Offline</p>
        {isHovered && (
          <div className="cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-dashed border-slate-400 dark:border-slate-600 border-4">
            <p>Ra ngoài🚪Hoạc đang ngủ 💤</p>
            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  const dnd = (
    <div className="flex items-center">
      <div className="translate-y-[-1px] size-3 rounded-full bg-red-900">
        <div className="size-3 rounded-full bg-red-900 animate-ping"></div>
      </div>
      <div
        className="ml-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>Do Not Disturb</p>
        {isHovered && (
          <div className="cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-dashed border-slate-400 dark:border-slate-600 border-4">
            <p>Không muốn bị làm phiền 🚫!</p>

            <CustomStatus customStatus={customStatus} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Left Column: User Info */}
      <div className="w-full">
        <div className="md:flex gap-6 items-center">
          <div
            className="relative md:m-0 mb-5 mx-auto min-w-32 size-32 cursor-pointer z-30"
            onClick={() => setIsPreviewOpen(true)}
            role="button"
            aria-label="Open avatar preview"
          >
            {/* Spotify Animation Ring */}
            <SpotifyAvatarRing isPlaying={!!userData?.spotify} />

            {/* Avatar image */}
            <img
              className="rounded-full w-full h-full object-cover border-4 border-slate-700 relative z-10"
              src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=256`}
              alt="Avatar"
            />
            {/* Avatar frame overlay */}
            {avatarFrame && (
              <img
                src={avatarFrame}
                alt="Avatar Frame"
                className="absolute inset-0 w-full h-full rounded-full z-20 pointer-events-none"
              />
            )}
          </div>

          <div className="text-gray-900 dark:text-gray-100">
            <h2 className="font-semibold text-2xl">
              Hi, I`m{" "}
              <Tippy animation="scale" content="Quang Huy">
                <span className="text-slate-700 dark:text-slate-200">Forte</span>
              </Tippy>{" "}
              👋
            </h2>
            <div className="w-full h-1 bg-slate-700 rounded-sm my-1"></div>
            <div className="font-semibold text-justify">
              Halo Halo I`m Forte(<span className="text-slate-700 dark:text-slate-300">200x</span>),I am a Freelance Developer specializing in full-cycle website and mobile application solutions. Rather than just writing code, I focus on optimizing performance, enhancing security, and delivering practical solutions that drive digital transformation and business growth for my clients. {" "}
              <Link className="text-slate-600 dark:text-slate-400 underline" to="/skills">
                About Me?
              </Link>{" "}
              ✎
            </div>
          </div>
        </div>

        {/* status line */}
        <div className="font-semibold text-gray-900 dark:text-gray-100 mt-4">
          {discord_status === "online" ? online : discord_status === "idle" ? idle : discord_status === "dnd" ? dnd : offline}
        </div>

        {/* location + weather hover */}
        <div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-gray-200 -translate-x-[4px] -translate-y-[1px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a8 8 0 0 1 6.6 12.6l-.1.1-.6.7-5.1 6.2a1 1 0 0 1-1.6 0L6 15.3l-.3-.4-.2-.2v-.2A8 8 0 0 1 11.8 2Zm3 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div
              className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
              onMouseEnter={() => setIsWeather(true)}
              onMouseLeave={() => setIsWeather(false)}
            >
              <p>Lào Cai, Việt Nam</p>
              {isWeather && weather && (
                <div className="cursor-text absolute z-10 translate-x-[-20px] p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-dashed border-slate-400 dark:border-slate-600 border-4">
                  <p>⛺ City: {weather?.name}</p>
                  <p>⛅ Temperature: {Math.round(weather?.main?.temp)} ºC</p>
                  <p>🚿 Humidity: {weather?.main?.humidity}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Spotify */}
      <AnimatePresence>
        {userData?.spotify && (
          <div className="w-full lg:w-[320px] mt-4 lg:mt-0 lg:absolute lg:-bottom-8 lg:right-0">
            <SpotifyVisualizer spotify={userData.spotify} />
          </div>
        )}
      </AnimatePresence>

      {/* Preview modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-sm w-full bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-4 sm:p-5 shadow-[0_0_50px_rgba(0,0,0,0.3)] border-t sm:border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle for mobile */}
              <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6 sm:hidden opacity-50" />

              <div className="relative group aspect-square w-full overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800 shadow-inner border border-slate-200 dark:border-slate-800">
                <img
                  src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=1024`}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {avatarFrame && (
                  <img
                    src={avatarFrame}
                    alt="Avatar Frame"
                    className="absolute inset-0 w-full h-full z-20 pointer-events-none scale-[1.02]"
                  />
                )}
              </div>

              {/* User info box at bottom */}
              <div className="mt-5 pb-2 text-center">
                <p className="text-xl font-black text-slate-800 dark:text-white pb-1 tracking-tight">
                  @{discord_user.username}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">Discord Profile Preview</p>
                </div>
              </div>

              {/* Close Button Mobile/Desktop footer style */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="mt-6 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-xl sm:hidden"
              >
                Close Preview
              </button>

              {/* Desktop Close Button */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="hidden sm:flex absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 shadow-xl rounded-full items-center justify-center text-slate-800 dark:text-white font-bold z-50 border border-slate-100 dark:border-slate-800 hover:rotate-90 transition-all active:scale-90"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserInfo;
