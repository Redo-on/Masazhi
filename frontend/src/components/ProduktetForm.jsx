import { useEffect, useState } from 'react'

const emptyProduct = {
  produkti_id: null,
  emri: '',
  pershkrimi: '',
  kategoria: '',
  cmimi: '',
  sasia_stok: '',
}

export default function ProduktetForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptyProduct)
  const [isSaving, setIsSaving] = useState(false)
  const isEditing = selected?.produkti_id != null

  useEffect(() => {
    if (selected) {
      setForm({
        produkti_id: selected.produkti_id,
        emri: selected.emri ?? '',
        pershkrimi: selected.pershkrimi ?? '',
        kategoria: selected.kategoria ?? '',
        cmimi: selected.cmimi?.toString() ?? '',
        sasia_stok: selected.sasia_stok?.toString() ?? '',
      })
    } else {
      setForm(emptyProduct)
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
      pershkrimi: form.pershkrimi,
      kategoria: form.kategoria,
      cmimi: Number(form.cmimi) || 0,
      sasia_stok: Number(form.sasia_stok) || 0,
    }

    if (isEditing) {
      payload.produkti_id = form.produkti_id
    }

    setIsSaving(true)
    try {
      const url = isEditing ? `/api/Produktet/${form.produkti_id}` : '/api/Produktet'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      setForm(emptyProduct)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert('Produktet nuk mund të ruheshin. Kontrolloni të dhënat.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Produkt' : 'Shto Produkt të Ri'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Emri
          <input name="emri" value={form.emri} onChange={handleChange} required />
        </label>

        <label>
          Kategoria
          <input name="kategoria" value={form.kategoria} onChange={handleChange} required />
        </label>

        <label>
          Përshkrimi
          <textarea name="pershkrimi" value={form.pershkrimi} onChange={handleChange} rows="3" />
        </label>

        <label>
          Çmimi
          <input
            name="cmimi"
            value={form.cmimi}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Sasia në Stok
          <input
            name="sasia_stok"
            value={form.sasia_stok}
            onChange={handleChange}
            type="number"
            min="0"
            required
          />
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSaving} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Krijo Produkt'}
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
