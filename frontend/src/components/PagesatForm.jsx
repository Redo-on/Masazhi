import { useEffect, useState } from 'react'

const emptyPagesa = {
  anetar_id: '',
  anetaresim_id: '',
  shuma: '',
  metoda: '',
  data_pageses: '',
  statusi: '',
}

export default function PagesatForm({ onSaved }) {
  const [form, setForm] = useState(emptyPagesa)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setForm(emptyPagesa)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      anetar_id: Number(form.anetar_id) || 0,
      anetaresim_id: Number(form.anetaresim_id) || 0,
      shuma: Number(form.shuma) || 0,
      metoda: form.metoda,
      data_pageses: form.data_pageses || new Date().toISOString(),
      statusi: form.statusi,
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/Anetaret/pagesat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save payment')
      }

      setForm(emptyPagesa)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert('Pagesa dështoi. Kontrolloni të dhënat dhe provoni përsëri.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>Regjistro Pagesë të Re</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Anëtar ID
          <input name="anetar_id" type="number" value={form.anetar_id} onChange={handleChange} min="1" required />
        </label>

        <label>
          Anëtarësim ID
          <input
            name="anetaresim_id"
            type="number"
            value={form.anetaresim_id}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Shuma
          <input name="shuma" type="number" value={form.shuma} onChange={handleChange} min="0" step="0.01" required />
        </label>

        <label>
          Metoda
          <input name="metoda" value={form.metoda} onChange={handleChange} required />
        </label>

        <label>
          Data Pagesës
          <input name="data_pageses" type="date" value={form.data_pageses} onChange={handleChange} required />
        </label>

        <label>
          Statusi
          <input name="statusi" value={form.statusi} onChange={handleChange} required />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Regjistro Pagesë'}
          </button>
        </div>
      </form>
    </section>
  )
}
