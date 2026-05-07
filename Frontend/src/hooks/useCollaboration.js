import { useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

export function useCollaboration(username) {
  const [users, setUsers] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])

  useEffect(() => {
    if (!username) return

    const provider = new SocketIOProvider("/", "monaco", ydoc, {
      autoConnect: true,
    })

    provider.awareness.setLocalStateField("user", { username })

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values())
      setUsers(
        states
          .filter((state) => state.user && state.user.username)
          .map((state) => state.user)
      )
    }

    updateUsers()
    provider.awareness.on("change", updateUsers)

    function handleBeforeUnload() {
      provider.awareness.setLocalStateField("user", null)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      provider.disconnect()
      provider.awareness.off("change", updateUsers)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [username, ydoc])

  return { ydoc, yText, users }
}
