import { useEffect, useState } from 'react'
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyRegjistrim = {
  anetar_id: '',
  orar_id: '',
  data: '',
  statusi: '',
  shenimet: '',
}

export default function RegjistrimetForm({ onSaved }) {
  const [form, setForm] = useState(emptyRegjistrim)
  const [members, setMembers] = useState([])
  const [oraret, setOraret] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setForm(emptyRegjistrim)

    const loadMembers = async () => {
      try {
        const response = await authorizedFetch('/api/Anetaret')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (!response.ok) throw new Error('Could not load members')
        setMembers(await response.json())
      } catch (error) {
        console.error(error)
        setMembers([])
      }
    }

    const loadOraret = async () => {
      try {
        const response = await authorizedFetch('/api/Orari')
        if (response.status === 401) {
          navigate('/login', { replace: true })
          return
        }
        if (!response.ok) throw new Error('Could not load oraret')
        setOraret(await response.json())
      } catch (error) {
        console.error(error)
        setOraret([])
      }
    }

    loadMembers()
    loadOraret()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValidationError('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidationError('')

    const anetarId = Number(form.anetar_id)
    const orarId = Number(form.orar_id)
    if (!anetarId || !orarId) {
      setValidationError('Zgjidhni një anëtar dhe një orar të vlefshëm.')
      setIsSaving(false)
      return
    }

    const payload = {
      anetar_id: anetarId,
      orar_id: orarId,
      data: form.data || new Date().toISOString(),
      statusi: form.statusi,
      shenimet: form.shenimet,
    }

    setIsSaving(true)
    try {
      const response = await authorizedFetch('/api/Anetaret/regjistrimet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.status === 401) {
        navigate('/login', { replace: true })
        return
      }

      if (!response.ok) {
        throw new Error('Failed to save registration')
      }

      setForm(emptyRegjistrim)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert('Regjistrimi dështoi. Kontrolloni të dhënat dhe provoni përsëri.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>Regjistro Regjistrim të Ri</h2>
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
          Orar
          <select
            name="orar_id"
            value={form.orar_id}
            onChange={handleChange}
            required
            disabled={oraret.length === 0}
          >
            <option value="">Zgjidh orar</option>
            {oraret.map((item) => (
              <option key={item.orar_id} value={item.orar_id}>
                {item.dita_javes} {item.ora_fillimit}-{item.ora_perfundimit} (Klasa {item.klasa_id})
              </option>
            ))}
          </select>
        </label>

        <label>
          Data
          <input name="data" type="date" value={form.data} onChange={handleChange} required />
        </label>

        <label>
          Statusi
          <input name="statusi" value={form.statusi} onChange={handleChange} required />
        </label>

        <label>
          Shënimet
          <textarea name="shenimet" value={form.shenimet} onChange={handleChange} rows="4" />
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Regjistro'}
          </button>
        </div>
      </form>
    </section>
  )
}