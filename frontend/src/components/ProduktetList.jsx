import { useEffect, useMemo, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function ProduktetList({ refreshKey, onEdit }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/Produktet')
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error(error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = useMemo(
    () =>
      products.filter((produkt) => {
        const query = search.trim().toLowerCase()
        if (!query) return true
        return (
          produkt.emri?.toLowerCase().includes(query) ||
          produkt.kategoria?.toLowerCase().includes(query) ||
          produkt.pershkrimi?.toLowerCase().includes(query)
        )
      }),
    [products, search],
  )

  useEffect(() => {
    loadProducts()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë produkt?')) {
      return
    }

    try {
      const response = await authorizedFetch(`/api/Produktet/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Delete request failed')
      await loadProducts()
    } catch (error) {
      console.error(error)
      alert('Fshirja e produktit dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <div>
          <h2>Produktet</h2>
          <p className="list-note">Menaxhoni produktet dhe filtroni me kërkim.</p>
        </div>
        <span>{filteredProducts.length} produkte të gjetura</span>
      </div>

      <div className="list-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Kërko produkt sipas emrit, kategorisë ose përshkrimit"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar produktet...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="empty-state">Nuk u gjet asnjë produkt me këtë kriter.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Emri</th>
                <th>Kategoria</th>
                <th>Çmimi</th>
                <th>Stok</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((produkt) => (
                <tr key={produkt.produkti_id}>
                  <td>{produkt.emri}</td>
                  <td>{produkt.kategoria}</td>
                  <td>{produkt.cmimi?.toFixed?.(2) ?? produkt.cmimi}</td>
                  <td>{produkt.sasia_stok}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(produkt)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(produkt.produkti_id)}>
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