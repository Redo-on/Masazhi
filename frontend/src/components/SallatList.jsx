import { useEffect, useMemo, useState } from 'react'

export default function SallatList({ refreshKey, onEdit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Salla')
      if (!response.ok) throw new Error('Could not load sallat')
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
          (it.emri ?? '').toLowerCase().includes(q) ||
          (it.pajisjet ?? '').toLowerCase().includes(q) ||
          (it.pershkrimi ?? '').toLowerCase().includes(q) ||
          String(it.kapaciteti).includes(q)
        )
      }),
    [items, search],
  )

  useEffect(() => {
    loadItems()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë sallë?')) return

    try {
      const response = await fetch(`/api/Salla/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Delete request failed')
      await loadItems()
    } catch (error) {
      console.error(error)
      alert('Fshirja e sallës dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <div>
          <h2>Sallat</h2>
          <p className="list-note">Menaxhoni sallat e qendrës dhe kapacitetet e tyre.</p>
        </div>
        <span>{filtered.length} rezultate</span>
      </div>

      <div className="list-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Kërko sipas emrit, pajisjeve ose përshkrimit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar sallat...</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">Nuk u gjet asnjë sallë me këtë kriter.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Emri</th>
                <th>Kapaciteti</th>
                <th>Pajisjet</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.salla_id}>
                  <td>{it.emri}</td>
                  <td>{it.kapaciteti}</td>
                  <td>{it.pajisjet}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(it)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(it.salla_id)}>
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
