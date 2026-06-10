import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import BrowsePage from './pages/BrowsePage'
import BookDetailsPage from './pages/BookDetailsPage'
import AddBookPage from './pages/AddBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      {/*
        Routes overview:
        /                     → Home page
        /books                → Browse all books
        /books/:category      → Browse books filtered by category
        /book/:id             → Book details
        /add                  → Add a new book
        *                     → 404 Not Found (no Navbar)
      */}
      <Routes>
        {/* These pages include the Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/books"
          element={
            <>
              <Navbar />
              <BrowsePage />
            </>
          }
        />
        <Route
          path="/books/:category"
          element={
            <>
              <Navbar />
              <BrowsePage />
            </>
          }
        />
        <Route
          path="/book/:id"
          element={
            <>
              <Navbar />
              <BookDetailsPage />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <Navbar />
              <AddBookPage />
            </>
          }
        />
        {/* 404 — no Navbar as per requirement */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
