# Marine Remote Sensing Laboratory Website

A modern, responsive academic research website built with Astro, Vue.js, and Tailwind CSS. Features comprehensive support for Markdown content management, making it easy to update and maintain.

## 🌊 Overview

This website showcases the Marine Remote Sensing Laboratory's research in satellite oceanography, featuring:
- Dynamic team profiles
- Research areas and projects
- News and publications
- Data portal and resources
- Full Markdown/MDX support for easy content management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd marine-sensing-lab

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## 📁 Project Structure

```text
marine-sensing-lab/
├── public/              # Static assets (images, documents)
├── src/
│   ├── components/      # Vue components
│   │   ├── Navigation.vue
│   │   ├── HeroSection.vue
│   │   ├── TeamSection.vue
│   │   └── ...
│   ├── layouts/         # Page layouts
│   │   ├── Layout.astro
│   │   └── MarkdownLayout.astro
│   ├── pages/          # Routes (Astro/Markdown files)
│   │   ├── index.astro
│   │   ├── facilities.md
│   │   ├── about/
│   │   │   └── mission.md
│   │   ├── news/
│   │   │   ├── latest-research.md
│   │   │   └── grant-award-nsf.md
│   │   ├── team/
│   │   │   ├── sarah-mitchell.md
│   │   │   └── james-chen.md
│   │   ├── research/
│   │   │   └── ocean-color.md
│   │   ├── projects/
│   │   │   └── plastic-detection.md
│   │   ├── publications/
│   │   │   └── index.md
│   │   └── resources/
│   │       └── data-portal.md
│   └── styles/
│       └── global.css   # Global styles and Tailwind config
├── astro.config.mjs     # Astro configuration
├── package.json
└── README.md
```

## 📝 Working with Markdown Files

### Creating New Pages

1. **Create a new `.md` file** in the appropriate directory under `src/pages/`
2. **Add frontmatter** at the top of the file:

```markdown
---
layout: ../layouts/MarkdownLayout.astro
title: Your Page Title
description: Brief description of the page
author: Author Name
date: 2024-03-20
tags: [tag1, tag2, tag3]
image: /images/header-image.jpg
---

# Your Content Here

Write your content using standard Markdown...
```

### Markdown Features

- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[Link text](https://url.com)`
- **Images**: `![Alt text](/images/image.jpg)`
- **Lists**: Use `-` or `1.` for bullets or numbers
- **Code blocks**: Use triple backticks with language specification
- **Tables**: Standard Markdown table syntax
- **Blockquotes**: `> Quote text`

### Adding Team Members

Create a new file in `src/pages/team/firstname-lastname.md`:

```markdown
---
layout: ../../layouts/MarkdownLayout.astro
title: Dr. John Doe
description: Assistant Professor - Marine Remote Sensing
author: Marine Remote Sensing Lab
date: 2024-03-15
tags: [faculty, researcher, oceanography]
image: /images/team/john-doe.jpg
---

# Dr. John Doe
**Assistant Professor**

## Contact Information
- **Email**: john.doe@university.edu
- **Office**: Marine Sciences Building, Room 123

## Research Interests
[Content...]

## Education
[Content...]

## Publications
[Content...]
```

### Adding News Articles

Create a new file in `src/pages/news/article-title.md`:

```markdown
---
layout: ../../layouts/MarkdownLayout.astro
title: Your News Title
description: Brief summary of the news
author: Author Name
date: 2024-03-20
tags: [news, research, announcement]
image: /images/news/article-image.jpg
---

Your news content here...
```

### Adding Research/Project Pages

Similar structure - create files in `src/pages/research/` or `src/pages/projects/`

## 🔄 Rebuilding with Changes

### Development Mode (Auto-rebuild)

When running `npm run dev`, the site automatically rebuilds when you:
- Save any `.md` or `.mdx` file
- Modify `.astro` components
- Update `.vue` components
- Change styles

### Production Build

```bash
# Build the site for production
npm run build

# Preview the production build locally
npm run preview
```

### Deployment

The built site will be in the `./dist/` directory, ready for deployment to:
- Netlify (drag & drop the dist folder)
- Vercel (connect GitHub repo)
- GitHub Pages
- Any static hosting service

## 🎨 Customization

### Updating Navigation

Edit `src/components/Navigation.vue` to add/remove menu items:

```vue
<a href="/your-page" class="nav-link">Your Page</a>
```

### Changing Colors

Edit `src/styles/global.css`:

```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #00a8e8;
  --color-accent: #00d4aa;
}
```

### Adding Images

1. Place images in `public/images/`
2. Reference in Markdown: `/images/your-image.jpg`
3. Images are automatically optimized by Astro

## 🧞 Commands Reference

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro add` | Add integrations (e.g., `astro add tailwind`) |

## 🔧 Technical Stack

- **Framework**: [Astro](https://astro.build) v5.13
- **UI Components**: [Vue.js](https://vuejs.org) v3.5
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4.1
- **Markdown**: [MDX](https://mdxjs.com) support
- **Icons**: Inline SVG icons
- **Fonts**: Inter & Playfair Display (Google Fonts)

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/docs/)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `astro.config.mjs`
2. **Build errors**: Clear cache with `rm -rf .astro node_modules && npm install`
3. **Markdown not updating**: Restart dev server
4. **Styling issues**: Check Tailwind v4 syntax compatibility

### Getting Help

- Create an issue in the repository
- Check Astro Discord community
- Review error messages in browser console

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 👥 Credits

Developed by the Marine Remote Sensing Laboratory  
Based on design inspiration from NatCap Insights  
Built with Astro, Vue.js, and Tailwind CSS

---

*For questions or support, contact: webmaster@marinesensinglab.edu*
