# 🎾 Sign Slam Academy - Next.js Assignment

This repository contains the completed assignment for the Sign Slam Academy (SSA) homepage. The project was built using **Next.js** with **App Router**, **Tailwind CSS**, and **Apollo Client** to fetch data from a GraphQL API. The design follows the Figma prototype provided in the assignment.

---

## 🚀 Deployment

Live URL: [https://next-js-tasks-pearl.vercel.app/](https://next-js-tasks-pearl.vercel.app/)

---

## 📌 Assignment Overview

### ✅ Requirements

- **Technology Stack**
  - Next.js (App Router)
  - Tailwind CSS
  - GraphQL (Apollo Client)

- **Design**
  - Figma-based responsive layout
  - Sections: Banner, About, Amenities, Events, Programs, Blogs, Footer

- **Data**
  - GraphQL API: `https://astralpaints.kwebmakerdigitalagency.com/graphql`
  - Dynamic content: banners, categories, blog posts

- **Deployment**
  - Hosted on Vercel
  - Shared via GitHub & live deployment link

- **Other Requirements**
  - `next/image` for all images
  - SEO metadata
  - Performance optimization & error-free rendering

---

## 🐞 Issues Encountered & Solutions

### 🧩 Case 1: React Hooks Error

- **Issue**: `useState` and `useEffect` hooks threw an error in `app/page.js` since it defaults to a Server Component.
- **Solution**: Added `"use client"` directive to make it a Client Component.
- **Impact**: Enabled usage of hooks and resolved client-side state issues.

---

### 🖼️ Case 2: Image 400 (Bad Request)

- **Issue**: 400 error when loading `ssa-logo.png` due to missing file in the `public/` folder.
- **Solution**:
  - Used a placeholder image (`https://via.placeholder.com/50`) temporarily.
  - Recommended adding the actual logo as `public/ssa-logo.png`.
- **Impact**: Prevented build-time image errors and enabled UI rendering.

---

### 📽️ Case 3: Video Playback Not Working

- **Issue**: Video play button in the About section was non-functional.
- **Solution**:
  - Created modal controlled by `isVideoOpen` state.
  - Embedded video via `iframe` using `homepage?.homeAboutVideoUrl`.
- **Impact**: Video now plays in a modal, enhancing user engagement.

---

### 📱 Case 4: Navigation Not Mobile-Friendly

- **Issue**: Desktop navigation (`hidden md:flex`) left mobile users with no menu.
- **Solution**:
  - Added `isMenuOpen` state and a responsive hamburger menu.
- **Impact**: Fully responsive navigation for mobile users.

---

## 🗂️ Project Structure

