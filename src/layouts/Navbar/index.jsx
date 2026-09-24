import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

function Nav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/about";
    return location.pathname.startsWith(path);
  };

  const getNavItemStyle = (path) => {
    const baseStyle = "flex gap-1 px-3 py-1.5 rounded-lg border transition-all duration-200 items-center justify-center";
    if (isActive(path)) {
      return `${baseStyle} bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900 dark:border-white`;
    }
    return `${baseStyle} bg-slate-50 border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-900 dark:hover:border-white`;
  };

  const aboutIcon = (
    <svg
      className="w-4 h-4 text-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M15.5 3.3a1 1 0 0 0-1.4 0l-2 2h.1l6.5 6.5 2-1.9c.4-.4.4-1 0-1.4l-5.2-5.2ZM7 8.3l3.9-1.5 6.3 6.3-1.5 3.9a1 1 0 0 1-.6.6l-9.5 3.3a1 1 0 0 1-1-.1l6.5-6.5A1 1 0 0 0 9.7 13l-6.5 6.4a1 1 0 0 1-.1-1L6.4 9c.1-.3.3-.5.6-.6Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const projectIcon = (
    <svg
      className="w-4 h-4 text-purple-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const skillIcon = (
    <svg
      className="w-4 h-4 text-pink-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const gameIcon = (
    <svg
      className="w-4 h-4 text-emerald-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.4 0 .7 0 1 .2V5a2 2 0 0 0-2-2H5Zm4 10H3v2c0 1.1.9 2 2 2h4v-4Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const animeTrackerIcon = (
    <svg
      className="w-4 h-4 text-sky-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M20,2H4C2.9,2,2,2.9,2,4v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H4V4h16V16z M12,18 c-2.21,0-4,1.79-4,4h8C16,19.79,14.21,18,12,18z"
        clipRule="evenodd"
      />
    </svg>
  );

  const animeIcon = (
    <svg
      className="w-4 h-4 text-indigo-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-9h2v2h-2v-2Zm0-4h2v2h-2V7Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const supportIcon = (
    <svg
      className="w-4 h-4 text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        clipRule="evenodd"
      />
    </svg>
  );

  const navItems = [
    { path: "/", label: "About", icon: aboutIcon },
    { path: "/projects", label: "Projects", icon: projectIcon },
    { path: "/skills", label: "Skills", icon: skillIcon },
    { path: "/games", label: "Games", icon: gameIcon },
    { path: "/anime", label: "Anime", icon: animeTrackerIcon },
    { path: "/pinterest", label: "Pinterest", icon: animeIcon },
    { path: "/nuoitoi", label: "Nuoi Toi", icon: supportIcon },
  ];

  return (
    <div className="p-3 md:p-3.5 rounded-xl shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex gap-2.5 text-neutral-800 dark:text-neutral-200 font-bold text-sm flex-wrap">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <div className={getNavItemStyle(item.path)}>
                {item.label} {item.icon}
              </div>
            </Link>
          ))}
        </div>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Current page indicator */}
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {navItems.find((item) => isActive(item.path))?.label || "Menu"}
          </span>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-2 text-neutral-800 dark:text-neutral-200 font-bold text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={getNavItemStyle(item.path)}>
                    {item.icon} {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
