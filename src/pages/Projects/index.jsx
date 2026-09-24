import useSEO from "../../hooks/useSEO";
import GithubProjects from "../../api/githubApi";
import { motion } from "framer-motion";
import { pageVariants, sectionVariants } from "../../config/animations";

function Projects() {
  useSEO({
    title: "Projects",
    description: "Browse my GitHub projects and portfolio. Explore applications built with React, Node.js, and other modern technologies.",
    keywords: "projects, github, portfolio, web development, react projects",
    url: "https://forte.is-a.dev/projects"
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      <motion.div
        className="font-bold text-slate-800 dark:text-white w-full pb-4"
        variants={sectionVariants}
      >
        <div className="flex text-3xl gap-3 mb-2 font-bold items-center">
          <div className="bg-slate-800 h-[36px] w-2 rounded"></div>
          <h2>My Projects 📚</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-normal">
          Here are some of the projects I've worked on. 🎒
        </p>
      </motion.div>

      <motion.div variants={sectionVariants}>
        <GithubProjects username="forte" />
      </motion.div>
    </motion.div>
  );
}

export default Projects;
