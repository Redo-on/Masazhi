import { useEffect, useState } from 'react'

export default function ShitjetList({ refreshKey, onEdit }) {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  const loadSales = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ShitjetProdukteve')
      if (!response.ok) throw new Error('Could not load sales')
      setSales(await response.json())
    } catch (error) {
      console.error(error)
      setSales([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSales()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë shitje?')) {
      return
    }

    try {
      const response = await fetch(`/api/ShitjetProdukteve/${id}`, { method: 'DELETE' })
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
        <h2>Shitjet e Produkteve</h2>
        <span>{sales.length} shitje të regjistruara</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar shitjet...</p>
      ) : sales.length === 0 ? (
        <p className="empty-state">Nuk ka shitje të regjistruara.</p>
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
              {sales.map((sale) => (
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
