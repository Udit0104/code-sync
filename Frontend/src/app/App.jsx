import { useState } from "react"
import "./App.css"
import { useCollaboration } from "../hooks/useCollaboration"
import JoinScreen from "../components/JoinScreen"
import UserList from "../components/UserList"
import CodeEditor from "../components/CodeEditor"

function App() {
  const [username, setUsername] = useState(
    () => new URLSearchParams(window.location.search).get("username") || ""
  )

  const { yText, users, language, setLanguage } = useCollaboration(username)

  const handleJoin = (name) => {
    setUsername(name)
    window.history.pushState({}, "", "?username=" + name)
  }

  if (!username) {
    return <JoinScreen onJoin={handleJoin} />
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4">
      <UserList users={users} />
      <CodeEditor yText={yText} language={language} onLanguageChange={setLanguage} />
    </main>
  )
}

export default App
