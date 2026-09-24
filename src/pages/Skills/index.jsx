import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faXmark,
  faCode,
  faPalette,
  faTools,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import Img from "../../components/img";
import useSEO from "../../hooks/useSEO";

// Icons
import htmlIcon from "../../assets/icons/html.svg";
import cssIcon from "../../assets/icons/css.svg";
import javascriptIcon from "../../assets/icons/javascript.svg";
import typescriptIcon from "../../assets/icons/typescript.svg";
import pythonIcon from "../../assets/icons/python.svg";
import tailwindIcon from "../../assets/icons/tailwind.svg";
import reactIcon from "../../assets/icons/react.svg";
import nodejsIcon from "../../assets/icons/nodejs-dark.svg";
import mongodbIcon from "../../assets/icons/mongodb.svg";
import expressIcon from "../../assets/icons/express.svg";
import nextjsIcon from "../../assets/icons/nextjs.svg";
import postgresqlIcon from "../../assets/icons/postgresql.svg";
import dockerIcon from "../../assets/icons/docker.svg";
import vscodeIcon from "../../assets/icons/vscode.svg";
import githubIcon from "../../assets/icons/github.svg";
import notepadppIcon from "../../assets/icons/notepadplusplus.svg";

import { pageVariants, sectionVariants, containerVariants, itemVariants } from "../../config/animations";

// ========== SKILL CARD ==========
const SkillCard = memo(function SkillCard({ skill, searchQuery }) {
  const percentage = (skill.level / 5) * 100;

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-slate-900 font-bold bg-yellow-200 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getLevelText = (level) => {
    const levels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];
    return levels[level - 1] || "Unknown";
  };

  return (
    <motion.div
      variants={itemVariants}
      className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="size-12 min-w-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          <Img className="size-8" src={skill.img} alt={skill.name} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-white truncate">
              {highlightText(skill.name, searchQuery)}
            </h3>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              {percentage}%
            </span>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            {highlightText(skill.description, searchQuery)}
          </p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-slate-700 dark:bg-slate-400 h-2 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-400">{getLevelText(skill.level)}</span>
              <span className="text-xs text-slate-400">Lv.{skill.level}/5</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ========== MAIN ==========
function Skills() {
  useSEO({
    title: "Skills",
    description: "Explore my tech stack: HTML, CSS, JavaScript, React, Node.js, and other programming languages and frameworks.",
    keywords: "skills, programming, react, javascript, python, developer skills",
    url: "https://forte.is-a.dev/skills"
  });

  const [openCategory, setOpenCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const skillList = [
    { name: "HTML", description: "Core building block of the web, defining structure and semantic content.", img: htmlIcon, level: 4, category: "lang" },
    { name: "CSS", description: "Style sheet language used for designing responsive and modern user interfaces.", img: cssIcon, level: 4, category: "lang" },
    { name: "JavaScript", description: "Versatile language powering dynamic, interactive web experiences.", img: javascriptIcon, level: 3, category: "lang" },
    { name: "TypeScript", description: "Typed superset of JavaScript providing static type checking and better maintainability.", img: typescriptIcon, level: 3, category: "lang" },
    { name: "Python", description: "High-level language great for AI, machine learning, data science, and backend development.", img: pythonIcon, level: 3, category: "lang" },
    { name: "MongoDB", description: "NoSQL database for scalability and flexibility with JSON-like documents.", img: mongodbIcon, level: 3, category: "framework" },
    { name: "PostgreSQL", description: "Advanced open-source relational database known for reliability and performance.", img: postgresqlIcon, level: 3, category: "framework" },
    { name: "ExpressJS", description: "Lightweight Node.js web application framework for building APIs and server-side apps.", img: expressIcon, level: 3, category: "framework" },
    { name: "ReactJS", description: "Popular JavaScript library for building fast, component-based user interfaces.", img: reactIcon, level: 4, category: "framework" },
    { name: "Next.js", description: "React framework supporting SSR, static generation, and full-stack applications.", img: nextjsIcon, level: 3, category: "framework" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid and modern UI development.", img: tailwindIcon, level: 4, category: "framework" },
    { name: "Node.js", description: "JavaScript runtime environment for scalable, event-driven server-side applications.", img: nodejsIcon, level: 3, category: "framework" },
    { name: "Docker", description: "Containerization platform ensuring consistent deployment across environments.", img: dockerIcon, level: 3, category: "tool" },
    { name: "Visual Studio Code", description: "Powerful and lightweight code editor with rich extension support.", img: vscodeIcon, level: 5, category: "tool" },
    { name: "GitHub", description: "Version control and collaboration platform for developers.", img: githubIcon, level: 4, category: "tool" },
    { name: "Notepad++", description: "Simple, fast, and lightweight text and source code editor.", img: notepadppIcon, level: 4, category: "tool" },
  ];

  const categories = [
    { icon: "💻", name: "Programming Languages", filter: "lang", contents: skillList.filter(s => s.category === "lang") },
    { icon: "🎨", name: "Frameworks & Libraries", filter: "framework", contents: skillList.filter(s => s.category === "framework") },
    { icon: "🛠️", name: "Tools & Platforms", filter: "tool", contents: skillList.filter(s => s.category === "tool") },
  ];

  // Filter by search and active filter
  const filteredCategories = categories.map((category) => ({
    ...category,
    contents: category.contents.filter(
      (skill) =>
        (activeFilter === "all" || skill.category === activeFilter) &&
        (skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter(cat => activeFilter === "all" || cat.filter === activeFilter);

  const filterButtons = [
    { id: "all", label: "All", icon: null },
    { id: "lang", label: "Languages", icon: faCode },
    { id: "framework", label: "Frameworks", icon: faPalette },
    { id: "tool", label: "Tools", icon: faTools },
  ];

  const totalSkills = skillList.length;
  const filteredSkillsCount = filteredCategories.reduce((acc, cat) => acc + cat.contents.length, 0);

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="font-bold text-neutral-800 dark:text-white w-full pb-10"
      >
        {/* Header */}
        <motion.div variants={sectionVariants} className="mb-6 flex text-3xl gap-3 font-bold items-center">
          <div className="bg-slate-800 dark:bg-white h-[36px] w-2 rounded"></div>
          <h2>💡 My Skills</h2>
        </motion.div>

        <motion.p variants={sectionVariants} className="text-slate-600 dark:text-slate-300 font-normal mb-6">
          Showcasing the technologies and tools I use to build projects. Total of <span className="font-bold text-slate-800 dark:text-white">{totalSkills}</span> skills 🚀
        </motion.p>

        {/* Search & Filter */}
        <motion.div variants={sectionVariants} className="mb-6 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full md:w-1/2 pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white shadow-sm focus:ring-2 focus:ring-slate-400 focus:border-slate-400 focus:outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeFilter === btn.id
                  ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
              >
                {btn.icon && <FontAwesomeIcon icon={btn.icon} className="text-xs" />}
                {btn.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Found <span className="font-bold text-slate-700 dark:text-slate-200">{filteredSkillsCount}</span> results
            </p>
          )}
        </motion.div>

        {/* Categories */}
        <motion.div variants={sectionVariants} className="space-y-4">
          {filteredCategories.map((category, index) => {
            const isOpen = searchQuery ? true : openCategory === index;
            const skillCount = category.contents.length;

            if (skillCount === 0) return null;

            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Category Header */}
                <div
                  className="cursor-pointer flex justify-between items-center py-4 px-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => toggleCategory(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">{category.name}</h2>
                    <span className="text-xs font-bold text-white bg-slate-700 dark:bg-slate-600 px-2 py-0.5 rounded-full">
                      {skillCount}
                    </span>
                  </div>
                  <FontAwesomeIcon
                    icon={isOpen ? faChevronUp : faChevronDown}
                    className="text-slate-500"
                  />
                </div>

                {/* Category Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="grid md:grid-cols-2 gap-4 p-5 pt-0 overflow-hidden"
                    >
                      {category.contents.map((skill, idx) => (
                        <SkillCard key={idx} skill={skill} searchQuery={searchQuery} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* No results */}
          {filteredSkillsCount === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg">No matching skills found 🔎</p>
              <p className="text-sm mt-2">Try searching with different keywords</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Skills;
