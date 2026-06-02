import React, { useState } from 'react';

const PagesatForm = () => {
    const [anetarId, setAnetarId] = useState('');
    const [anetaresimId, setAnetaresimId] = useState('');
    const [shuma, setShuma] = useState('');
    const [metoda, setMetoda] = useState('Cash'); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const paymentData = {
            anetar_id: parseInt(anetarId),
            anetaresim_id: parseInt(anetaresimId),
            shuma: parseFloat(shuma),
            metoda: metoda,
            statusi: "E Paguar", 
            data_pageses: new Date().toISOString() 
        };

        try {
            const response = await fetch('http://localhost:5244/api/Anetaret/pagesat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert("Pagesa u regjistrua me sukses!");
                setAnetarId('');
                setAnetaresimId('');
                setShuma('');
                setMetoda('Cash');
            } else {
                alert("Ndodhi një gabim! Kontrollo të dhënat.");
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
            alert("Nuk mund të lidhet me serverin.");
        }
    };

    return (
        <div className="form-container">
            <h2>Regjistro Pagesë të Re</h2>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label>ID e Anëtarit:</label>
                    <input 
                        type="number" 
                        value={anetarId} 
                        onChange={(e) => setAnetarId(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>ID e Anëtarësimit:</label>
                    <input 
                        type="number" 
                        value={anetaresimId} 
                        onChange={(e) => setAnetaresimId(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Shuma (€):</label>
                    <input 
                        type="number" 
                        step="0.01"
                        value={shuma} 
                        onChange={(e) => setShuma(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Metoda e Pagesës:</label>
                    <select value={metoda} onChange={(e) => setMetoda(e.target.value)}>
                        <option value="Cash">Cash</option>
                        <option value="Karta">Karta</option>
                        <option value="Banka">Banka</option>
                    </select>
                </div>

                <button type="submit">Ruaj Pagesën</button>
            </form>
        </div>
    );
};

export default PagesatForm;