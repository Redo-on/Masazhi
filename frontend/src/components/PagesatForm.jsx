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
  const [members, setMembers] = useState([])
  const [anetaresimet, setAnetaresimet] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    setForm(emptyPagesa)

    const loadMembers = async () => {
      try {
        const response = await fetch('/api/Anetaret')
        if (!response.ok) throw new Error('Could not load members')
        setMembers(await response.json())
      } catch (error) {
        console.error(error)
        setMembers([])
      }
    }

    const loadSubscriptions = async () => {
      try {
        const response = await fetch('/api/Anetaresimet')
        if (!response.ok) throw new Error('Could not load subscriptions')
        setAnetaresimet(await response.json())
      } catch (error) {
        console.error(error)
        setAnetaresimet([])
      }
    }

    loadMembers()
    loadSubscriptions()
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
    const anetaresimId = Number(form.anetaresim_id)
    if (!anetarId || !anetaresimId) {
      setValidationError('Zgjidhni një anëtar dhe një anëtarësim të vlefshëm.')
      setIsSaving(false)
      return
    }

    const payload = {
      anetar_id: anetarId,
      anetaresim_id: anetaresimId,
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
          Anëtarësim
          <select
            name="anetaresim_id"
            value={form.anetaresim_id}
            onChange={handleChange}
            required
            disabled={anetaresimet.length === 0}
          >
            <option value="">Zgjidh anëtarësim</option>
            {anetaresimet.map((item) => (
              <option key={item.anetaresimi_id} value={item.anetaresimi_id}>
                {item.anetaresimi_id} - {item.lloji} ({item.statusi})
              </option>
            ))}
          </select>
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

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Regjistro Pagesë'}
          </button>
        </div>
      </form>
    </section>
  )
}
