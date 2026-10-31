import Discord from "../../api/userInfo";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const socialButtonStyle =
    "group rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 size-[42px] items-center flex justify-center text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-md hover:border-slate-400 dark:hover:border-slate-500 hover:bg-white dark:hover:bg-slate-700";

  return (
    <div className="p-4 md:p-4 rounded-xl shadow-sm text-neutral-800 dark:text-neutral-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500">
      <Discord />
      <div className="flex mt-6 gap-3 text-xl justify-center md:justify-start flex-wrap">
        {/* Gmail */}
        <Tippy animation="scale" content="Gmail">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonStyle}
            href="mailto:luongloi2008lc@gmail.com"
          >
            <FontAwesomeIcon icon={faEnvelope} className="group-hover:text-red-500 transition-colors" />
          </a>
        </Tippy>

        {/* Github */}
        <Tippy animation="scale" content="Github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonStyle}
            href="https://github.com/forte2000"
          >
            <FontAwesomeIcon icon={faGithub} className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
          </a>
        </Tippy>

        {/* Discord */}
        <Tippy animation="scale" content="Discord">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonStyle}
            href="https://discord.com/users/805390931640451072"
          >
            <FontAwesomeIcon icon={faDiscord} className="group-hover:text-[#5865F2] transition-colors" />
          </a>
        </Tippy>

        {/* instagram */}
        <Tippy animation="scale" content="Instagram">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonStyle}
            href="https://www.instagram.com/july_2278/"
          >
            <FontAwesomeIcon icon={faInstagram} className="group-hover:text-[#E4405F] transition-colors" />
          </a>
        </Tippy>

        {/* Zalo */}
        <Tippy animation="scale" content="Zalo">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={socialButtonStyle}
            href="https://zalo.me/0399330519"
          >
            <svg
              className="w-5 h-5 group-hover:text-[#0068FF] transition-colors"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 0 1-.577-.573v.001a3.27 3.27 0 0 1-1.938.632a3.284 3.284 0 0 1-3.284-3.282a3.284 3.284 0 0 1 3.284-3.282a3.27 3.27 0 0 1 1.937.632zM6.919 7.79v.205c0 .382-.051.694-.3 1.06l-.03.034a8 8 0 0 0-.242.285L2.024 14.8h4.895v.768a.576.576 0 0 1-.577.576H0v-.362c0-.443.11-.641.25-.847L4.858 9.23H.192V7.79zm8.551 8.354a.48.48 0 0 1-.48-.48V7.79h1.441v8.354zM20.693 9.6a3.306 3.306 0 1 1 .002 6.612a3.306 3.306 0 0 1-.002-6.612m-10.14 5.253a1.932 1.932 0 1 0 0-3.863a1.932 1.932 0 0 0 0 3.863m10.14-.003a1.945 1.945 0 1 0 0-3.89a1.945 1.945 0 0 0 0 3.89" />
            </svg>
          </a>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;
