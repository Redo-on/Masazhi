import { useEffect, useState } from 'react'

export default function ProduktetList({ refreshKey, onEdit }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Produktet')
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

  useEffect(() => {
    loadProducts()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë produkt?')) {
      return
    }

    try {
      const response = await fetch(`/api/Produktet/${id}`, { method: 'DELETE' })
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
        <h2>Produktet</h2>
        <span>{products.length} produkte të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar produktet...</p>
      ) : products.length === 0 ? (
        <p className="empty-state">Nuk ka produkte të regjistruara.</p>
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
              {products.map((produkt) => (
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
