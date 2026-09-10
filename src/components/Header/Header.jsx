import { useAuth } from '../../context/AuthContext.jsx'
import './Header.css'

export default function Header({ view, onNavigate }) {
  const { username, logout } = useAuth()

  return (
    <header className="app-header">
      <div className="app-header-top">
        <div>
          <h1 className="app-header-title">Notas</h1>
          <p className="app-header-user">Hola, {username}</p>
        </div>
        <button type="button" className="app-header-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <nav className="app-header-nav">
        <button
          type="button"
          className={`app-header-nav-item ${view === 'notes' ? 'is-active' : ''}`}
          onClick={() => onNavigate('notes')}
        >
          Mis Notas
        </button>
        <button
          type="button"
          className={`app-header-nav-item ${view === 'new-note' ? 'is-active' : ''}`}
          onClick={() => onNavigate('new-note')}
        >
          Nueva Nota
        </button>
        <button
          type="button"
          className={`app-header-nav-item ${view === 'profile' ? 'is-active' : ''}`}
          onClick={() => onNavigate('profile')}
        >
          Perfil
        </button>
      </nav>
    </header>
  )
}
