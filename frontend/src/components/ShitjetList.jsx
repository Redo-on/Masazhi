import { useEffect, useMemo, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function ShitjetList({ refreshKey, onEdit }) {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const loadSales = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/ShitjetProdukteve')
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load sales')
      setSales(await response.json())
    } catch (error) {
      console.error(error)
      setSales([])
    } finally {
      setLoading(false)
    }
  }

  const filteredSales = useMemo(
    () =>
      sales.filter((sale) => {
        const query = search.trim().toLowerCase()
        if (!query) return true
        const memberName = sale.Anetari?.emri ?? sale.anetari?.emri ?? ''
        const produktName = sale.Produkti?.emri ?? sale.produkti?.emri ?? ''
        const saleDate = sale.data?.split?.('T')[0] ?? ''
        return (
          memberName.toLowerCase().includes(query) ||
          produktName.toLowerCase().includes(query) ||
          saleDate.includes(query)
        )
      }),
    [sales, search],
  )

  useEffect(() => {
    loadSales()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë shitje?')) {
      return
    }

    try {
      const response = await authorizedFetch(`/api/ShitjetProdukteve/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Delete request failed')
      await loadSales()
    } catch (error) {
      console.error(error)
      alert('Fshirja e shitjes dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <div>
          <h2>Shitjet e Produkteve</h2>
          <p className="list-note">Filtroni shitjet sipas anëtarit, produktit ose datës.</p>
        </div>
        <span>{filteredSales.length} shitje të regjistruara</span>
      </div>

      <div className="list-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Kërko shitje sipas anëtarit, produktit, ose datës"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar shitjet...</p>
      ) : filteredSales.length === 0 ? (
        <p className="empty-state">Nuk u gjet asnjë shitje me këtë kriter.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Anëtar</th>
                <th>Produkti</th>
                <th>Sasia</th>
                <th>Çmimi Total</th>
                <th>Data</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.shitje_id}>
                  <td>{sale.Anetari?.emri ?? sale.anetari?.emri ?? sale.anetar_id}</td>
                  <td>{sale.Produkti?.emri ?? sale.produkti?.emri ?? sale.produkti_id}</td>
                  <td>{sale.sasia}</td>
                  <td>{sale.cmimi_total?.toFixed?.(2) ?? sale.cmimi_total}</td>
                  <td>{sale.data?.split?.('T')[0] ?? ''}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(sale)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(sale.shitje_id)}>
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