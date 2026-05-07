import { useRef, useEffect } from "react"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import LanguageSelector from "./LanguageSelector"

function CodeEditor({ yText, language, onLanguageChange }) {
  const editorRef = useRef(null)

  // When language changes, update the Monaco model language
  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel()
      if (model) {
        import("monaco-editor").then((monaco) => {
          monaco.editor.setModelLanguage(model, language)
        })
      }
    }
  }, [language])

  const handleMount = (editor) => {
    editorRef.current = editor
    new MonacoBinding(yText, editorRef.current.getModel(), new Set([editorRef.current]))
  }

  return (
    <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden flex flex-col">
      <LanguageSelector language={language} onChange={onLanguageChange} />
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// start coding..."
          theme="vs-dark"
          onMount={handleMount}
        />
      </div>
    </section>
  )
}

export default CodeEditor
