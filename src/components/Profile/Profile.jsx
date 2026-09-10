import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import './Profile.css'

export default function Profile() {
  const { username, updateProfile } = useAuth()
  const { showToast } = useToast()

  const [form, setForm] = useState({ username, password: '' })
  const [error, setError] = useState('')

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const result = updateProfile(form.username, form.password)

    if (!result.success) {
      setError(result.error)
      return
    }

    showToast('Perfil actualizado')
    setForm((prev) => ({ ...prev, password: '' }))
  }

  return (
    <div className="profile">
      <h2 className="profile-title">Editar perfil</h2>
      <p className="profile-subtitle">
        Actualiza tu usuario o tu contraseña.
      </p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="profile-label" htmlFor="profile-username">
          Usuario
        </label>
        <input
          id="profile-username"
          type="text"
          className="profile-input"
          value={form.username}
          onChange={(e) => handleChange('username', e.target.value)}
          autoComplete="username"
          required
        />

        <label className="profile-label" htmlFor="profile-password">
          Nueva contraseña
        </label>
        <input
          id="profile-password"
          type="password"
          className="profile-input"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Escribe una nueva contraseña"
          autoComplete="new-password"
        />

        <p className="profile-hint">
          Deja este campo vacío si no quieres cambiar tu contraseña.
        </p>

        {error && <p className="profile-error">{error}</p>}

        <button type="submit" className="profile-submit">
          Guardar cambios
        </button>
      </form>
    </div>
  )
}