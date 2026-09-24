# SEO Best Practices for Personal Websites

Want your portfolio to stand out on Google? Here is a comprehensive guide to SEO for personal websites and portfolios.

## Why SEO Matters

Even as a developer, you want recruiters and clients to find you easily. Good SEO can be the difference between remaining undiscovered and showing up on the first page of search results.

## Technical SEO Fundamentals

### 1. Meta Tags

Every page should have unique meta tags:

```html
<head>
    <title>Forte | Web Developer Portfolio</title>
    <meta name="description" content="Full-stack developer portfolio..." />
    <meta name="keywords" content="web developer, react, portfolio" />
</head>
```

### 2. Open Graph Tags

For social media sharing:

```html
<meta property="og:title" content="Forte Portfolio" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://forte.is-a.dev" />
```

### 3. Semantic HTML

Use proper heading hierarchies:

```html
<h1>Main Title</h1>      <!-- Only one per page -->
<h2>Section Title</h2>
<h3>Subsection</h3>
```

## Performance Optimization

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**: < 2.5s
2. **FID (First Input Delay)**: < 100ms
3. **CLS (Cumulative Layout Shift)**: < 0.1

### Image Optimization

- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Provide descriptive `alt` text

```html
<img 
    src="photo.webp" 
    alt="Project screenshot showing the dashboard interface"
    loading="lazy"
/>
```

## Content Strategy

### 1. Regular Blog Updates
Fresh content signals to search engines that your website is active and maintained.

### 2. Target Long-Tail Keywords
*"React Developer Portfolio"* > *"Developer Portfolio"*

### 3. Internal Linking
Create intuitive and natural links between related pages and articles.

## Structured Data (Schema.org)

Help search engines understand your site content:

```json
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Forte",
    "jobTitle": "Web Developer",
    "url": "https://forte.is-a.dev"
}
```

## Recommended Tools

| Tool | Purpose |
|------|---------|
| Google Search Console | Monitor search performance |
| Lighthouse | Performance and SEO audits |
| GTmetrix | Page speed analysis |
| Ahrefs / SEMrush | Keyword research |

## Quick SEO Checklist

- [ ] Unique title tags (< 60 chars)
- [ ] Meta descriptions (< 160 chars)
- [ ] Mobile-responsive design
- [ ] Fast load speed
- [ ] SSL certificate (HTTPS)
- [ ] XML Sitemap
- [ ] robots.txt file
- [ ] Image Alt attributes

## Conclusion

SEO is a marathon, not a sprint. Follow these best practices and watch your search visibility grow over time! 📈
