import { useState } from 'react'
import { useAuth } from './context/AuthContext.jsx'
import { useNotes } from './hooks/useNotes.js'
import Login from './components/Login/Login.jsx'
import Header from './components/Header/Header.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import CategoryFilter from './components/CategoryFilter/CategoryFilter.jsx'
import NoteForm from './components/NoteForm/NoteForm.jsx'
import NoteList from './components/NoteList/NoteList.jsx'
import NoteModal from './components/NoteModal/NoteModal.jsx'
import Profile from './components/Profile/Profile.jsx'
import Toast from './components/Toast/Toast.jsx'

export default function App() {
  const { isAuthenticated, username } = useAuth()

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <Toast />
      </>
    )
  }

  return <NotesApp username={username} />
}

function NotesApp({ username }) {
  const [view, setView] = useState('notes')

  const {
    notes,
    totalNotes,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addNote,
    updateNote,
    deleteNote
  } = useNotes(username)

  const [noteToEdit, setNoteToEdit] = useState(null)
  const [noteToView, setNoteToView] = useState(null)

  function handleSave(formData) {
    if (noteToEdit) {
      updateNote(noteToEdit.id, formData)
      setNoteToEdit(null)
    } else {
      addNote(formData)
    }
    setView('notes')
  }

  function handleEdit(note) {
    setNoteToEdit(note)
    setView('new-note')
  }

  function handleCancelForm() {
    setNoteToEdit(null)
    setView('notes')
  }

  function handleDelete(id) {
    deleteNote(id)
    if (noteToEdit?.id === id) {
      setNoteToEdit(null)
    }
    if (noteToView?.id === id) {
      setNoteToView(null)
    }
  }

  function handleNavigate(nextView) {
    setView(nextView)
    setNoteToEdit(null)
  }

  return (
    <div className="app-container">
      <Header view={view} onNavigate={handleNavigate} />

      {view === 'notes' && (
        <>
          <div className="app-toolbar">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
          </div>

          <NoteList
            notes={notes}
            totalNotes={totalNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={setNoteToView}
          />

          <NoteModal note={noteToView} onClose={() => setNoteToView(null)} />
        </>
      )}

      {view === 'new-note' && (
        <NoteForm noteToEdit={noteToEdit} onSave={handleSave} onCancel={handleCancelForm} />
      )}

      {view === 'profile' && <Profile />}

      <Toast />
    </div>
  )
}
