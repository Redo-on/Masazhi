import { useEffect, useState } from 'react'

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
  const [isSaving, setIsSaving] = useState(false)
  const isEditing = selected?.rw_id != null

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const response = await fetch('/api/Workshopet')
        if (response.ok) setWorkshops(await response.json())
      } catch (error) {
        console.error('Could not load workshops for dropdown', error)
      }
    }
    loadWorkshops()
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
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      workshop_id: Number(form.workshop_id) || 0,
      anetar_id: Number(form.anetar_id) || 0,
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

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

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
          Anëtar ID
          <input name="anetar_id" type="number" value={form.anetar_id} onChange={handleChange} min="1" required />
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

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
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