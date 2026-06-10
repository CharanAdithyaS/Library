# LibraryHub — Online Library System

A full-featured online library built with React, Vite, React Router, and Redux Toolkit.

## Features

- **Home Page** — Welcome hero section, category grid, and popular books cards
- **Browse Books** — Filter by category via URL (`/books/:category`), search by title or author
- **Book Details** — Full details page for each book with rating, description, meta info
- **Add Book** — Form with validation; new books are added to the top of the list via Redux
- **404 Page** — Handles unknown routes, shows the invalid URL, links back home

## GitHub Link

- Link: https://github.com/CharanAdithyaS/Library

## Tech Stack

- React 18 (functional components + hooks)
- Vite (build tool and dev server)
- React Router v6 (routing + dynamic routes)
- Redux Toolkit + React Redux (global state management)
- Plain CSS (no external UI framework)

---

## How to Run the App

### Requirements

You need **Node.js v16 or higher** installed. Check with:


### Steps

1. **Install dependencies**:

```bash
npm install
```

2. **Start the development server**:

```bash
npm run dev
```

3. Open your browser and go to `http://localhost:5173`

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

