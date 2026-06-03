import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyRegistration = {
  rw_id: null,
  workshop_id: '',
  anetar_id: '',
  data_regjistrimit: '',
  statusi_pageses: '',
}

export default function RegjistrimWorkshopForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyRegistration)
  const [workshops, setWorkshops] = useState([])
  const [members, setMembers] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')
  const isEditing = selected?.rw_id != null
  const navigate = useNavigate()

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const response = await authorizedFetch('/api/Workshopet')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (response.ok) setWorkshops(await response.json())
      } catch (error) {
        console.error('Could not load workshops for dropdown', error)
      }
    }

    const loadMembers = async () => {
      try {
        const response = await authorizedFetch('/api/Anetaret')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (response.ok) setMembers(await response.json())
      } catch (error) {
        console.error('Could not load members for dropdown', error)
      }
    }

    loadWorkshops()
    loadMembers()
  }, [])

  useEffect(() => {
    if (selected) {
      setForm({
        rw_id: selected.rw_id,
        workshop_id: selected.workshop_id?.toString() ?? '',
        anetar_id: selected.anetar_id?.toString() ?? '',
        data_regjistrimit: selected.data_regjistrimit ? selected.data_regjistrimit.split('T')[0] : '',
        statusi_pageses: selected.statusi_pageses ?? '',
      })
    } else {
      setForm(emptyRegistration)
    }
  }, [selected])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValidationError('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidationError('')

    const workshopId = Number(form.workshop_id)
    const anetarId = Number(form.anetar_id)
    if (!workshopId || !anetarId) {
      setValidationError('Zgjidhni një anëtar dhe një workshop të vlefshëm.')
      return
    }

    const payload = {
      workshop_id: workshopId,
      anetar_id: anetarId,
      data_regjistrimit: form.data_regjistrimit || new Date().toISOString(),
      statusi_pageses: form.statusi_pageses,
    }

    if (isEditing) {
      payload.rw_id = form.rw_id
    }

    setIsSaving(true)
    try {
      const url = isEditing ? `/api/RegjistrimWorkshop/${form.rw_id}` : '/api/RegjistrimWorkshop'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await authorizedFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }

      if (!response.ok) throw new Error('Failed to save registration')

      setForm(emptyRegistration)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert('Regjistrimi në workshop dështoi.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Regjistrimin në Workshop' : 'Regjistro Anëtar në Workshop'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Anëtar
          <select
            name="anetar_id"
            value={form.anetar_id}
            onChange={handleChange}
            required
            disabled={members.length === 0}
          >
            <option value="">Zgjidh anëtar</option>
            {members.map((member) => (
              <option key={member.anetar_id} value={member.anetar_id}>
                {member.emri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Workshop
          <select name="workshop_id" value={form.workshop_id} onChange={handleChange} required>
            <option value="">Zgjidh një workshop</option>
            {workshops.map((w) => (
              <option key={w.workshop_id} value={w.workshop_id}>
                {w.titulli}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data e Regjistrimit
          <input name="data_regjistrimit" type="date" value={form.data_regjistrimit} onChange={handleChange} required />
        </label>

        <label>
          Statusi i Pagesës
          <input name="statusi_pageses" value={form.statusi_pageses} onChange={handleChange} placeholder="p.sh. E paguar, Obligim" required />
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Regjistro'}
          </button>
          {isEditing && (
            <button type="button" className="button button-secondary" onClick={onCancel}>
              Anulo
            </button>
          )}
        </div>
      </form>
    </section>
  )
}