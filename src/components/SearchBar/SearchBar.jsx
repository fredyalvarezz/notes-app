import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Buscar por título o contenido..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
