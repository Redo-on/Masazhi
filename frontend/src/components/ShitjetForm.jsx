import { useEffect, useMemo, useState } from 'react'

const emptySale = {
  shitje_id: null,
  anetar_id: '',
  produkti_id: '',
  sasia: '',
  cmimi_total: '',
  data: '',
}

export default function ShitjetForm({ selected, onSaved, onCancel }) {
  const [form, setForm] = useState(emptySale)
  const [products, setProducts] = useState([])
  const [members, setMembers] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')
  const isEditing = selected?.shitje_id != null

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/Produktet')
        if (!response.ok) throw new Error('Could not load products')
        setProducts(await response.json())
      } catch (error) {
        console.error(error)
        setProducts([])
      }
    }

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

    loadProducts()
    loadMembers()
  }, [])

  useEffect(() => {
    if (selected) {
      setForm({
        shitje_id: selected.shitje_id,
        anetar_id: selected.anetar_id?.toString() ?? '',
        produkti_id: selected.produkti_id?.toString() ?? '',
        sasia: selected.sasia?.toString() ?? '',
        cmimi_total: selected.cmimi_total?.toString() ?? '',
        data: selected.data ? selected.data.split('T')[0] : '',
      })
    } else {
      setForm(emptySale)
    }
  }, [selected])

  const selectedProduct = useMemo(
    () => products.find((item) => item.produkti_id.toString() === form.produkti_id.toString()),
    [form.produkti_id, products],
  )

  useEffect(() => {
    if (selectedProduct && form.sasia) {
      const total = Number(selectedProduct.cmimi) * Number(form.sasia)
      if (!Number.isNaN(total)) {
        setForm((current) => ({ ...current, cmimi_total: total.toFixed(2) }))
      }
    } else if (!form.sasia) {
      setForm((current) => ({ ...current, cmimi_total: '' }))
    }
  }, [selectedProduct, form.sasia])

  useEffect(() => {
    if (!form.produkti_id || !form.sasia) {
      setValidationError('')
      return
    }

    const quantity = Number(form.sasia)
    const stock = Number(selectedProduct?.sasia_stok ?? 0)

    if (Number.isNaN(quantity) || quantity <= 0) {
      setValidationError('Sasia duhet të jetë një numër pozitiv.')
      return
    }

    if (selectedProduct && quantity > stock) {
      setValidationError(`Sasia tejkalon stokun aktual (${stock}).`)
      return
    }

    setValidationError('')
  }, [form.produkti_id, form.sasia, selectedProduct])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validationError) {
      alert(validationError)
      return
    }

    const payload = {
      anetar_id: Number(form.anetar_id) || 0,
      produkti_id: Number(form.produkti_id) || 0,
      sasia: Number(form.sasia) || 0,
      cmimi_total: Number(form.cmimi_total) || 0,
      data: form.data || new Date().toISOString(),
    }

    if (isEditing) {
      payload.shitje_id = form.shitje_id
    }

    const url = isEditing ? `/api/ShitjetProdukteve/${form.shitje_id}` : '/api/ShitjetProdukteve'
    const method = isEditing ? 'PUT' : 'POST'

    setIsSaving(true)
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let parsed = null
        try {
          parsed = errorText ? JSON.parse(errorText) : null
        } catch {
          parsed = null
        }
        throw new Error(parsed?.message ?? 'Failed to save sale')
      }

      setForm(emptySale)
      onSaved?.()
    } catch (error) {
      console.error(error)
      alert(error?.message ?? 'Regjistrimi i shitjes dështoi.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="card form-card">
      <h2>{isEditing ? 'Edito Shitjen e Produktit' : 'Regjistro Shitje të Re'}</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Anëtar
          <select name="anetar_id" value={form.anetar_id} onChange={handleChange} required>
            <option value="">Zgjidh anëtar</option>
            {members.map((member) => (
              <option key={member.anetar_id} value={member.anetar_id}>
                {member.emri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Produkti
          <select name="produkti_id" value={form.produkti_id} onChange={handleChange} required>
            <option value="">Zgjidh produkt</option>
            {products.map((produkt) => (
              <option key={produkt.produkti_id} value={produkt.produkti_id}>
                {produkt.emri} — {produkt.kategoria}
              </option>
            ))}
          </select>
        </label>

        {selectedProduct && (
          <div className="product-info">
            <p>Çmimi njësi: {Number(selectedProduct.cmimi).toFixed(2)}</p>
            <p>Stoku aktual: {selectedProduct.sasia_stok}</p>
          </div>
        )}

        <label>
          Sasia
          <input
            name="sasia"
            type="number"
            value={form.sasia}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Çmimi Total
          <input name="cmimi_total" value={form.cmimi_total} readOnly />
        </label>

        <label>
          Data
          <input name="data" type="date" value={form.data} onChange={handleChange} required />
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : isEditing ? 'Ruaj Ndryshimet' : 'Regjistro Shitjen'}
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
