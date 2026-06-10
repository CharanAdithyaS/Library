import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks, selectCategories } from '../store/booksSlice'
import BookCard from '../components/BookCard'
import './HomePage.css'

// Category icons for the visual pill buttons
const categoryIcons = {
  Fiction: '📖',
  'Non-Fiction': '📰',
  'Sci-Fi': '🚀',
  Mystery: '🔍',
  'Self-Help': '💡',
}

function HomePage() {
  const allBooks = useSelector(selectAllBooks)
  const categories = useSelector(selectCategories)

  // Show the top 4 highest-rated books as "popular"
  const popularBooks = [...allBooks]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <div className="page-wrapper">
      {/* Hero / Welcome Section */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">Welcome to <span>LibraryHub</span></h1>
          <p className="hero-subtitle">
            Discover thousands of books across every genre. Browse, read, and
            add your own favorites to our ever-growing collection.
          </p>
          <div className="hero-actions">
            <Link to="/books" className="btn btn-primary">Browse All Books</Link>
            <Link to="/add" className="btn btn-outline">+ Add a Book</Link>
          </div>
        </div>
        <div className="hero-illustration">📚</div>
      </section>

      {/* Book Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/books/${cat}`}
              className="category-card"
            >
              <span className="category-icon">{categoryIcons[cat] || '📄'}</span>
              <span className="category-name">{cat}</span>
              <span className="category-count">
                {allBooks.filter((b) => b.category === cat).length} books
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="popular-section">
        <div className="popular-header">
          <h2 className="section-title">Popular Books</h2>
          <Link to="/books" className="view-all-link">View all →</Link>
        </div>
        <div className="books-grid">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
