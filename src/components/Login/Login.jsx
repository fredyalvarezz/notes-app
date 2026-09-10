import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import './Login.css'

export default function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const result = mode === 'login' ? login(username, password) : register(username, password)

    if (!result.success) {
      setError(result.error)
    }
  }

  function toggleMode() {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setError('')
  }

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Notas</h1>
        <p className="login-subtitle">
          {mode === 'login' ? 'Inicia sesión para continuar' : 'Crea una cuenta para empezar'}
        </p>

        <label className="login-label" htmlFor="username">
          Usuario
        </label>
        <input
          id="username"
          type="text"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="login-label" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        <button type="button" className="login-toggle" onClick={toggleMode}>
          {mode === 'login' ? '¿No tienes cuenta? Crea una' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </form>
    </div>
  )
}
