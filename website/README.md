# RSquared IT Technologies — Website

React + Tailwind CSS site for RSquared IT Technologies, built with Vite and React Router.

## Stack

- React 19
- React Router 7 (client-side routing between Home / Services / About / Contact)
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Vite 8

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint      # run oxlint
```

## Structure

```
src/
  components/   Header, Footer, Logo, Icon, Button, Eyebrow, ScrollToTop
  data/         services.js — single source of truth for the 5 service lines
  pages/        Home, Services, About, Contact
```

Services content lives in `src/data/services.js` — update it there to change service
names, descriptions, or capabilities across the Home preview and Services accordion.
