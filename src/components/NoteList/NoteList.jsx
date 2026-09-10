import NoteCard from '../NoteCard/NoteCard.jsx'
import './NoteList.css'

export default function NoteList({ notes, totalNotes, onEdit, onDelete, onView }) {
  if (totalNotes === 0) {
    return (
      <div className="note-list-empty">
        <p>Aún no tienes notas.</p>
        <p className="note-list-empty-hint">Crea tu primera nota con el formulario de arriba.</p>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>No encontramos notas que coincidan con tu búsqueda o filtro.</p>
      </div>
    )
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      ))}
    </div>
  )
}
