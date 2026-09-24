import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faStar, faBook, faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faHtml5, faJs, faPython, faJava, faPhp, faSwift, faCss3 } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const blacklist = [];

const langColors = {
  JavaScript: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-300 dark:border-yellow-700" },
  TypeScript: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-300 dark:border-blue-700" },
  HTML: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-300 dark:border-orange-700" },
  Python: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-300 dark:border-green-700" },
  Java: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", border: "border-red-300 dark:border-red-700" },
  PHP: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-300 dark:border-purple-700" },
  Swift: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-300 dark:border-orange-700" },
  CSS: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-300 dark:border-blue-700" },
};

const langIcon = {
  JavaScript: faJs,
  HTML: faHtml5,
  Python: faPython,
  Java: faJava,
  PHP: faPhp,
  Swift: faSwift,
  CSS: faCss3,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const GitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const userRepoRes = await fetch("https://api.github.com/repos/Forte2000/Forte2000");
        const userRepo = await userRepoRes.json();

        const reposRes = await fetch("https://api.github.com/users/Forte2000/repos?sort=updated&per_page=30");
        const repos = await reposRes.json();

        const allRepos = [userRepo, ...repos].filter(
          (repo) => repo && !blacklist.includes(repo.name)
        );

        setProjects(allRepos);
      } catch (err) {
        console.error("Lỗi khi fetch repos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-neutral-200 dark:bg-slate-800 animate-pulse h-[140px] rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => {
        const lang = project.language || "Code";
        const colors = langColors[lang] || { bg: "bg-neutral-100 dark:bg-slate-800", text: "text-neutral-700 dark:text-slate-300", border: "border-neutral-300 dark:border-slate-600" };
        const icon = langIcon[lang] || faCode;

        return (
          <motion.div key={project.id || project.name} variants={itemVariants}>
            <Link to={`/projects/${project.name}`}>
              <div className="group p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <FontAwesomeIcon icon={faBook} className="text-lg" />
                    <h3 className="font-bold text-base truncate max-w-[200px]">{project.name}</h3>
                  </div>
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="text-neutral-400 dark:text-slate-600 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors text-sm"
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-600 dark:text-slate-400 line-clamp-2 flex-1 mb-3">
                  {project.description || "No description available"}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  {/* Language Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}>
                    <FontAwesomeIcon icon={icon} />
                    {lang}
                  </span>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                      {project.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCodeFork} className="text-neutral-400 dark:text-slate-600" />
                      {project.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default GitHubProjects;
