"use client"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    navigate("/login")
    setIsMobileMenuOpen(false) 
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
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none hover:text-indigo-200 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-indigo-500">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/accounts" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Accounts
                  </Link>
                  <Link 
                    to="/transactions" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Transactions
                  </Link>
                  <Link 
                    to="/reports" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link 
                to="/about" 
                className="text-white hover:text-indigo-200 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
