import { useEffect } from 'react'
import { formatFriendlyDate } from '../../utils/formatDate.js'
import './NoteModal.css'

export default function NoteModal({ note, onClose }) {
  // Cerrar con la tecla ESC.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!note) return null

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="note-modal-overlay" onClick={handleOverlayClick}>
      <div className="note-modal" role="dialog" aria-modal="true" aria-labelledby="note-modal-title">
        <div className="note-modal-header">
          <h2 id="note-modal-title" className="note-modal-title">
            {note.title}
          </h2>
          <button type="button" className="note-modal-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>

        <div className="note-modal-meta">
          {note.category && <span className="note-modal-category">{note.category}</span>}
          <span className="note-modal-date">{formatFriendlyDate(note.createdAt)}</span>
        </div>

        <p className="note-modal-content">{note.content}</p>
      </div>
    </div>
  )
}
