import { useMemo, useState, useEffect, useCallback } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

export function useCollaboration(username) {
  const [users, setUsers] = useState([])
  const [language, setLanguageState] = useState("javascript")
  const [provider, setProvider] = useState(null)

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])

  // Shared language stored in a Yjs map so it persists and syncs to late joiners
  const yMeta = useMemo(() => ydoc.getMap("meta"), [ydoc])

  useEffect(() => {
    if (!username) return

    const _provider = new SocketIOProvider("/", "monaco", ydoc, {
      autoConnect: true,
    })

    setProvider(_provider)

    _provider.awareness.setLocalStateField("user", { username })

    const updateUsers = () => {
      const states = Array.from(_provider.awareness.getStates().values())
      setUsers(
        states
          .filter((state) => state.user && state.user.username)
          .map((state) => state.user)
      )
    }

    updateUsers()
    _provider.awareness.on("change", updateUsers)

    // Sync language from shared Yjs map
    const updateLanguage = () => {
      const lang = yMeta.get("language")
      if (lang) setLanguageState(lang)
    }

    updateLanguage()
    yMeta.observe(updateLanguage)

    function handleBeforeUnload() {
      _provider.awareness.setLocalStateField("user", null)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      _provider.disconnect()
      _provider.awareness.off("change", updateUsers)
      yMeta.unobserve(updateLanguage)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [username, ydoc, yMeta])

  // When a user changes the language, write it to the shared Yjs map
  const setLanguage = useCallback(
    (lang) => {
      yMeta.set("language", lang)
    },
    [yMeta]
  )

  return { ydoc, yText, users, language, setLanguage }
}
