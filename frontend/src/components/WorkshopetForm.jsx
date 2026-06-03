import { useEffect, useState } from 'react'

const emptyWorkshop = {
  workshop_id: null,
  titulli: '',
  pershkrimi: '',
  instruktor_id: '',
  data: '',
  ora_fillimit: '',
  ora_perfundimit: '',
  cmimi: '',
  kapaciteti: '',
}

export default function WorkshopetForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyWorkshop)
  const [instructors, setInstructors] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const isEditing = selected?.workshop_id != null

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const response = await fetch('/api/Instruktoret')
        if (response.ok) setInstructors(await response.json())
      } catch (error) {
        console.error('Could not load instructors for dropdown', error)
      }
    }

    loadInstructors()

    if (selected) {
      setForm({
        workshop_id: selected.workshop_id,
        titulli: selected.titulli ?? '',
        pershkrimi: selected.pershkrimi ?? '',
        instruktor_id: selected.instruktor_id?.toString() ?? '',
        data: selected.data ? selected.data.split('T')[0] : '',
        ora_fillimit: selected.ora_fillimit ?? '',
        ora_perfundimit: selected.ora_perfundimit ?? '',
        cmimi: selected.cmimi?.toString() ?? '',
        kapaciteti: selected.kapaciteti?.toString() ?? '',
      })
    } else {
      setForm(emptyWorkshop)
    }
  }, [selected])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      titulli: form.titulli,
      pershkrimi: form.pershkrimi,
      instruktor_id: Number(form.instruktor_id) || 0,
      data: form.data || new Date().toISOString(),
      ora_fillimit: form.ora_fillimit,
      ora_perfundimit: form.ora_perfundimit,
      cmimi: Number(form.cmimi) || 0,
      kapaciteti: Number(form.kapaciteti) || 0,
    }

    if (isEditing) {
      payload.workshop_id = form.workshop_id
    }

    setIsSaving(true)
    try {
      const url = isEditing ? `/api/Workshopet/${form.workshop_id}` : '/api/Workshopet'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save workshop')
      }

      setForm(emptyWorkshop)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert('Ruajtja e workshop-it dështoi. Kontrolloni të dhënat.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Workshop' : 'Shto Workshop të Ri'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Titulli
          <input name="titulli" value={form.titulli} onChange={handleChange} required />
        </label>

        <label>
          Instruktor
          <select
            name="instruktor_id"
            value={form.instruktor_id}
            onChange={handleChange}
            required
            disabled={instructors.length === 0}
          >
            <option value="">Zgjidh instruktor</option>
            {instructors.map((instruktor) => (
              <option key={instruktor.instruktor_id} value={instruktor.instruktor_id}>
                {instruktor.emri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data
          <input name="data" type="date" value={form.data} onChange={handleChange} required />
        </label>

        <label>
          Ora e Fillimit
          <input name="ora_fillimit" type="time" value={form.ora_fillimit} onChange={handleChange} required />
        </label>

        <label>
          Ora e Përfundimit
          <input name="ora_perfundimit" type="time" value={form.ora_perfundimit} onChange={handleChange} required />
        </label>

        <label>
          Çmimi
          <input name="cmimi" type="number" min="0" step="0.01" value={form.cmimi} onChange={handleChange} required />
        </label>

        <label>
          Kapaciteti
          <input name="kapaciteti" type="number" min="1" value={form.kapaciteti} onChange={handleChange} required />
        </label>

        <label className="full-width">
          Përshkrimi
          <textarea name="pershkrimi" value={form.pershkrimi} onChange={handleChange} rows="3" />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Krijo Workshop'}
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