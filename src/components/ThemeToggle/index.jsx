import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Tippy content={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <button
                onClick={toggleTheme}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 border ${isDark
                        ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700 hover:text-yellow-300"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                aria-label="Toggle Theme"
            >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
            </button>
        </Tippy>
    );
};

export default ThemeToggle;
