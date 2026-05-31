import { useEffect, useState } from 'react'

const emptyRegjistrim = {
  anetar_id: '',
  orar_id: '',
  data: '',
  statusi: '',
  shenimet: '',
}

export default function RegjistrimetForm({ onSaved }) {
  const [form, setForm] = useState(emptyRegjistrim)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setForm(emptyRegjistrim)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      anetar_id: Number(form.anetar_id) || 0,
      orar_id: Number(form.orar_id) || 0,
      data: form.data || new Date().toISOString(),
      statusi: form.statusi,
      shenimet: form.shenimet,
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/Anetaret/regjistrimet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

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
          Anëtar ID
          <input name="anetar_id" type="number" value={form.anetar_id} onChange={handleChange} min="1" required />
        </label>

        <label>
          Orar ID
          <input name="orar_id" type="number" value={form.orar_id} onChange={handleChange} min="1" required />
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

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Regjistro'}
          </button>
        </div>
      </form>
    </section>
  )
}
