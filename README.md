# Modular React + Express Fullstack Template (WIP)
### React + Node.js + MySQL Fullstack Project

This project is a fullstack, modular web application built using a custom React + Webpack frontend and an Express + Sequelize + MySQL backend. The goal is to showcase scalable architecture, modern feature integration, and tight frontend/backend communication. It serves as a template for building production-grade fullstack applications and acts as a portfolio centerpiece to demonstrate end-to-end understanding.


---


## 📑 Table of Contents

- [⚙️ Architecture Notes & Solo Dev Tradeoffs](#architecture-notes)
- [📊 Tracking & Feature Overview](#tracking-and-feature-overview)
- [📋 Why I Use a Spreadsheet](#why-i-use-spreadsheets)
- [📁 Project Structure](#project-structure)
- [🧭 Route Overview](#route-overview)
- [💡 Key Features](#key-features)
- [🔐 Backend Architecture](#backend-architecture)
- [🎨 SCSS + Styling Philosophy](#styling-philosophy)
- [🚧 Status](#project-status)


---


## ⚙️ Architecture Notes & Solo Dev Tradeoffs <a name="architecture-notes"></a>

This project is built as a solo developer effort, and I've intentionally made some tradeoffs in how components and logic are structured.

While I'm familiar with industry standards like the Single Responsibility Principle (SRP), in many cases I've opted to blend layout, logic, and data prep within the same file. This helps me stay in the flow while rapidly developing features and maintaining context across the fullstack.

If this were a team project or something intended for production at scale, I would:
- Split logic into smaller, composable components
- Extract custom hooks for data fetching and formatting
- Separate presentational vs container components more cleanly
- Introduce stricter architectural boundaries (e.g. UI vs domain layers)

I may revisit this structure in a later branch to demonstrate a more modular pattern. But for now, the current design reflects the needs and momentum of solo fullstack prototyping.


## 📊 Tracking & Feature Overview <a name="tracking-and-feature-overview"></a>

My [detailed project spreadsheet](https://docs.google.com/spreadsheets/d/1C8jvxsDRqb4DzvSESKs9tclEQdRJ9CYKbTXQafrjL4A/edit?usp=sharing) tracks all features, components, models, endpoints, and logic across frontend and backend. This includes:

- Frontend: pages, layouts, components, hooks, utils, contexts
- Backend: models, routes, controllers, middleware, jobs
- Shared: feature/bug submission forms with status tracking

This system replaces manual documentation and allows large-scale planning with version-friendly visibility.


## 📋 Why I Use a Spreadsheet <a name="why-i-use-spreadsheets"></a>

To track and manage all parts of this fullstack project as a solo developer, I built a spreadsheet system that reflects how I think and organize best. Trello and similar tools didn't fit my workflow — I found them too slow and fragmented for deep planning.

This spreadsheet allows me to:
- Centralize frontend and backend structures in one place
- Reuse the same format across future projects
- Maintain consistency, control, and speed when planning features
- Avoid scattered tools or one-off notes

Everything from components, routes, models, and endpoints to feature planning and bug triage is accounted for. Possibly will expand the spreadsheet in the future but for now this works well.


---


## 📁 Project Structure <a name="project-structure"></a>

NOTE: Might not be 100% updated.

```
project/
├── backend/
│   ├── config/
│   │   └── database.ts
│   ├── models/
│   │   ├── Comment.ts
│   │   ├── Like.ts
│   │   ├── Post.ts
│   │   ├── User.ts
│   │   └── UserSettings.ts
│   ├── routes/
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── comments.ts
│   │   ├── index.ts
│   │   ├── likes.ts
│   │   ├── posts.ts
│   │   └── settings.ts
│   ├── package.json
│   ├── server.ts
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── icons/
│   │   ├── components/
│   │   │   ├── AuthForm/
│   │   │   ├── DropdownMenu/
│   │   │   ├── Header/
│   │   │   ├── Loading/
│   │   │   ├── ProtectedRoute/
│   │   │   └── Sidebar/
│   │   ├── config/
│   │   │   └── routesConfig.tsx
│   │   ├── hooks/
│   │   │   └── common-context.tsx
│   │   ├── layouts/
│   │   │   ├── EmptyLayout.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Landing/
│   │   │   ├── Login/
│   │   │   ├── Profile/
│   │   │   ├── Register/
│   │   │   ├── Settings/
│   │   │   ├── App.tsx
│   │   │   └── Entry.tsx
│   │   ├── styles/
│   │   │   ├── global.scss
│   │   │   └── mixins.scss
│   │   └── utils/
│   │   │   ├── api.tsx
│   │   │   └── usefulFunctions.ts
│   ├── .babelrc
│   ├── .stylelinttc.json
│   ├── package.json
│   ├── tsconfig.json
│   └── webpack.config.js
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
└── README.md

Also, things that I have in my gitignore:
├── .!other/   # Simply contains old files and some notes, etc.
├── .vscode/
└── .env
```

- Pages and components are folder-scoped (`.tsx + .scss`)
   - Sometimes no `.scss` file if it isn't needed.
- Custom layouts allow public/private route separation
- Common state is shared via `common-context.tsx`


---


## 🧭 Route Overview <a name="route-overview"></a>

A complete list of all defined routes, their layouts, file paths, auth requirements, and usage context can be found in the [📄 Pages / Routes Spreadsheet Section](https://docs.google.com/spreadsheets/d/1C8jvxsDRqb4DzvSESKs9tclEQdRJ9CYKbTXQafrjL4A/edit?gid=1493879846#gid=1493879846&range=L5).


## 💡 Key Features <a name="key-features"></a>

- ✅ Responsive header with auth state awareness
- ✅ Dynamic sidebar with multiple visibility modes
- ✅ Auth system with JWT login, register, and logout
- ✅ Form validation with error display and field feedback
- ✅ Protected routes with `useAuthGuard` and layout guards
- ✅ Reusable `<AuthForm />` shared across login/register flows
- ✅ Create Post, Like, Comment models with full backend routes
- ✅ User profile page (`/@username`) with posts and comments view
- ✅ Settings page with profile updates and optional dummy UI preferences
- ✅ Image upload for profile icons (in progress)
- ✅ Default profile icon logic for new users
- ✅ Route-based lazy loading via React Suspense
- ✅ SCSS modules with custom design system
- ✅ FullPageLoader + DelayedFallback system
- ✅ Modular API utility for backend communication
- ✅ Context-driven layout and user state


## 🔐 Backend Architecture <a name="backend-architecture"></a>

Fully custom backend built with:

- Express.js + Sequelize + MySQL
- Secure user model with bcrypt password hashing
- JWT for stateless auth with "Remember Me" session support
- Protected routes via middleware (`req.user` injection)
- Feature routes: posts, comments, likes, settings, auth
- Auto-created `createdAt` / `updatedAt` on all models
- File upload logic for profile images (to be completed)
- Centralized `.env` config for porting between environments


## 🎨 SCSS + Styling Philosophy <a name="styling-philosophy"></a>

- Local `.scss` files scoped per page/component (if needed)
- `mixins.scss` contains shared mixin utilities
- Masked SVG icons used for styling precision
- Header is reserved for actions (create, profile, theme, sign in/out)
- Sidebar is reserved for section navigation (feed, settings, etc.)


## 🚧 Status <a name="project-status"></a>

This project is **actively in development** with all major systems scaffolded.
Focus is on building a reusable project structure for fullstack applications with integrated frontend/backend planning.

> ⚠️ All placeholder routes/components are being phased out as feature pages are implemented


---


## 🎯 Minimum Viable Version (v1.0)

This project is being developed as a feature-complete fullstack template, showing how to structure and implement a complete web app from scratch.

The following scope represents the intended "v1.0" release — a well-rounded foundation suitable for showcasing in portfolios, cloning for future projects, or extending into larger applications.


### 👤 Authentication & User
- User registration and login
- "Remember Me" JWT token support
- Logout functionality
- Update account settings (username, email, password)
- Upload and display profile image

### 📝 Content System
- Create basic text-based posts
- Comment on posts
- Like posts
- Timestamps for post/comment creation + editing
- View a user's posts and comments on their profile

### 🌍 Routing & Layouts
- Public: Landing, Login, Register (no sidebar)
- Protected: Profile, Settings, Feed
- Multiple layout support (public vs authenticated views)

### ✅ UI Polish & Extras
- Skeleton loaders or spinners for async pages
- Clean route structure with layout guards
- Centralized API handler (`api.ts`)
- SCSS modules for scoped styling
- Form error handling with real-time validation
- Responsive header with dynamic auth state

### 💡 Post-MVP (Optional Future Features)
- Follow/follower system
- Private profiles or post visibility control
- Feed filtered by followed users
- Notifications (likes/comments)
- Explore/search page

