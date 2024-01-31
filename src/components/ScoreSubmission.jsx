import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';

const ScoreSubmission = ({ pesertaId, rubrik }) => {
  const [juriName, setJuriName] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const initializeScores = () => {
        if (rubrik && Array.isArray(rubrik)) {
            const initialScores = rubrik.map(item => ({ rubrikId: item._id, skor: '' }));
            setScores(initialScores);
          } else {
            console.error('Rubrik is not defined or not an array.');
          }
    };

    initializeScores();
  }, [rubrik]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Assuming you have a document type for lecturers
      const juri = await sanityClient.create({
        _type: 'juri',
        name: juriName,
        // Add other fields as needed
      });

      const skorDocuments = scores.map((skor) => ({
        _type: 'skor',
        peserta: { _type: 'reference', _ref: pesertaId },
        juri: { _type: 'reference', _ref: juri._id },
        rubrik: { _type: 'reference', _ref: skor.rubrikId },
        skor: parseInt(skor.skor, 10),
        // Add other fields as needed
      }));

      await sanityClient.create(skorDocuments);

      // Reset form after submission
      setJuriName('');
      initializeScores();
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div>
      <h2>Submit Score</h2>
      <form onSubmit={handleSubmit}>
        <label>
            Juri Name:
          <input
            type="text"
            value={juriName}
            onChange={e => setJuriName(e.target.value)}
          />
        </label>

        <h3>Scores</h3>
        {scores.map((skor, index) => (
          <div key={index}>
            <label>
              {rubrik[index].question}
              <input
                type="number"
                value={skor.skor}
                onChange={e => {
                  const updatedScores = [...scores];
                  updatedScores[index].skor = e.target.value;
                  setScores(updatedScores);
                }}
              />
            </label>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScoreSubmission;
