import { formatFriendlyDate } from '../../utils/formatDate.js'
import './NoteCard.css'

export default function NoteCard({ note, onEdit, onDelete, onView }) {
  function handleDelete(event) {
    event.stopPropagation()
    const confirmed = window.confirm('¿Eliminar esta nota? Esta acción no se puede deshacer.')
    if (confirmed) {
      onDelete(note.id)
    }
  }

  function handleEdit(event) {
    event.stopPropagation()
    onEdit(note)
  }

  return (
    <article className="note-card" onClick={() => onView(note)}>
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        {note.category && <span className="note-card-category">{note.category}</span>}
      </div>

      <p className="note-card-content">{note.content}</p>

      <div className="note-card-footer">
        <span className="note-card-date">{formatFriendlyDate(note.createdAt)}</span>
        <div className="note-card-actions">
          <button type="button" className="note-card-edit" onClick={handleEdit}>
            Editar
          </button>
          <button type="button" className="note-card-delete" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}
