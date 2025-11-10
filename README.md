# AI Chef 🍳

A simple AI-powered recipe generator built using **React + Vite + Netlify Functions + OpenRouter AI**.

**Live Project:** [https://ai-chef-react-by-apra.netlify.app/](https://ai-chef-react-by-apra.netlify.app/)

---

## ✅ Tech Stack Used

* **React (Vite)** – Frontend UI
* **Netlify Functions** – Backend serverless API
* **OpenRouter AI (Llama 3.1 8B Instruct)** – Recipe generation
* **CSS** – Custom styling + theme variables
* **React Markdown** – Recipe formatting
* **Netlify** – Deployment + environment variables

---

## ✅ Components Used

### **1. Header Component**

* Displays logo + project title
* Sits at the top of the page

### **2. Main Component**

Handles the entire user flow:

* Ingredient input form
* Add ingredient listing
* “Get Recipe” button
* “Start Over” button
* Shows AI-generated recipe
* Loading animation (panda chef)
* Markdown rendering

### **3. Netlify Function (Backend)**

* File: `netlify/functions/getRecipe.js`
* Accepts ingredient list
* Sends request to OpenRouter AI
* Returns formatted recipe

---

## ✅ Project Description

AI Chef allows users to type ingredients they have at home. Once enough ingredients are added, the **Get Recipe** button appears. A serverless backend sends these ingredients to OpenRouter, and the AI returns a complete recipe.

The project includes:

* Clean green UI theme
* Animated panda loader
* Pastel kitchen background (visible only on empty state)
* Markdown-rendered AI output
* Reset functionality

---

## ✅ Project Link

**Live Demo:** [https://ai-chef-react-by-apra.netlify.app/](https://ai-chef-react-by-apra.netlify.app/)

### ❤️ Made With Love

### Created with love by Apra Khanna.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
