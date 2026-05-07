function JoinScreen({ onJoin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value.trim()
    if (!username) return
    onJoin(username)
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your username"
          className="p-2 rounded-lg bg-gray-800 text-white"
          name="username"
        />
        <button className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold">
          Join
        </button>
      </form>
    </main>
  )
}

export default JoinScreen
