"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { loginUser, registerUser, logoutUser, checkAuthStatus } from "../services/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuthStatus()
        if (data.user) {
          setUser(data.user)
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
    try {
      const data = await loginUser(email, password)
      setUser(data)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password)
      setUser(data)
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
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
