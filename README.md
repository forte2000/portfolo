# 🌐 Forte - Personal Portfolio Website

Welcome to **forte**, a modern, feature-rich, and interactive personal portfolio website built with ReactJS and TailwindCSS. It's designed to showcase your profile, skills, projects, and interests in a beautiful and responsive way.

## 💢 Project Status
- 🔥 **Status:** Active Development & Maintenance.
- 💻 **Live Demo:** [forte.is-a.dev](https://forte.is-a.dev/)

---

## 🍃 Features

LumiYi is packed with cool features to make your portfolio stand out:

### 🎨 UI/UX Design
- **Modern Aesthetic:** Clean, minimalist design with a touch of "glassmorphism" and vibrant colors.
- **Responsive Layout:** Perfectly optimized for Desktops, Tablets, and Mobile devices.
- **Dark Mode Ready:** Built with dark mode in mind (default style).
- **Smooth Animations:** Powered by `framer-motion` for page transitions, scroll reveals, and micro-interactions.

### 🧩 Core Functionality
- **Dynamic Routing:** Seamless navigation using `react-router-dom`.
- **Blog System:**
    - Full Markdown support (`react-markdown`, `rehype-raw`).
    - Syntax highlighting for code blocks (`@tailwindcss/typography`).
    - Easy content management via `.md` files.
- **Anime/Manga Tracker:**
    - Integration with **AniList GraphQL API**.
    - Real-time fetching of your Watching/Reading lists.
    - Search and filter functionality for Anime and Manga.
- **Project Showcase:**
    - Automated fetching of repositories from **GitHub API**.
    - Language color coding and stats display (stars, forks).
- **Hentai/Gallery List:**
    - A specialized gallery with content warning modal (18+ verification).
    - Image preview modal with zoom and navigation.
- **Music Player:** Integrated mini-player for background ambience.

### 🔌 API Integrations
- **GitHub:** Repositories, interactive contribution graph.
- **AniList:** Anime & Manga tracking lists.
- **Pinterest:** Custom image feed integration.
- **Spotify (Visualizer):** Audio visualization components.

### 🤖 Extras
- **SEO Optimized:** Meta tags implementation for better social sharing and search ranking.
- **Visitor Tracker:** Simple analytics implementation.

---

## 🛠️ Tech Stack

Built with the latest reliable web technologies:

- **Frontend Core:** [React 18](https://reactjs.org/)
- **Build Tool:** [React Scripts](https://create-react-app.dev/) (CRA)
- **Styling:**
    - [TailwindCSS v3](https://tailwindcss.com/)
    - [PostCSS](https://postcss.org/)
    - [SASS/SCSS](https://sass-lang.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Data & State:** React Hooks, Context API
- **Utilities:**
    - `axios` (API requests)
    - `react-icons`, `fontawesome` (Icons)
    - `tippy.js` (Tooltips)
    - `swiper` (Carousels/Sliders)

---

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Step-by-Step Guide

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/forte/portfolo.git
    cd LumiYi
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start Development Server:**
    ```bash
    npm start
    ```
    The app will open at `http://localhost:3000`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    The optimized files will be generated in the `build/` folder.

---

## 📁 Project Structure

```
LumiYi/
├── public/                  # Static assets (favicons, manifest, robots.txt)
│   └── content/blog/        # Markdown files for Blog posts
├── src/
│   ├── api/                 # API clients (Anilist, GitHub, etc.)
│   ├── assets/              # Images, videos, fonts
│   ├── components/          # Reusable UI components (Modals, Cards, Loaders)
│   ├── config/              # Configuration files (routes, data objects)
│   │   ├── anime.js         # AniList username config
│   │   ├── blog.js          # Blog post metadata
│   │   └── routes.js        # Route constants
│   ├── layouts/             # Layout components (Navbar, Footer)
│   ├── pages/               # Page components
│   │   ├── About/           # About page
│   │   ├── Anime/           # Anime tracker page
│   │   ├── Blog/            # Blog listing & post viewer
│   │   ├── Games/           # Games showcase
│   │   ├── Projects/        # GitHub projects
│   │   └── ...
│   ├── router/              # Router setup
│   ├── App.jsx              # Main App component
│   └── index.css            # Global styles & Tailwind directives
├── .gitignore
├── package.json
└── tailwind.config.js       # Tailwind configuration
```

---

## ⚙️ Configuration

You can easily customize the content without diving deep into the code.

### 1. Update Personal Info
Most static data is located within `src/pages/About/index.jsx` and `src/layouts/Footer/index.jsx`.

### 2. Configure APIs
- **AniList:** Open `src/config/anime.js` and update the `username`.
- **GitHub:** Update `username` prop in `src/pages/Projects/index.jsx`.

### 3. Add Blog Posts
1. Create a `.md` file in `public/content/blog/`.
2. Register the post in `src/config/blog.js`.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the code:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## ✨ Credits

Inspired by various creative portfolios in the dev community.
- Original design concepts by **Kitomc** and **Omar Abdulaziz**.
- Developed & maintained by **forte**.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
