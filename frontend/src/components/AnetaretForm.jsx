import React, { useState, useEffect } from 'react';
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyMember = {
  emri: '',
  mbiemri: '',
  data_lindjes: '',
  gjinia: 'M',
  telefoni: '',
  email: '',
  adresa: '',
  data_regjistrimit: new Date().toISOString().split('T')[0],
  lloji_anetaresimit: '',
  statusi: 'i Aktiv'
};

export default function AnetaretForm({ onSaved }) {
  // State hooks
  const [form, setForm] = useState(emptyMember);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

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

    const payload = {
      emri: form.emri.trim(),
      mbiemri: form.mbiemri.trim(),
      data_lindjes: form.data_lindjes,
      gjinia: form.gjinia,
      telefoni: form.telefoni.trim(),
      email: form.email.trim().toLowerCase(),
      adresa: form.adresa.trim(),
      data_regjistrimit: form.data_regjistrimit,
      lloji_anetaresimit: form.lloji_anetaresimit.trim(),
      statusi: form.statusi.trim()
    };

    try {
      const response = await authorizedFetch('/api/Anetaret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/login', { replace: true })
        return
      }

      if (response.ok) {
        alert("Anëtar'i u shtua me sukses!");
        setForm(emptyMember); // Clear the form
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
      <h2>Shto Anëtar të Ri</h2>
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
          Data e Lindjes
          <input name="data_lindjes" type="date" value={form.data_lindjes} onChange={handleChange} required />
        </label>

        <label>
          Gjinia
          <select name="gjinia" value={form.gjinia} onChange={handleChange} required>
            <option value="M">Mashkull</option>
            <option value="F">Femër</option>
            <option value="Other">Tjetër</option>
          </select>
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
          Adresa
          <textarea name="adresa" value={form.adresa} onChange={handleChange} rows="3" />
        </label>

        <label>
          Data e Regjistrimit
          <input name="data_regjistrimit" type="date" value={form.data_regjistrimit} onChange={handleChange} required />
        </label>

        <label>
          Lloji i Anetaresimit
          <input name="lloji_anetaresimit" type="text" value={form.lloji_anetaresimit} onChange={handleChange} />
        </label>

        <label>
          Statusi
          <select name="statusi" value={form.statusi} onChange={handleChange} required>
            <option value="i Aktiv">i Aktiv</option>
            <option value="i Pavdekur">i Pavdekur</option>
            <option value="i Ndalerur">i Ndalerur</option>
          </select>
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Shto Anëtar'}
          </button>
        </div>
        
      </form>
    </section>
  );
}