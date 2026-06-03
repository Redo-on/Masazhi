import React, { useState, useEffect } from 'react';
import { authorizedFetch } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const emptyClass = {
  emri: '',
  pershkrimi: '',
  lloji: '',
  niveli: '',
  kohezgjatja_min: '',
  kapaciteti_max: '',
  instruktor_id: ''
};

export default function KlasatForm({ onSaved }) {
  // State hooks
  const [form, setForm] = useState(emptyClass);
  const [instructors, setInstructors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const response = await authorizedFetch('/api/Instruktoret');
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        if (!response.ok) throw new Error('Could not load instructors');
        setInstructors(await response.json());
      } catch (error) {
        console.error(error);
        setInstructors([]);
      }
    };

    loadInstructors();
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

    // Basic validation
    if (!form.emri.trim()) {
      setValidationError('Emri i klasës është i detyrueshëm.');
      setIsSaving(false);
      return;
    }

    if (form.kohezgjatja_min === '' || Number(form.kohezgjatja_min) <= 0) {
      setValidationError('Ju lutemi vendosni një kohezgjatje të vlefshme (minuta).');
      setIsSaving(false);
      return;
    }

    if (form.kapaciteti_max === '' || Number(form.kapaciteti_max) <= 0) {
      setValidationError('Ju lutemi vendosni një kapacitet maksimum të vlefshëm.');
      setIsSaving(false);
      return;
    }

    if (!form.instruktor_id) {
      setValidationError('Ju lutemizgjidhni një instruktor.');
      setIsSaving(false);
      return;
    }

    const payload = {
      emri: form.emri.trim(),
      pershkrimi: form.pershkrimi.trim(),
      lloji: form.lloji.trim(),
      niveli: form.niveli.trim(),
      kohezgjatja_min: Number(form.kohezgjatja_min),
      kapaciteti_max: Number(form.kapaciteti_max),
      instruktor_id: Number(form.instruktor_id)
    };

    try {
      const response = await authorizedFetch('/api/Klasat', {
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
        alert("Klasa u shtua me sukses!");
        setForm(emptyClass); // Clear the form
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
      <h2>Shto Klasë të Re</h2>
      <form onSubmit={handleSubmit} className="form-grid">
         
        <label>
          Emri
          <input name="emri" type="text" value={form.emri} onChange={handleChange} required />
        </label>

        <label>
          Pershkrimi
          <textarea name="pershkrimi" value={form.pershkrimi} onChange={handleChange} rows="3" />
        </label>

        <label>
          Lloji
          <input name="lloji" type="text" value={form.lloji} onChange={handleChange} />
        </label>

        <label>
          Niveli
          <select name="niveli" value={form.niveli} onChange={handleChange}>
            <option value="">Zgjidh nivelin</option>
            <option value="Fillestar">Fillestar</option>
            <option value="I Mesëm">I Mesëm</option>
            <option value="I Avanzuar">I Avanzuar</option>
          </select>
        </label>

        <label>
          Kohezgjatja (minuta)
          <input name="kohezgjatja_min" type="number" value={form.kohezgjatja_min} onChange={handleChange} min="1" required />
        </label>

        <label>
          Kapaciteti Maksimal
          <input name="kapaciteti_max" type="number" value={form.kapaciteti_max} onChange={handleChange} min="1" required />
        </label>

        <label>
          Instruktor
          <select
            name="instruktor_id"
            value={form.instruktor_id}
            onChange={handleChange}
            required
            disabled={instructors.length === 0}
          >
            <option value="">Zgjidh instruktor</option>
            {instructors.map((instructor) => (
              <option key={instructor.instruktor_id} value={instructor.instruktor_id}>
                {instructor.emri} {instructor.mbiemri} - {instructor.specializimi}
              </option>
            ))}
          </select>
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Shto Klasë'}
          </button>
        </div>
        
      </form>
    </section>
  );
}