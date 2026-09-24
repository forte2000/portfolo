import Discord from "../../api/userInfo";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faDiscord, faInstagram } from "@fortawesome/free-brands-svg-icons";
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
            href="https://www.instagram.com/yuu_kzzz/"
          >
            <FontAwesomeIcon icon={faInstagram} className="group-hover:text-[#1877F2] transition-colors" />
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
            <img
              src="https://api.iconify.design/simple-icons:zalo.svg"
              alt="Zalo"
              className="w-5 h-5 dark:invert group-hover:dark:invert-0 group-hover:brightness-110 transition-all"
            />
          </a>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;
