export const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JSON", value: "json" },
  { label: "Markdown", value: "markdown" },
]

function LanguageSelector({ language, onChange }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border-b border-neutral-700">
      <label className="text-neutral-400 text-sm">Language:</label>
      <select
        value={language}
        onChange={(e) => onChange(e.target.value)}
        className="bg-neutral-800 text-white text-sm px-2 py-1 rounded border border-neutral-600 focus:outline-none focus:border-amber-400 cursor-pointer"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
