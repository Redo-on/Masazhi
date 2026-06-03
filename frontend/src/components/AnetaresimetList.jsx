import { useEffect, useState } from 'react'

export default function AnetaresimetList({ refreshKey }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)

  const loadSubscriptions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Anetaresimet')
      if (!response.ok) throw new Error('Could not load subscriptions')
      setSubscriptions(await response.json())
    } catch (error) {
      console.error(error)
      setSubscriptions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubscriptions()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Anetarësimet</h2>
        <span>{subscriptions.length} anetarësime të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar anetarësimet...</p>
      ) : subscriptions.length === 0 ? (
        <p className="empty-state">Nuk ka anetarësime të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Anëtar ID</th>
                <th>Lloji</th>
                <th>Çmimi</th>
                <th>Data Fillimit</th>
                <th>Data Mbarimit</th>
                <th>Statusi</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.anetaresimi_id}>
                  <td>{sub.anetaresimi_id}</td>
                  <td>{sub.anetar_id}</td>
                  <td>{sub.lloji}</td>
                  <td>{sub.cmimi?.toFixed?.(2) ?? sub.cmimi} €</td>
                  <td>{sub.data_fillimit?.split?.('T')[0] ?? sub.data_fillimit}</td>
                  <td>{sub.data_mbarimit?.split?.('T')[0] ?? sub.data_mbarimit}</td>
                  <td>{sub.statusi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}