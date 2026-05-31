import { useEffect, useState } from 'react'

export default function RegjistrimetList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const loadRegjistrimet = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Anetaret/regjistrimet')
      if (!response.ok) throw new Error('Could not load registrations')
      setItems(await response.json())
    } catch (error) {
      console.error(error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRegjistrimet()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Regjistrimet</h2>
        <span>{items.length} regjistrime të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar regjistrimet...</p>
      ) : items.length === 0 ? (
        <p className="empty-state">Nuk ka regjistrime të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Anëtar ID</th>
                <th>Orar ID</th>
                <th>Data</th>
                <th>Statusi</th>
                <th>Shënimet</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.regjistrim_id}>
                  <td>{item.regjistrim_id}</td>
                  <td>{item.anetar_id}</td>
                  <td>{item.orar_id}</td>
                  <td>{item.data?.split?.('T')[0] ?? item.data}</td>
                  <td>{item.statusi}</td>
                  <td>{item.shenimet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
