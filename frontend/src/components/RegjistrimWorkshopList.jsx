import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function RegjistrimWorkshopList({ refreshKey, onEdit }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadRegistrations = async () => {
    setLoading(true)
    try {
      const response = await authorizedFetch('/api/RegjistrimWorkshop')
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Could not load workshop registrations')
      setItems(await response.json())
    } catch (error) {
      console.error(error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRegistrations()
  }, [refreshKey])

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që dëshironi të fshini këtë regjistrim?')) {
      return
    }

    try {
      const response = await authorizedFetch(`/api/RegjistrimWorkshop/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      if (!response.ok) throw new Error('Delete request failed')
      await loadRegistrations()
    } catch (error) {
      console.error(error)
      alert('Fshirja e regjistrimit dështoi.')
    }
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Regjistrimet në Workshop-e</h2>
        <span>{items.length} regjistrime të gjetura</span>
      </div>

      {loading ? (
        <p className="loading">Duke ngarkuar regjistrimet...</p>
      ) : items.length === 0 ? (
        <p className="empty-state">Nuk ka regjistrime të regjistruara.</p>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Anëtar</th>
                <th>Workshop</th>
                <th>Data Regjistrimit</th>
                <th>Statusi i Pagesës</th>
                <th>Veprime</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.rw_id}>
                  <td>{item.rw_id}</td>
                  <td>{item.Anetari?.emri ?? item.anetari?.emri ?? `Anëtari ${item.anetar_id}`}</td>
                  <td>{item.Workshopi?.titulli ?? item.workshop?.titulli ?? `Workshop ${item.workshop_id}`}</td>
                  <td>{item.data_regjistrimit?.split?.('T')[0] ?? item.data_regjistrimit}</td>
                  <td>{item.statusi_pageses}</td>
                  <td className="actions-cell">
                    <button className="button button-small" onClick={() => onEdit(item)}>
                      Edit
                    </button>
                    <button className="button button-small button-danger" onClick={() => handleDelete(item.rw_id)}>
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