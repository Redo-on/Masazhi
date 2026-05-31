import { useEffect, useState } from 'react'

export default function PagesatList({ refreshKey }) {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  const loadPagesat = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Anetaret/pagesat')
      if (!response.ok) throw new Error('Could not load payments')
      setPayments(await response.json())
    } catch (error) {
      console.error(error)
      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPagesat()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Pagesat</h2>
        <span>{payments.length} pagesa të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar pagesat...</p>
      ) : payments.length === 0 ? (
        <p className="empty-state">Nuk ka pagesa të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Anëtar ID</th>
                <th>Anetaresim ID</th>
                <th>Shuma</th>
                <th>Metoda</th>
                <th>Data</th>
                <th>Statusi</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.pagese_id}>
                  <td>{payment.pagese_id}</td>
                  <td>{payment.anetar_id}</td>
                  <td>{payment.anetaresim_id}</td>
                  <td>{payment.shuma?.toFixed?.(2) ?? payment.shuma}</td>
                  <td>{payment.metoda}</td>
                  <td>{payment.data_pageses?.split?.('T')[0] ?? payment.data_pageses}</td>
                  <td>{payment.statusi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
