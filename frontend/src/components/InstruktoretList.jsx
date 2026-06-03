import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function InstruktoretList({ refreshKey }) {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadInstructors = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/Instruktoret')
      if (response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load instructors')
      setInstructors(await response.json())
    } catch (error) {
      console.error(error)
      setInstructors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInstructors()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Instruktorët</h2>
        <span>{instructors.length} instruktorë të gjetur</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar instruktorët...</p>
      ) : instructors.length === 0 ? (
        <p className="empty-state">Nuk ka instruktorë të regjistruar.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Emri</th>
                <th>Mbiemri</th>
                <th>Specializimi</th>
                <th>Telefoni</th>
                <th>Email</th>
                <th>Tarifa Orore</th>
                <th>Data Fillimit</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.instruktor_id}>
                  <td>{instructor.instruktor_id}</td>
                  <td>{instructor.emri}</td>
                  <td>{instructor.mbiemri}</td>
                  <td>{instructor.specializimi}</td>
                  <td>{instructor.telefoni}</td>
                  <td>{instructor.email}</td>
                  <td>{instructor.tarifa_orare?.toFixed?.(2) ?? instructor.tarifa_orare} €/orë</td>
                  <td>{instructor.data_fillimit?.split?.('T')[0] ?? instructor.data_fillimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}