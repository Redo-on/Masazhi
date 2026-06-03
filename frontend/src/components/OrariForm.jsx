import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyOrari = {
  orar_id: null,
  klasa_id: '',
  dita_javes: '',
  ora_fillimit: '',
  ora_perfundimit: '',
  salla_id: '',
  statusi: '',
}

const createToken = () =>
  window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`

export default function OrariForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyOrari)
  const [klasat, setKlasat] = useState([])
  const [sallat, setSallat] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [requestToken, setRequestToken] = useState(() => createToken())
  const isEditing = selected?.orar_id != null
  const navigate = useNavigate()

  useEffect(() => {
    const loadKlasat = async () => {
      try {
        const response = await authorizedFetch('/api/Klasat')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (response.ok) setKlasat(await response.json())
      } catch (error) {
        console.error('Could not load klasat for dropdown', error)
      }
    }

    const loadSallat = async () => {
      try {
        const response = await authorizedFetch('/api/Salla')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (response.ok) setSallat(await response.json())
      } catch (error) {
        console.error('Could not load sallat for dropdown', error)
      }
    }

    loadKlasat()
    loadSallat()

    if (selected) {
      setForm({
        orar_id: selected.orar_id,
        klasa_id: selected.klasa_id ?? '',
        dita_javes: selected.dita_javes ?? '',
        ora_fillimit: selected.ora_fillimit ?? '',
        ora_perfundimit: selected.ora_perfundimit ?? '',
        salla_id: selected.salla_id ?? '',
        statusi: selected.statusi ?? '',
      })
    } else {
      setForm(emptyOrari)
    }
  }, [selected])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      klasa_id: Number(form.klasa_id) || 0,
      dita_javes: form.dita_javes,
      ora_fillimit: form.ora_fillimit,
      ora_perfundimit: form.ora_perfundimit,
      salla_id: Number(form.salla_id) || 0,
      statusi: form.statusi,
    }

    if (isEditing) payload.orar_id = form.orar_id
    else payload.idempotency_token = requestToken

    setIsSaving(true)
    try {
      const url = isEditing ? `/api/Orari/${form.orar_id}` : '/api/Orari'
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
        throw new Error(parsed?.message ?? 'Failed to save orari')
      }

      setForm(emptyOrari)
      setRequestToken(createToken())
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert(error?.message ?? 'Orari nuk mund të ruhesh. Kontrolloni të dhënat.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Orar' : 'Shto Orar të Ri'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Klasa
          <select
            name="klasa_id"
            value={form.klasa_id}
            onChange={handleChange}
            required
            disabled={klasat.length === 0}
          >
            <option value="">Zgjidh klasa</option>
            {klasat.map((klasa) => (
              <option key={klasa.klase_id} value={klasa.klase_id}>
                {klasa.emri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Dita e Javës
          <input name="dita_javes" value={form.dita_javes} onChange={handleChange} required />
        </label>

        <label>
          Ora Fillimit
          <input name="ora_fillimit" type="time" value={form.ora_fillimit} onChange={handleChange} required />
        </label>

        <label>
          Ora Përfundimit
          <input name="ora_perfundimit" type="time" value={form.ora_perfundimit} onChange={handleChange} required />
        </label>

        <label>
          Salla
          <select
            name="salla_id"
            value={form.salla_id}
            onChange={handleChange}
            required
            disabled={sallat.length === 0}
          >
            <option value="">Zgjidh sallë</option>
            {sallat.map((salla) => (
              <option key={salla.salla_id} value={salla.salla_id}>
                {salla.emri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Statusi
          <input name="statusi" value={form.statusi} onChange={handleChange} required />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Krijo Orar'}
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