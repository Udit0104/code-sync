import { useRef } from "react"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"

function CodeEditor({ yText }) {
  const editorRef = useRef(null)

  const handleMount = (editor) => {
    editorRef.current = editor
    new MonacoBinding(yText, editorRef.current.getModel(), new Set([editorRef.current]))
  }

  return (
    <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// start coding..."
        theme="vs-dark"
        onMount={handleMount}
      />
    </section>
  )
}

export default CodeEditor
