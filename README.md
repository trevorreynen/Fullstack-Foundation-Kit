# Fullstack Foundation Kit
### A Scalable React + Express Web App for Modular Fullstack Development
This project is a fullstack, modular web application built using a custom React + Webpack frontend and an Express + Sequelize + MySQL backend. The goal is to showcase scalable architecture, tight frontend/backend communication, and thoughtful solo development practices.

It started as a personal challenge: build a real-world template that could serve as the foundation for multiple fullstack projects while demonstrating practical features, clean structure, and extendability. This isn’t just a demo — it’s a deeply thought-out boilerplate, meant to evolve over time and reflect deliberate fullstack decisions.


---


## 📑 Table of Contents
- [🚀 Project Overview](#aproject-overview)
- [📋 Why I Use a Spreadsheet for Tracking & Progress](#why-i-use-spreadsheets)
- [🧱 Core Features](#core-features)
- [🎨 Frontend Stack](#frontend-stack)
- [🔐 Backend Stack](#backend-stack)
- [🧠 Architecture Notes](#architecture-notes)


---


## 🚀 Project Overview <a name="project-overview"></a>
This project was built from scratch to demonstrate full ownership of a working fullstack app. Every component — from authentication flow and reusable modals to backend pagination and seeders — was written manually to reinforce a clean, modular design pattern.

Rather than over-abstract early, the app was built iteratively with real user flows and complexity in mind. It uses TypeScript throughout, includes file-based image processing, and is designed to evolve into a true forum-style or social-style app.


## 📋 Why I Use a Spreadsheet for Tracking & Progress <a name="why-i-use-spreadsheets"></a>
To track and manage all parts of this fullstack project as a solo developer, I built a [dedicated spreadsheet](https://docs.google.com/spreadsheets/d/1U4YSO7CYDS4sMRZwCkI9x56IB4E8e_7q37nFvdIfYUA/edit?usp=sharing) that captures:

- Pages, Components, API routes, Models, Contexts, State stores
- Feature status, test plans, and planned refactors
- Centralized planning without relying on Trello or third-party tools

The sheet serves as a version-aware, scalable replacement for traditional task tools — and aligns better with how I process structure and depth while building solo.


## 🧱 Core Features <a name="core-features"></a>
- 🔐 **JWT Authentication System**
  - Login, register, logout with username/email
  - “Remember Me” persistence and protected route enforcement

- ✍️ **Posts & Comments**
  - Nested comment threads
  - Like tracking
  - Server-side pagination
  - Live filtering and sorting by likes, comments, or date

- 🙋‍♂️ **User Profiles & Settings**
  - `/user/:username` route-based profile pages
  - Editable username, email, and password
  - Profile image upload and `.webp` conversion with size variants

- 🧩 **Reusable UI Components**
  - Modal, filter dropdown, confirmation dialog
  - Pagination menu
  - Full settings layout with tabbed forms

- 🧪 **Robust Backend Logic**
  - Versioned routes (`/api/v1/...`)
  - Typed `AuthRequest` enforcement
  - Centralized error code system
  - Controller-level logging
  - Dynamic query builder utility

- 🌱 **Realistic Seeders**
  - Users, posts, comments, likes
  - Auto-generated nested replies
  - Profile image `.webp` resizing and cropping


## 🎨 Frontend Stack <a name="frontend-stack"></a>
- React (w/ TypeScript)
- Custom Webpack configuration
- Material UI (MUI) for styling and layout
- Zustand for local state management
- Custom hooks for auth, layout, and API wrappers
- Centralized API utility with global error handling
- Fully componentized layout: Explore, ViewPost, CreatePost, Settings, Profile


## 🔐 Backend Stack <a name="backend-stack"></a>
- Node.js + Express.js (TypeScript)
- Sequelize ORM with MySQL
- JWT-based authentication with bcrypt
- Route-level middleware and auth guards
- Modular controller files with shared utilities
- `.webp` image handling with multer + sharp
- Environment-configured `.env` system
- Seeders with logging, delay detection, and mock realism


## 🧠 Architecture Notes <a name="architecture-notes"></a>
This project prioritizes long-term clarity and structured growth, while skipping overengineering during early solo prototyping. Key tradeoffs include:

- Logic and layout are grouped where helpful for clarity
- SRP is applied selectively — reused logic is extracted, while page-level features remain streamlined
- Pagination and filtering are handled entirely server-side for performance
- Response envelopes (`{ data, meta, error }`) ensure frontend/backend consistency
- Route versioning and typed middleware lay the foundation for future feature layers

