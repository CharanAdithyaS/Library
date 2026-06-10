import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBookById } from '../store/booksSlice'
import './BookDetailsPage.css'

function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Get the specific book from Redux state using the id from the URL
  const book = useSelector(selectBookById(id))

  // If no book is found for this id, show a friendly message
  if (!book) {
    return (
      <div className="page-wrapper">
        <div className="not-found-msg">
          <p>😕 Book not found.</p>
          <Link to="/books" className="btn btn-primary">Back to Browse</Link>
        </div>
      </div>
    )
  }

  // Render filled and empty stars based on rating
  const fullStars = Math.round(book.rating)
  const emptyStars = 5 - fullStars

  return (
    <div className="page-wrapper">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Browse
      </button>

      <div className="details-card">
        {/* Book cover block */}
        <div
          className="details-cover"
          style={{ background: book.cover || '#6c63ff' }}
        >
          <div className="details-cover-inner">
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">by {book.author}</p>
          </div>
        </div>

        {/* Book info */}
        <div className="details-body">
          <div className="details-meta">
            <span className="meta-tag">{book.category}</span>
            {book.year && <span className="meta-tag meta-tag--gray">{book.year}</span>}
            {book.pages && <span className="meta-tag meta-tag--gray">{book.pages} pages</span>}
          </div>

          {/* Rating */}
          <div className="details-rating">
            <span className="big-stars">
              {'★'.repeat(fullStars)}{'☆'.repeat(emptyStars)}
            </span>
            <span className="rating-value">{book.rating} / 5</span>
          </div>

          {/* Description */}
          <div className="details-desc">
            <h3>About this book</h3>
            <p>{book.description}</p>
          </div>

          <div className="details-actions">
            <Link to="/books" className="btn btn-primary">Browse More Books</Link>
            <Link to={`/books/${book.category}`} className="btn btn-outline">
              More {book.category}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage
