import { useEffect, useState } from 'react'

export default function AnetaretList({ refreshKey }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMembers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/Anetaret')
      if (!response.ok) throw new Error('Could not load members')
      setMembers(await response.json())
    } catch (error) {
      console.error(error)
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Anetarët</h2>
        <span>{members.length} anëtarë të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar anëtarët...</p>
      ) : members.length === 0 ? (
        <p className="empty-state">Nuk ka anëtarë të regjistruar.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Emri</th>
                <th>Mbiemri</th>
                <th>Email</th>
                <th>Telefoni</th>
                <th>Statusi</th>
                <th>Data regjistrimit</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.anetar_id}>
                  <td>{member.anetar_id}</td>
                  <td>{member.emri}</td>
                  <td>{member.mbiemri}</td>
                  <td>{member.email}</td>
                  <td>{member.telefoni}</td>
                  <td>{member.statusi}</td>
                  <td>{member.data_regjistrimit?.split?.('T')[0] ?? member.data_regjistrimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}