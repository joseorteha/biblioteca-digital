"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    // In a real app, this would call your API
    // For demo purposes, we'll simulate a successful login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          const userData = {
            id: "1",
            name: "Estudiante Demo",
            username,
            role: "Estudiante",
          }
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error("Credenciales inválidas"))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

