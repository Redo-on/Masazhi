import { useEffect, useMemo, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function OrariList({ refreshKey, onEdit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/Orari')
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load orari')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error(error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(
    () =>
      items.filter((it) => {
        const q = search.trim().toLowerCase()
        if (!q) return true
        return (
          String(it.klasa_id).includes(q) ||
          (it.dita_javes ?? '').toLowerCase().includes(q) ||
          (it.statusi ?? '').toLowerCase().includes(q) ||
          String(it.salla_id).includes(q)
        )
      }),
    [items, search],
  )

  useEffect(() => {
    loadItems()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë orar?')) return

    try {
      const response = await authorizedFetch(`/api/Orari/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Delete request failed')
      await loadItems()
    } catch (error) {
      console.error(error)
      alert('Fshirja e orarit dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <div>
          <h2>Orari</h2>
          <p className="list-note">Menaxhoni oraret dhe filtroni me kërkim.</p>
        </div>
        <span>{filtered.length} rezultate</span>
      </div>

      <div className="list-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Kërko sipas klase, dite, sallë ose statusi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar oraret...</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">Nuk u gjet asnjë orar me këtë kriter.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Klasa ID</th>
                <th>Dita</th>
                <th>Ora Fillim</th>
                <th>Ora Fund</th>
                <th>Salla ID</th>
                <th>Statusi</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.orar_id}>
                  <td>{it.klasa_id}</td>
                  <td>{it.dita_javes}</td>
                  <td>{it.ora_fillimit}</td>
                  <td>{it.ora_perfundimit}</td>
                  <td>{it.salla_id}</td>
                  <td>{it.statusi}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(it)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(it.orar_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}