import { useEffect } from 'react';

/**
 * Default SEO configuration
 */
const defaultMeta = {
    siteName: "Forte - Personal Portfolio",
    title: "Forte",
    description: "Welcome to my personal website. I'm a passionate learner in programming, design, and creativity. Explore my journey, projects, and personal collections.",
    keywords: "portfolio, developer, web development, react, javascript, personal website, Forte",
    author: "Forte",
    image: "https://github.com/Forte2000/Forte2000/blob/main/image.webp?raw=true",
    url: "https://Forte.is-a.dev/",
    type: "website",
    locale: "zh_CN",
    themeColor: "#f9a8d4",
    twitterHandle: "@Forte2000",
};

/**
 * Custom hook để quản lý SEO meta tags động
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description  
 * @param {string} options.keywords - Page keywords
 * @param {string} options.image - OG image URL
 * @param {string} options.url - Canonical URL
 * @param {string} options.type - OG type (website, article, etc.)
 * @param {boolean} options.noIndex - Prevent indexing
 */
const useSEO = ({
    title,
    description,
    keywords,
    image,
    url,
    type,
    noIndex = false,
} = {}) => {
    const seo = {
        title: title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.title,
        description: description || defaultMeta.description,
        keywords: keywords || defaultMeta.keywords,
        image: image || defaultMeta.image,
        url: url || defaultMeta.url,
        type: type || defaultMeta.type,
    };

    useEffect(() => {
        // Update document title
        document.title = seo.title;

        // Helper function to update or create meta tag
        const updateMeta = (selector, attribute, value) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement("meta");
                if (selector.startsWith('meta[name="')) {
                    element.setAttribute("name", selector.match(/name="(.*)"/)[1]);
                } else if (selector.startsWith('meta[property="')) {
                    element.setAttribute("property", selector.match(/property="(.*)"/)[1]);
                }
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, value);
        };

        // Helper function to update or create link tag
        const updateLink = (rel, href) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement("link");
                element.setAttribute("rel", rel);
                document.head.appendChild(element);
            }
            element.setAttribute("href", href);
        };

        // Standard Meta Tags
        updateMeta('meta[name="title"]', "content", seo.title);
        updateMeta('meta[name="description"]', "content", seo.description);
        updateMeta('meta[name="keywords"]', "content", seo.keywords);
        updateMeta('meta[name="author"]', "content", defaultMeta.author);
        updateMeta('meta[name="robots"]', "content", noIndex ? "noindex, nofollow" : "index, follow");

        // Open Graph Meta Tags
        updateMeta('meta[property="og:type"]', "content", seo.type);
        updateMeta('meta[property="og:url"]', "content", seo.url);
        updateMeta('meta[property="og:title"]', "content", seo.title);
        updateMeta('meta[property="og:description"]', "content", seo.description);
        updateMeta('meta[property="og:image"]', "content", seo.image);
        updateMeta('meta[property="og:site_name"]', "content", defaultMeta.siteName);
        updateMeta('meta[property="og:locale"]', "content", defaultMeta.locale);

        // Twitter Card Meta Tags
        updateMeta('meta[name="twitter:card"]', "content", "summary_large_image");
        updateMeta('meta[name="twitter:url"]', "content", seo.url);
        updateMeta('meta[name="twitter:title"]', "content", seo.title);
        updateMeta('meta[name="twitter:description"]', "content", seo.description);
        updateMeta('meta[name="twitter:image"]', "content", seo.image);
        updateMeta('meta[name="twitter:creator"]', "content", defaultMeta.twitterHandle);

        // Theme Colors (hồng nhạt)
        updateMeta('meta[name="theme-color"]', "content", defaultMeta.themeColor);
        updateMeta('meta[name="msapplication-TileColor"]', "content", defaultMeta.themeColor);

        // Canonical Link
        updateLink("canonical", seo.url);

        // Cleanup - reset title khi unmount
        return () => {
            document.title = defaultMeta.title;
        };
    }, [seo.title, seo.description, seo.keywords, seo.image, seo.url, seo.type, noIndex]);
};

export default useSEO;
