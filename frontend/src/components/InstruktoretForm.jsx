import React, { useState, useEffect } from 'react';

const emptyInstructor = {
  emri: '',
  mbiemri: '',
  specializimi: '',
  certifikimet: '',
  telefoni: '',
  email: '',
  biografia: '',
  data_fillimit: new Date().toISOString().split('T')[0],
  tarifa_orare: ''
};

export default function InstruktoretForm({ onSaved }) {
  // State hooks
  const [form, setForm] = useState(emptyInstructor);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValidationError('');
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError('');
    setIsSaving(true);

    // Basic validation
    if (!form.emri.trim() || !form.mbiemri.trim()) {
      setValidationError('Emri dhe mbiemri janë të detyrueshme.');
      setIsSaving(false);
      return;
    }

    if (!form.email.includes('@')) {
      setValidationError('Ju lutemi vendosni një email të vlefshëm.');
      setIsSaving(false);
      return;
    }

    if (form.tarifa_orare === '' || Number(form.tarifa_orare) <= 0) {
      setValidationError('Ju lutemi vendosni një tarifikë orore të vlefshme.');
      setIsSaving(false);
      return;
    }

    const payload = {
      emri: form.emri.trim(),
      mbiemri: form.mbiemri.trim(),
      specializimi: form.specializimi.trim(),
      certifikimet: form.certifikimet.trim(),
      telefoni: form.telefoni.trim(),
      email: form.email.trim().toLowerCase(),
      biografia: form.biografia.trim(),
      data_fillimit: form.data_fillimit,
      tarifa_orare: Number(form.tarifa_orare)
    };

    try {
      const response = await fetch('/api/Instruktoret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Instruktori u shtua me sukses!");
        setForm(emptyInstructor); // Clear the form
        if (onSaved) onSaved(); // Notify parent component if needed
      } else {
        setValidationError("Ndodhi një gabim! Kontrollo të dhënat.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setValidationError("Nuk mund të lidhet me serverin.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="card form-card">
      <h2>Shto Instruktor të Ri</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        
        <label>
          Emri
          <input name="emri" type="text" value={form.emri} onChange={handleChange} required />
        </label>

        <label>
          Mbiemri
          <input name="mbiemri" type="text" value={form.mbiemri} onChange={handleChange} required />
        </label>

        <label>
          Specializimi
          <input name="specializimi" type="text" value={form.specializimi} onChange={handleChange} />
        </label>

        <label>
          Sertifikimet
          <input name="certifikimet" type="text" value={form.certifikimet} onChange={handleChange} />
        </label>

        <label>
          Telefoni
          <input name="telefoni" type="tel" value={form.telefoni} onChange={handleChange} />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Biografia
          <textarea name="biografia" value={form.biografia} onChange={handleChange} rows="3" />
        </label>

        <label>
          Data e Fillimit
          <input name="data_fillimit" type="date" value={form.data_fillimit} onChange={handleChange} required />
        </label>

        <label>
          Tarifa Orore (€/orë)
          <input name="tarifa_orare" type="number" value={form.tarifa_orare} onChange={handleChange} min="0" step="0.01" required />
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Shto Instruktor'}
          </button>
        </div>
        
      </form>
    </section>
  );
}