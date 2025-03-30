# Modular React + Custom Webpack App (WIP)

This project is a frontend-first, modular web app built with React, SCSS modules, and a fully custom Webpack setup. It emphasizes long-term scalability, strict styling separation, and dynamic UI systems like dropdowns, tables, and multi-state sidebars.

> ⚠️ Backend integration coming soon (Firebase Auth with a custom backend or fully custom auth + backend).

---

## 📑 Table of Contents

- [📁 Folder Structure](#📁-project-structure-frontend)
- [💡 Features](#💡-current-features)
- [🎨 Styling Philosophy](#🎨-scss--styling-philosophy)
- [🔐 Backend Strategy (Not Added Yet)](#🔐-backend-strategy-not-added-yet)
- [🧪 Planned Pages / Routes](#🧪-planned-pages-/-routes)
- [✅ What's Included](#✅-whats-included-so-far)
- [🚧 Status](#🚧-status)

---

## 📁 Project Structure (Frontend)

```
frontend/
├── components/
│   ├── DropdownMenu/
│   ├── Header/
│   ├── Loading/
│   │   ├── DelayedFallback.tsx
│   │   └── FullPageLoader.tsx
│   ├── Sidebar/
│   ├── UniversalTable/
│   └── WidthTooltip/
├── pages/
│   ├── LandingPage/
│   ├── HomePage/
│   ├── Page1/
│   ├── Page2/
│   ├── ExamplePage1/
│   ├── ExamplePage2/
│   ├── App.tsx
│   └── Entry.tsx
├── hooks/
├── styles/
├── config/
├── utils/
├── .babelrc
├── package.json
├── tsconfig.json
└── webpack.config.js
```

> - Pages are scoped by folder with `.tsx + .scss` per view
> - Components follow the same pattern for modularity and maintainability
> - `mixins.scss` contains shared styling helpers
> - SVG icons are managed manually in a flat asset folder
> - Some pages or components wont have styling if not needed.

---

## 💡 Current Features

- ✅ Multi-state Sidebar (`full`, `collapsed`, `hidden`, `minimal`)
- ✅ Custom Header with responsive overlap detection
- ✅ Fully editable spreadsheet-style table (UniversalTable)
- ✅ Tooltips for overflowing content (WidthTooltip)
- ✅ Dropdown menu component with icon + section + divider support
- ✅ Full-page fallback loader with delay logic
- ✅ Route-based rendering using `react-router-dom`

---

## 🎨 SCSS + Styling Philosophy

This project uses custom Webpack rules to allow:
- Global SCSS imports
- Local `.scss` files for every component/page (if needed)
- Wrapper class naming to scope styles without CSS Modules
- `mixins.scss` contains utility mixins used across the project
- Icons are manually added as masked SVGs (not through libraries), though this may change.

This gives pixel-level control over layout and allows scaling the UI system with precision.

---

## 🔐 Backend Strategy (Not Added Yet)

Initial plan is to use **Google Firebase Auth** for:
- Secure, managed authentication
- Optional OAuth login support

---

If a custom backend is added, it will follow:
- ✅ bcrypt for password hashing
- ✅ JWT for stateless sessions
- ✅ Rate-limited login attempts
- ✅ Centralized `.env` secret config
- ✅ Input validation + sanitization
- ✅ Optional logging of login attempts / IP addresses
- ✅ Future ideas: "total shutdown" on multiple failed attempts

---

## 🧪 Planned Pages / Routes

- Planned Pages / Routes - Auth Related
  - `/login` — email or username login form
  - `/register` — new user registration with validation
  - `/settings` — change username/email/password/icon
  - `/@username` — public profile page via handle-style routing
- Planned Pages / Routes NOT related to Auth:
  - `*` — 404 page with return to home and optional search
  - TBD

> Route tree is defined in `routesConfig.ts` and uses React Suspense for lazy loading

---

## ✅ What's Included So Far

- 🔧 Custom Webpack + Babel + TypeScript setup
- ⚛️ React core + routing system
- 🎨 SCSS pipeline with strict file boundaries
- 🧱 Header + Sidebar layout system
- 🧠 Context-driven layout state (`common-context.tsx`)
- 🧁 Reusable DropdownMenu with support for icons and grouped items
- ⏳ FullPageLoader with DelayedFallback (Included but not fully tested)
- 📊 UniversalTable (Very W.I.P. still)
  - Column + row spans
  - Custom types (checkbox, dropdown, editable text)
  - Keyboard interactions
  - Future styling flexibility

---

## 🚧 Status

This project is **Work in Progress** and not even close to production-ready.  
No backend connected. No data persisted.

If you're reading this — you're probably me. 🙂

---

