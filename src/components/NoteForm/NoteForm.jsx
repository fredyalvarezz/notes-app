import { useEffect, useState } from 'react'
import { CATEGORIES } from '../CategoryFilter/CategoryFilter.jsx'
import './NoteForm.css'

const EMPTY_FORM = { title: '', content: '', category: '' }

export default function NoteForm({ noteToEdit, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const isEditing = Boolean(noteToEdit)

  // Cuando cambia la nota a editar (o se limpia), sincronizamos el formulario.
  useEffect(() => {
    if (noteToEdit) {
      setForm({
        title: noteToEdit.title,
        content: noteToEdit.content,
        category: noteToEdit.category || ''
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [noteToEdit])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.content.trim()) return

    onSave(form)
    setForm(EMPTY_FORM)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2 className="note-form-title">{isEditing ? 'Editar nota' : 'Nueva nota'}</h2>

      <input
        type="text"
        className="note-form-input"
        placeholder="Título"
        value={form.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
      />

      <textarea
        className="note-form-textarea"
        placeholder="Escribe el contenido de tu nota..."
        value={form.content}
        onChange={(e) => handleChange('content', e.target.value)}
        rows={4}
        required
      />

      <select
        className="note-form-select"
        value={form.category}
        onChange={(e) => handleChange('category', e.target.value)}
      >
        <option value="">Sin categoría</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="note-form-actions">
        <button type="button" className="note-form-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="note-form-submit">
          {isEditing ? 'Guardar cambios' : 'Agregar nota'}
        </button>
      </div>
    </form>
  )
}
