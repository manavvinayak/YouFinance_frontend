"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    try {
      setError("")
      setIsLoading(true)
      
      // Wait for login to complete
      const success = await login(email, password)
      
      if (success) {
        // Longer delay to ensure state updates properly
        // This helps avoid the race condition where the page navigates before auth state is fully updated
        setTimeout(() => {
          navigate("/dashboard", { replace: true }) // Use replace to prevent back button issues
        }, 500)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(
        err.message === "Failed to fetch" 
          ? "Unable to connect to server. Please check your connection." 
          : err.message || "Invalid email or password. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <AuthForm 
            type="login" 
            onSubmit={handleLogin} 
            errorMessage={error} 
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
