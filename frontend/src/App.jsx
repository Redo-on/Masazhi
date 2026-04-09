
import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>
  )
}

export default App