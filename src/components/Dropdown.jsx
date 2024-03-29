// DropdownComponent.js
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import { useAuth } from '../AuthContext'
import ScoreAssignment from './ScoreAssignment';

const DropdownComponent = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [rubrik, setRubrik] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sanityClient.fetch('*[_type == "peserta"]');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Example query to fetch a list of documents
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
      <h2>Pilih Daftar Peserta</h2>
      <label>
        Pilih Peserta:
        <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
          <option value="">-- Select --</option>
          {data.map(item => (
            <option key={item._id} value={item._id}>
              {item.nomorpeserta} 
            </option>
          ))}
        </select>
      </label>

      {selectedItem && (
        <div>
          <h3>Selected Item Details:</h3>
          {/* Display details of the selected item here */}
          <p>Name: {data.find(item => item._id === selectedItem)?.namapeserta}</p>
          <p>Nomor Peserta: {data.find(item => item._id === selectedItem)?.nomorpeserta}</p>
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

export default DropdownComponent;
