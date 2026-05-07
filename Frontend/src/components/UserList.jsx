function UserList({ users }) {
  return (
    <aside className="h-full w-1/4 bg-amber-50 rounded-lg">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Users</h2>
      <ul className="p-4">
        {users.map((user, index) => (
          <li key={index} className="p-2 bg-gray-800 text-white rounded-lg mb-2">
            {user.username}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default UserList
