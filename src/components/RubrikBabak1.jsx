// StudentRubric.jsx
import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

const RubrikBabak1 = ({ pesertaId }) => {
  const [rubrik, setRubric] = useState([]);

  useEffect(() => {
    const fetchRubric = async () => {
      try {
        const result = await sanityClient.fetch(
          '*[_type == "rubrik" && peserta._ref == $pesertaId]{ _id, babak }',
          { pesertaId: `reference(*[_id == $pesertaId])` } // Quote the string value 
        );
        setRubric(result);
      } catch (error) {
        console.error('Error fetching rubric:', error);
      }
    };

    fetchRubric();
  }, [pesertaId]);

  return (
    <div>
      <h2>Rubric</h2>
      <ul>
        {rubrik.map(item => (
          <li key={item._id}>{item.babak}</li>
        ))}
      </ul>
    </div>
  );
};

export default RubrikBabak1;
