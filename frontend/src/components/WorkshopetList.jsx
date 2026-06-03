import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function WorkshopetList({ refreshKey, onEdit }) {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadWorkshops = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/Workshopet')
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load workshops')
      setWorkshops(await response.json())
    } catch (error) {
      console.error(error)
      setWorkshops([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkshops()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë workshop?')) {
      return
    }

    try {
      const response = await authorizedFetch(`/api/Workshopet/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Delete request failed')
      await loadWorkshops()
    } catch (error) {
      console.error(error)
      alert('Fshirja e workshop-it dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Workshopet</h2>
        <span>{workshops.length} workshop-e të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar workshop-et...</p>
      ) : workshops.length === 0 ? (
        <p className="empty-state">Nuk ka workshop-e të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Titulli</th>
                <th>Instruktor ID</th>
                <th>Data</th>
                <th>Koha</th>
                <th>Çmimi</th>
                <th>Kapaciteti</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop) => (
                <tr key={workshop.workshop_id}>
                  <td>{workshop.titulli}</td>
                  <td>{workshop.Instruktori?.emri ?? workshop.instruktori?.emri ?? workshop.instruktor_id}</td>
                  <td>{workshop.data?.split?.('T')[0] ?? workshop.data}</td>
                  <td>{workshop.ora_fillimit} - {workshop.ora_perfundimit}</td>
                  <td>{workshop.cmimi?.toFixed?.(2) ?? workshop.cmimi} €</td>
                  <td>{workshop.kapaciteti}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(workshop)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(workshop.workshop_id)}>
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