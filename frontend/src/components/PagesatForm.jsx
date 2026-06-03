import React, { useState, useEffect } from 'react';
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyPagesa = {
  anetar_id: '',
  anetaresim_id: '',
  shuma: '',
  metoda: 'Cash',
  data_pageses: new Date().toISOString().split('T')[0], 
  statusi: 'E Paguar'
};

export default function PagesatForm({ onSaved }) {
  // 2. State hooks
  const [form, setForm] = useState(emptyPagesa);
  const [members, setMembers] = useState([]);
  const [anetaresimet, setAnetaresimet] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await authorizedFetch('/api/Anetaret');
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        if (!response.ok) throw new Error('Could not load members');
        setMembers(await response.json());
      } catch (error) {
        console.error(error);
        setMembers([]);
      }
    };

    const loadSubscriptions = async () => {
      try {
        const response = await authorizedFetch('/api/Anetaresimet');
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        if (!response.ok) throw new Error('Could not load subscriptions');
        setAnetaresimet(await response.json());
      } catch (error) {
        console.error(error);
        setAnetaresimet([]);
      }
    };

    loadMembers();
    loadSubscriptions();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValidationError('');
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError('');
    setIsSaving(true);

    const anetarId = Number(form.anetar_id);
    const anetaresimId = Number(form.anetaresim_id);

    if (!anetarId || !anetaresimId) {
      setValidationError('Zgjidhni një anëtar dhe një anëtarësim të vlefshëm.');
      setIsSaving(false);
      return;
    }

    const payload = {
      anetar_id: anetarId,
      anetaresim_id: anetaresimId,
      shuma: Number(form.shuma) || 0,
      metoda: form.metoda,
      data_pageses: form.data_pageses || new Date().toISOString(),
      statusi: form.statusi,
    };

    try {
      const response = await authorizedFetch('/api/Anetaret/pagesat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        navigate('/login', { replace: true });
        return;
      }

      if (response.ok) {
        alert("Pagesa u regjistrua me sukses!");
        setForm(emptyPagesa); // Clear the form
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
          <select name="metoda" value={form.metoda} onChange={handleChange} required>
            <option value="Cash">Cash</option>
            <option value="Karta">Karta</option>
            <option value="Banka">Banka</option>
          </select>
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
  );
}