import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptySalla = {
  salla_id: null,
  emri: '',
  kapaciteti: '',
  pajisjet: '',
  pershkrimi: '',
}

const createToken = () =>
  window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`

export default function SallatForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptySalla)
  const [isSaving, setIsSaving] = useState(false)
  const [requestToken, setRequestToken] = useState(() => createToken())
  const isEditing = selected?.salla_id != null
  const navigate = useNavigate()

  useEffect(() => {
    if (selected) {
      setForm({
        salla_id: selected.salla_id,
        emri: selected.emri ?? '',
        kapaciteti: selected.kapaciteti?.toString() ?? '',
        pajisjet: selected.pajisjet ?? '',
        pershkrimi: selected.pershkrimi ?? '',
      })
    } else {
      setForm(emptySalla)
    }
  }, [selected])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      emri: form.emri,
      kapaciteti: Number(form.kapaciteti) || 0,
      pajisjet: form.pajisjet,
      pershkrimi: form.pershkrimi,
    }

    if (isEditing) payload.salla_id = form.salla_id
    else payload.idempotency_token = requestToken

    setIsSaving(true)
    try {
      const url = isEditing ? `/api/Salla/${form.salla_id}` : '/api/Salla'
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

      if (!response.ok) {
        const errorText = await response.text()
        let parsed = null
        try {
          parsed = errorText ? JSON.parse(errorText) : null
        } catch {
          parsed = null
        }
        throw new Error(parsed?.message ?? 'Failed to save salla')
      }

      setForm(emptySalla)
      setRequestToken(createToken())
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert(error?.message ?? 'Salla nuk mund të ruhej. Kontrolloni të dhënat.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Sallë' : 'Shto Sallë të Re'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Emri
          <input name="emri" value={form.emri} onChange={handleChange} required />
        </label>

        <label>
          Kapaciteti
          <input name="kapaciteti" type="number" min="0" value={form.kapaciteti} onChange={handleChange} required />
        </label>

        <label>
          Pajisjet
          <textarea name="pajisjet" value={form.pajisjet} onChange={handleChange} rows="3" />
        </label>

        <label>
          Përshkrimi
          <textarea name="pershkrimi" value={form.pershkrimi} onChange={handleChange} rows="3" />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Krijo Sallë'}
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