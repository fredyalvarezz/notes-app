import './CategoryFilter.css'

export const CATEGORIES = ['Trabajo', 'Personal', 'Estudios', 'Ideas', 'Otros']

export default function CategoryFilter({ value, onChange }) {
  const options = ['Todas', ...CATEGORIES]

  return (
    <div className="category-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`category-filter-pill ${value === option ? 'is-active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
