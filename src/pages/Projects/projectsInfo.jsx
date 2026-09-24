// src/pages/Projects/projectsInfo.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // ✅ render HTML trong markdown
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import "./readme.scss";

const ProjectDetails = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState(null);
  const [readme, setReadme] = useState(null);
  const [error, setError] = useState(null);
  const [languages, setLanguages] = useState(null);
  const userGithub = "forte";

  // ✅ Fetch README.md dựa trên default_branch
  const fetchReadme = useCallback(
    async (branch) => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${userGithub}/${projectName}/${branch}/README.md`
        );
        if (response.ok) {
          let data = await response.text();

          // 🔥 Fix ảnh Markdown ![alt](./path)
          data = data.replace(
            /!\[(.*?)\]\((\.\/.*?)\)/g,
            (match, alt, path) =>
              `![${alt}](https://raw.githubusercontent.com/${userGithub}/${projectName}/${branch}/${path.replace("./", "")})`
          );

          // 🔥 Fix ảnh HTML <img src="./path">
          data = data.replace(
            /<img([^>]+)src=["']\.\/(.*?)["']([^>]*)>/g,
            (match, before, path, after) =>
              `<img${before}src="https://raw.githubusercontent.com/${userGithub}/${projectName}/${branch}/${path}"${after}>`
          );

          setReadme(
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {data}
            </ReactMarkdown>
          );
          return true;
        }
      } catch (err) {
        console.error("Fetch README error:", err);
      }
      setReadme(
        <p className="text-slate-600 italic">❌ No README.md found in this repository</p>
      );
      return false;
    },
    [projectName]
  );

  // ✅ Fetch repo details (lấy default_branch)
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${userGithub}/${projectName}`
        );
        if (!response.ok) throw new Error("No repository found");
        const data = await response.json();
        setProject(data);

        // lấy branch mặc định
        const branch = data.default_branch || "main";
        await fetchReadme(branch);
      } catch (err) {
        setError(err);
      }
    };
    fetchProjectDetails();
  }, [projectName, fetchReadme]);

  // ✅ Fetch repo languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${userGithub}/${projectName}/languages`
        );
        if (!response.ok) throw new Error("Unable to fetch languages");
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchLanguages();
  }, [projectName]);

  let totalLines = 0;
  if (languages) totalLines = Object.values(languages).reduce((a, b) => a + b, 0);

  useEffect(() => {
    document.title = `📂 ${projectName} My Project`;
  }, [projectName]);

  return (
    <motion.div
      className="w-full font-bold text-slate-900 dark:text-slate-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl mb-1">{projectName}</h2>

      {/* Button GitHub Repo */}
      {project && (
        <motion.a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 mb-4 px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-slate-900 dark:hover:bg-slate-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub size={24} /> View on GitHub
        </motion.a>
      )}

      {error ? (
        <p className="text-red-600">Error: {error.message || String(error)}</p>
      ) : project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p>Description: {project.description || "No description available"}</p>

          {/* Stats */}
          <div className="flex gap-6 mt-2 text-sm text-slate-700 dark:text-slate-400">
            <span>⭐ Stars: {project.stargazers_count}</span>
            <span>🍴 Forks: {project.forks_count}</span>
            <span>👀 Watchers: {project.watchers_count}</span>
            <span>🐞 Issues: {project.open_issues_count}</span>
          </div>

          {/* Languages */}
          {languages ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="mt-4">Languages:</h3>
              <div className="w-full flex mt-1 rounded-full overflow-hidden">
                {Object.keys(languages).map((lang, idx) => (
                  <div
                    key={idx}
                    className={`${getLanguageColor(lang)} h-4`}
                    style={{ width: `${(languages[lang] / totalLines) * 100}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex gap-x-8 mt-2 flex-wrap">
                {Object.keys(languages).map((lang, idx) => (
                  <div key={idx} className="text-sm">
                    {lang}{" "}
                    <span className="text-slate-600 dark:text-slate-400">
                      ({((languages[lang] / totalLines) * 100).toFixed(2)}%)
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="w-full rounded-xl bg-slate-300 dark:bg-slate-700 animate-pulse h-12 mt-2"></div>
          )}

          {/* README */}
          <motion.div
            className="mt-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="ml-2 pt-2 text-slate-900 dark:text-white">📄 README.md</h3>
            <div className="p-6 readme dark:text-slate-300 dark:prose-invert">{readme}</div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="w-56 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse h-4 mt-2"></div>
      )}
    </motion.div>
  );
};

export default ProjectDetails;

const getLanguageColor = (language) => {
  switch (language.toLowerCase()) {
    case "javascript": return "bg-[#F1E05A]";
    case "html": return "bg-[#E34C26]";
    case "css": return "bg-[#563D7B]";
    case "scss": return "bg-[#C6538C]";
    case "python": return "bg-[#3472A5]";
    case "c++": return "bg-[#F34B7D]";
    case "typescript": return "bg-[#3078C6]";
    case "pug": return "bg-[#A86454]";
    case "java": return "bg-[#B07219]";
    case "objective-c": return "bg-[#448DFB]";
    case "objective-c++": return "bg-[#6866FA]";
    case "kotlin": return "bg-[#AA7AFA]";
    case "ruby": return "bg-[#701516]";
    case "cmake": return "bg-[#DA3434]";
    case "c": return "bg-[#13171D]";
    case "c#": return "bg-[#16861F]";
    case "php": return "bg-[#4F5D95]";
    case "shell": return "bg-[#8AE053]";
    default: return "bg-slate-300";
  }
};
