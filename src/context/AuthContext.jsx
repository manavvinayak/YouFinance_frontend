"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { loginUser, registerUser, logoutUser, checkAuthStatus } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userCurrency, setUserCurrency] = useState('USD') // Default currency

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuthStatus()
        if (data.user) {
          setUser(data.user)
          setUserCurrency(data.user.currency || 'USD') // Set user's currency
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    verifyAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true) // Set loading state
    try {
      const data = await loginUser(email, password)
      setUser(data.user || data) // Handle different response formats
      setUserCurrency((data.user || data).currency || 'USD')
      return true
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false) // Always clear loading state
    }
  }

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password)
      setUser(data)
      setUserCurrency(data.currency || 'USD') // Set user's currency on register
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      setUserCurrency('USD') // Reset to default currency
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  // Function to update user currency
  const updateUserCurrency = (newCurrency) => {
    setUserCurrency(newCurrency)
    // Also update the user object if it exists
    if (user) {
      setUser(prev => ({ ...prev, currency: newCurrency }))
    }
  }

  return <AuthContext.Provider value={{ 
    user, 
    loading, 
    userCurrency, 
    login, 
    register, 
    logout, 
    updateUserCurrency 
  }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
