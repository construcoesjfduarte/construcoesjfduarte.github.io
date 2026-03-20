# Construções J.F. Duarte

Website for **Construções J.F. Duarte**, a construction company based in Braga, Portugal, with over 40 years of experience in civil construction.

**Live site:** [construcoesjfduarte.com](https://construcoesjfduarte.com)

## Tech Stack

- **React 18** with Vite
- **Framer Motion** for animations
- **Lucide React** for icons
- **Yet Another React Lightbox** for portfolio gallery
- Deployed via **GitHub Pages** with GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/styles/    # Global CSS and variables
├── components/       # React components (JSX + CSS pairs)
│   ├── Navbar
│   ├── Hero
│   ├── Services
│   ├── Portfolio
│   ├── About
│   ├── Contact
│   └── Footer
├── App.jsx           # Root component
└── main.jsx          # Entry point

public/
├── home/             # Hero images (WebP + PNG fallbacks)
├── logo/             # Favicons and social share image
└── portfolio/        # Portfolio albums organized by category
```

## Deployment

Pushes to `master` automatically deploy to GitHub Pages via the workflow in `.github/workflows/main.yml`.

**Requirements:** In the repo settings, set **Pages > Source** to **GitHub Actions**.
