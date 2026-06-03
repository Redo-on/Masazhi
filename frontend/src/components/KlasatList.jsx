import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function KlasatList({ refreshKey }) {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadClasses = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/Klasat')
      if (response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load classes')
      setClasses(await response.json())
    } catch (error) {
      console.error(error)
      setClasses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClasses()
  }, [refreshKey])

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Klasat</h2>
        <span>{classes.length} klasa të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar klasat...</p>
      ) : classes.length === 0 ? (
        <p className="empty-state">Nuk ka klasa të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Emri</th>
                <th>Pershkrimi</th>
                <th>Lloji</th>
                <th>Niveli</th>
                <th>Kohezgjatja (min)</th>
                <th>Kapaciteti Maksimal</th>
                <th>Instruktor ID</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.klase_id}>
                  <td>{cls.klase_id}</td>
                  <td>{cls.emri}</td>
                  <td>{cls.pershkrimi}</td>
                  <td>{cls.lloji}</td>
                  <td>{cls.niveli}</td>
                  <td>{cls.kohezgjatja_min}</td>
                  <td>{cls.kapaciteti_max}</td>
                  <td>{cls.instruktor_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}