// Todas las claves de localStorage que usa la app, centralizadas en un solo lugar.
const USERS_KEY = 'notes_app_users'
const SESSION_KEY = 'notes_app_session'
const NOTES_KEY_PREFIX = 'notes_app_notes_'

// Usuarios

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUser(username) {
  return getUsers().find((u) => u.username === username)
}

export function addUser(username, password) {
  const users = getUsers()
  users.push({ username, password })
  saveUsers(users)
}

// Actualiza usuario/contraseña. Si el username cambia, migra la clave de notas del username anterior al nuevo para no perder las notas guardadas.
export function updateUser(oldUsername, newUsername, newPassword) {
  const users = getUsers()
  const nextUsers = users.map((u) =>
    u.username === oldUsername ? { username: newUsername, password: newPassword } : u
  )
  saveUsers(nextUsers)

  if (oldUsername !== newUsername) {
    const notes = getNotes(oldUsername)
    saveNotes(newUsername, notes)
    localStorage.removeItem(notesKey(oldUsername))
  }
}

// Sesión

export function getSession() {
  return localStorage.getItem(SESSION_KEY)
}

export function setSession(username) {
  localStorage.setItem(SESSION_KEY, username)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

// Notas: una lista por usuario

function notesKey(username) {
  return `${NOTES_KEY_PREFIX}${username}`
}

export function getNotes(username) {
  const raw = localStorage.getItem(notesKey(username))
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveNotes(username, notes) {
  localStorage.setItem(notesKey(username), JSON.stringify(notes))
}
