// components/JuriSelector.js
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';

const JuriSelector = ({ onSelectJuri }) => {
  const [juries, setJuries] = useState([]);

  useEffect(() => {
    const fetchJuries = async () => {
      try {
        // Fetch the list of juri members from Sanity
        const result = await sanityClient.fetch('*[_type == "juri"]');
        setJuries(result);
      } catch (error) {
        console.error('Error fetching juries from Sanity:', error.message);
      }
    };

    fetchJuries();
  }, []);

  return (
    <div>
      <label>
        Select Juri:
        <select onChange={(e) => onSelectJuri(e.target.value)}>
          <option value="">Select a juri</option>
          {juries.map((juri) => (
            <option key={juri._id} value={juri._id}>
              {juri.nama}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default JuriSelector;
