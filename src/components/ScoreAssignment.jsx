import React, { useState } from 'react'
import sanityClient from '../sanityClient';

const ScoreAssignment = ({ juriId, pesertaId }) => {
    const [scoreValue1, setScoreValue1] = useState('');
    const [scoreValue2, setScoreValue2] = useState('');
    const [scoreValue3, setScoreValue3] = useState('');
    const [scoreValue4, setScoreValue4] = useState('');
    const [scoreValue5, setScoreValue5] = useState('');

    const handleAssignScore = async () => {
        try {
          // Save the score to Sanity
          await sanityClient.create({
            _type: 'score',
            juri: {
              _type: 'reference',
              _ref: juriId,
            },
            peserta: {
              _type: 'reference',
              _ref: pesertaId,
            },
            scoreValue1, scoreValue2, scoreValue3, scoreValue4, scoreValue5
          });
    
          // Reset score value after successful submission
          setScoreValue('');
        } catch (error) {
          console.error('Error assigning score in Sanity:', error.message);
        }
      };
  return (
    <div>
        <label>
        Skor Indikator 1:
        <input type="number" value={scoreValue1} onChange={(e) => setScoreValue1(e.target.value)} />
      </label>
      <label>
        Skor Indikator 2:
        <input type="number" value={scoreValue2} onChange={(e) => setScoreValue2(e.target.value)} />
      </label>
      <label>
        Skor Indikator 3:
        <input type="number" value={scoreValue3} onChange={(e) => setScoreValue3(e.target.value)} />
      </label>
      <label>
        Skor Indikator 4:
        <input type="number" value={scoreValue4} onChange={(e) => setScoreValue4(e.target.value)} />
      </label>
      <label>
        Skor Indikator 5:
        <input type="number" value={scoreValue5} onChange={(e) => setScoreValue5(e.target.value)} />
      </label>
      <button onClick={handleAssignScore}>Assign Score</button>
    </div>
  )
}

export default ScoreAssignment