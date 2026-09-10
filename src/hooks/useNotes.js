import { useEffect, useMemo, useState } from 'react'
import { getNotes, saveNotes } from '../services/storage.js'
import { useToast } from '../context/ToastContext.jsx'

export function useNotes(username) {
  const { showToast } = useToast()
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todas')

  // Cargamos las notas del usuario cuando cambia la sesión.
  useEffect(() => {
    if (username) {
      setNotes(getNotes(username))
    } else {
      setNotes([])
    }
  }, [username])

  function persist(nextNotes) {
    setNotes(nextNotes)
    saveNotes(username, nextNotes)
  }

  function addNote({ title, content, category }) {
    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      category: category || '',
      createdAt: new Date().toISOString()
    }
    persist([newNote, ...notes])
    showToast('Nota agregada')
  }

  function updateNote(id, { title, content, category }) {
    const nextNotes = notes.map((note) =>
      note.id === id
        ? { ...note, title: title.trim(), content: content.trim(), category: category || '' }
        : note
    )
    persist(nextNotes)
    showToast('Nota actualizada')
  }

  function deleteNote(id) {
    const nextNotes = notes.filter((note) => note.id !== id)
    persist(nextNotes)
    showToast('Nota eliminada')
  }

  // Notas filtradas por búsqueda, categoría y ordenadas por fecha.
  const visibleNotes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return notes
      .filter((note) => {
        const matchesSearch =
          term === '' ||
          note.title.toLowerCase().includes(term) ||
          note.content.toLowerCase().includes(term)

        const matchesCategory =
          categoryFilter === 'Todas' || note.category === categoryFilter

        return matchesSearch && matchesCategory
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [notes, searchTerm, categoryFilter])

  return {
    notes: visibleNotes,
    totalNotes: notes.length,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addNote,
    updateNote,
    deleteNote
  }
}
