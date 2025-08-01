"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors">
            💰 The YouFinance
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-indigo-200 transition-colors font-medium">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-indigo-200 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/accounts" className="text-white hover:text-indigo-200 transition-colors font-medium">
                  Accounts
                </Link>
                <Link to="/transactions" className="text-white hover:text-indigo-200 transition-colors font-medium">
                  Transactions
                </Link>
                <Link to="/reports" className="text-white hover:text-indigo-200 transition-colors font-medium">
                  Reports
                </Link>
                <Link to="/profile" className="text-white hover:text-indigo-200 transition-colors font-medium">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-indigo-200 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/about" className="text-white hover:text-indigo-200 transition-colors font-medium">
              About
            </Link>
          </div>
          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none hover:text-indigo-200 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
