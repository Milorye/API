import { useEffect, useState } from 'react'
import axios from 'axios'

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        )

        setListOfUsers(response.data)
      } catch (err) {
        setError('Unable to load users. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="page-shell">
      <section className="users-panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Team directory</p>
            <h1>Users</h1>
          </div>

          <label className="search-box" htmlFor="user-search">
            <span>Search</span>
            <input
              id="user-search"
              type="text"
              placeholder="Find by name..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </header>

        {loading && <p className="status-message loading">Loading users...</p>}

        {error && <p className="status-message error">{error}</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="status-message empty">No users match your search.</p>
        )}

        <div className="user-list">
          {!loading &&
            !error &&
            filteredUsers.map((user) => {
              const isSelected = selectedUserId === user.id

              return (
                <article key={user.id} className={`user-card ${isSelected ? 'selected' : ''}`}>
                  <button
                    type="button"
                    className="user-button"
                    onClick={() =>
                      setSelectedUserId(isSelected ? null : user.id)
                    }
                  >
                    <div>
                      <h2>{user.name}</h2>
                      <p>{user.email}</p>
                    </div>
                    <span className="company-name">{user.company.name}</span>
                  </button>

                  {isSelected && (
                    <div className="user-details">
                      <div>
                        <span className="detail-label">Address</span>
                        <p>
                          {user.address.street}, {user.address.suite}, {user.address.city}
                        </p>
                      </div>

                      <div>
                        <span className="detail-label">Phone</span>
                        <p>{user.phone}</p>
                      </div>

                      <div>
                        <span className="detail-label">Website</span>
                        <p>{user.website}</p>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
        </div>
      </section>
    </main>
  )
}

export default UserList
