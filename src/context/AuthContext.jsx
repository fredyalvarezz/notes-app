import { createContext, useContext, useState } from 'react'
import {
  findUser,
  addUser,
  updateUser,
  getSession,
  setSession,
  clearSession
} from '../services/storage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Al cargar la app, revisamos si ya había una sesión guardada.
  const [username, setUsername] = useState(() => getSession())

  function login(username, password) {
    const user = findUser(username)

    if (!user) {
      return { success: false, error: 'Ese usuario no existe.' }
    }

    if (user.password !== password) {
      return { success: false, error: 'La contraseña es incorrecta.' }
    }

    setSession(username)
    setUsername(username)
    return { success: true }
  }

  function register(username, password) {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Usuario y contraseña son obligatorios.' }
    }

    if (findUser(username)) {
      return { success: false, error: 'Ese usuario ya existe.' }
    }

    addUser(username, password)
    setSession(username)
    setUsername(username)
    return { success: true }
  }

  function logout() {
    clearSession()
    setUsername(null)
  }

  function updateProfile(newUsername, newPassword) {
    if (!newUsername.trim()) {
      return { success: false, error: 'El usuario es obligatorio.' }
    }

    const trimmedUsername = newUsername.trim()

    if (trimmedUsername !== username && findUser(trimmedUsername)) {
      return { success: false, error: 'Ese usuario ya existe.' }
    }

    const user = findUser(username)
    const password = newPassword.trim() ? newPassword : user.password

    updateUser(username, trimmedUsername, password)
    setSession(trimmedUsername)
    setUsername(trimmedUsername)

    return { success: true }
  }

  const value = {
    username,
    isAuthenticated: Boolean(username),
    login,
    register,
    logout,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
