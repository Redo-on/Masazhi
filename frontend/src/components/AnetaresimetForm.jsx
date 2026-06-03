import React, { useState, useEffect } from 'react';

const emptySubscription = {
  anetar_id: '',
  lloji: '',
  cmimi: '',
  data_fillimit: new Date().toISOString().split('T')[0],
  data_mbarimit: new Date().toISOString().split('T')[0],
  statusi: 'i Aktiv'
};

export default function AnetaresimetForm({ onSaved }) {
  // State hooks
  const [form, setForm] = useState(emptySubscription);
  const [members, setMembers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch('/api/Anetaret');
        if (!response.ok) throw new Error('Could not load members');
        setMembers(await response.json());
      } catch (error) {
        console.error(error);
        setMembers([]);
      }
    };

    loadMembers();
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
    if (!form.anetar_id) {
      setValidationError('Ju lutem zgjidhni një anëtar.');
      setIsSaving(false);
      return;
    }

    if (!form.lloji.trim()) {
      setValidationError('Lloji i abonimit është i detyrueshëm.');
      setIsSaving(false);
      return;
    }

    if (form.cmimi === '' || Number(form.cmimi) <= 0) {
      setValidationError('Ju lutemi vendosni një çmim të vlefshëm.');
      setIsSaving(false);
      return;
    }

    const payload = {
      anetar_id: Number(form.anetar_id),
      lloji: form.lloji.trim(),
      cmimi: Number(form.cmimi),
      data_fillimit: form.data_fillimit,
      data_mbarimit: form.data_mbarimit,
      statusi: form.statusi.trim()
    };

    try {
      const response = await fetch('/api/Anetaresimet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Abonimi u shtua me sukses!");
        setForm(emptySubscription); // Clear the form
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
      <h2>Shto Abonim të Ri</h2>
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
                {member.emri} {member.mbiemri}
              </option>
            ))}
          </select>
        </label>

        <label>
          Lloji
          <input name="lloji" type="text" value={form.lloji} onChange={handleChange} required />
        </label>

        <label>
          Çmimi (€)
          <input name="cmimi" type="number" value={form.cmimi} onChange={handleChange} min="0" step="0.01" required />
        </label>

        <label>
          Data e Fillimit
          <input name="data_fillimit" type="date" value={form.data_fillimit} onChange={handleChange} required />
        </label>

        <label>
          Data e Mbarimit
          <input name="data_mbarimit" type="date" value={form.data_mbarimit} onChange={handleChange} required />
        </label>

        <label>
          Statusi
          <select name="statusi" value={form.statusi} onChange={handleChange} required>
            <option value="i Aktiv">i Aktiv</option>
            <option value="i Mbaruar">i Mbaruar</option>
            <option value="i Anuluar">i Anuluar</option>
            <option value="i Ndalerur">i Ndalerur</option>
          </select>
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="submit" disabled={isSaving || Boolean(validationError)} className="button button-primary">
            {isSaving ? 'Duke Ruajtur...' : 'Shto Abonim'}
          </button>
        </div>
        
      </form>
    </section>
  );
}