// DropdownComponent.js
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import RubrikBabak1 from './RubrikBabak1';
import ScoreSubmission from './ScoreSubmission';

const DropdownComponent = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

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

  return (
    <div>
      <h2>Data Dropdown</h2>
      <label>
        Select an Item:
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
          <RubrikBabak1/>
          <ScoreSubmission/>
          {/*<button onClick={handleModifyData}>Input Score</button>*/}
          
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
