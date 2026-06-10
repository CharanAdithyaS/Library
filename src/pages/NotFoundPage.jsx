import { Link, useLocation } from 'react-router-dom'
import './NotFoundPage.css'

// This page intentionally does NOT include the Navbar (as per requirements)
function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <div className="notfound-emoji">📭</div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-url">
          The route <code>{location.pathname}</code> does not exist.
        </p>
        <p className="notfound-msg">
          Looks like you took a wrong turn. The page you're looking for
          isn't here — it may have been moved or never existed.
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
