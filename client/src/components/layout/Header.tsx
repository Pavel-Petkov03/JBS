import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobBoard
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
