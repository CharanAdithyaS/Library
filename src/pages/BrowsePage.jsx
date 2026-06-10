import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks, selectCategories } from '../store/booksSlice'
import BookCard from '../components/BookCard'
import './BrowsePage.css'

function BrowsePage() {
  const { category } = useParams() // comes from /books/:category route
  const allBooks = useSelector(selectAllBooks)
  const categories = useSelector(selectCategories)

  const [search, setSearch] = useState('')

  // Step 1: filter by category (if a category is in the URL)
  const categoryFiltered = category
    ? allBooks.filter((b) => b.category.toLowerCase() === category.toLowerCase())
    : allBooks

  // Step 2: filter by search query (title or author)
  const filtered = categoryFiltered.filter((b) => {
    const q = search.toLowerCase()
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    )
  })

  return (
    <div className="page-wrapper">
      <div className="browse-header">
        <div>
          <h1 className="section-title">
            {category ? `${category} Books` : 'Browse All Books'}
          </h1>
          <p className="browse-sub">
            {filtered.length} book{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="category-pills">
        <Link
          to="/books"
          className={`category-pill ${!category ? 'category-pill--active' : ''}`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/books/${cat}`}
            className={`category-pill ${
              category && category.toLowerCase() === cat.toLowerCase()
                ? 'category-pill--active'
                : ''
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Book grid */}
      {filtered.length > 0 ? (
        <div className="books-grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>😕 No books found matching your search.</p>
          <button className="btn btn-outline" onClick={() => setSearch('')}>
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}

export default BrowsePage
