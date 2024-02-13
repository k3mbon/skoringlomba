// components/AudienceSelector.js
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import ScoreAssignment from './ScoreAssignment';

const PesertaSelector = ({ onSelectPeserta }) => {
  const [peserta, setPeserta] = useState([]);
  const [selectedPeserta, setSelectedPeserta] = useState('');
  const [rubrik, setRubrik] = useState([]);

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        // Fetch the list of Peserta from Sanity
        const result = await sanityClient.fetch('*[_type == "peserta"]');
        setPeserta(result);
      } catch (error) {
        console.error('Error fetching Peserta from Sanity:', error.message);
      }
    };

    fetchPeserta();
  }, []);

  const query = '*[_type == "rubrik"]';

// Fetch the data
const fetchRubrik = async () => {
  try {
    const data = await sanityClient.fetch(query);
    console.log(data); // Display the fetched data in the console
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
};

useEffect(() => {
  const fetchDataAsync = async () => {
    const result = await fetchRubrik();
    if (result) {
      setRubrik(result);
    }
  };

  fetchDataAsync();
}, []);

  return (
    <div>
      <label>
        Select Peserta:
        <select value={selectedPeserta} onChange={(e) => setSelectedPeserta(e.target.value)}>
          <option value="">Peserta</option>
          {peserta.map((peserta) => (
            <option key={peserta._id} value={peserta._id}>
              {peserta.nomorpeserta}
            </option>
          ))}
        </select>
      </label>

      {selectedPeserta && (
        <div>
          <h3>Selected Item Details:</h3>
          {/* Display details of the selected item here */}
          <p>Name: {peserta.find(item => item._id === selectedPeserta)?.namapeserta}</p>
          <p>Nomor Peserta: {peserta.find(item => item._id === selectedPeserta)?.nomorpeserta}</p>
          {/*<button onClick={handleModifyData}>Input Score</button>*/}
          <h3>Isi Rubrik</h3>
            
              {rubrik.map((item) => (
                <li key={item._id}>
                  <h2>{item.nama}</h2>
                  <p><strong>Indikator 1:</strong> {item.indikator1}<br /></p>
                  <p><strong>Indikator 2:</strong> {item.indikator2}</p>
                  <p><strong>Indikator 3:</strong> {item.indikator3}</p>
                  <ScoreAssignment/>
                </li>
              ))}
            
        </div>
      )}
    </div>
  );
};

export default PesertaSelector;
