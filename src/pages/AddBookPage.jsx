import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/booksSlice'
import './AddBookPage.css'

// Available categories for the dropdown
const CATEGORIES = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Self-Help', 'History', 'Biography', 'Other']

// Cover color options the user can pick from
const COVER_COLORS = [
  '#6c63ff', '#e84545', '#f4a261', '#2ec4b6',
  '#f6c90e', '#3d5a80', '#457b9d', '#8338ec',
]

// Initial empty form state
const emptyForm = {
  title: '',
  author: '',
  category: '',
  description: '',
  rating: '',
  year: '',
  pages: '',
  cover: '#6c63ff',
}

function AddBookPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Update a single form field
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate all required fields and return an errors object
  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required.'
    if (!form.author.trim()) errs.author = 'Author is required.'
    if (!form.category) errs.category = 'Please select a category.'
    if (!form.description.trim()) errs.description = 'Description is required.'
    else if (form.description.trim().length < 20) errs.description = 'Description should be at least 20 characters.'
    if (!form.rating) {
      errs.rating = 'Rating is required.'
    } else if (Number(form.rating) < 1 || Number(form.rating) > 5) {
      errs.rating = 'Rating must be between 1 and 5.'
    }
    if (form.year && (Number(form.year) < 1000 || Number(form.year) > new Date().getFullYear())) {
      errs.year = `Year must be between 1000 and ${new Date().getFullYear()}.`
    }
    if (form.pages && Number(form.pages) < 1) {
      errs.pages = 'Pages must be a positive number.'
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // Build the new book object and dispatch to Redux
    const newBook = {
      id: Date.now(), // use timestamp as a unique id
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      description: form.description.trim(),
      rating: parseFloat(Number(form.rating).toFixed(1)),
      year: form.year ? Number(form.year) : null,
      pages: form.pages ? Number(form.pages) : null,
      cover: form.cover,
    }

    dispatch(addBook(newBook))
    setSubmitted(true)

    // Redirect to browse page after a brief success flash
    setTimeout(() => {
      navigate('/books')
    }, 1200)
  }

  return (
    <div className="page-wrapper">
      <div className="add-book-card">
        <h1 className="section-title">Add a New Book</h1>
        <p className="add-sub">Fill in the details below and your book will appear at the top of the library.</p>

        {/* Success message shown briefly before redirect */}
        {submitted && (
          <div className="success-banner">
            ✅ Book added successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-form" noValidate>
          {/* Title */}
          <div className={`form-group ${errors.title ? 'form-group--error' : ''}`}>
            <label htmlFor="title">Book Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. The Great Gatsby"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Author */}
          <div className={`form-group ${errors.author ? 'form-group--error' : ''}`}>
            <label htmlFor="author">Author *</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="e.g. F. Scott Fitzgerald"
              value={form.author}
              onChange={handleChange}
              maxLength={80}
            />
            {errors.author && <span className="form-error">{errors.author}</span>}
          </div>

          {/* Category */}
          <div className={`form-group ${errors.category ? 'form-group--error' : ''}`}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">-- Select a category --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          {/* Description */}
          <div className={`form-group ${errors.description ? 'form-group--error' : ''}`}>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Write a short description of the book..."
              value={form.description}
              onChange={handleChange}
              maxLength={600}
            />
            <span className="char-count">{form.description.length}/600</span>
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Rating, Year, Pages — side by side */}
          <div className="form-row">
            <div className={`form-group ${errors.rating ? 'form-group--error' : ''}`}>
              <label htmlFor="rating">Rating (1–5) *</label>
              <input
                id="rating"
                name="rating"
                type="number"
                placeholder="e.g. 4.5"
                min="1"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />
              {errors.rating && <span className="form-error">{errors.rating}</span>}
            </div>

            <div className={`form-group ${errors.year ? 'form-group--error' : ''}`}>
              <label htmlFor="year">Year Published</label>
              <input
                id="year"
                name="year"
                type="number"
                placeholder="e.g. 2020"
                min="1000"
                max={new Date().getFullYear()}
                value={form.year}
                onChange={handleChange}
              />
              {errors.year && <span className="form-error">{errors.year}</span>}
            </div>

            <div className={`form-group ${errors.pages ? 'form-group--error' : ''}`}>
              <label htmlFor="pages">Pages</label>
              <input
                id="pages"
                name="pages"
                type="number"
                placeholder="e.g. 320"
                min="1"
                value={form.pages}
                onChange={handleChange}
              />
              {errors.pages && <span className="form-error">{errors.pages}</span>}
            </div>
          </div>

          {/* Cover color picker */}
          <div className="form-group">
            <label>Cover Color</label>
            <div className="color-picker">
              {COVER_COLORS.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`color-swatch ${form.cover === color ? 'color-swatch--active' : ''}`}
                  style={{ background: color }}
                  onClick={() => setForm((prev) => ({ ...prev, cover: color }))}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary submit-btn" disabled={submitted}>
              {submitted ? 'Adding...' : 'Add Book to Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBookPage
