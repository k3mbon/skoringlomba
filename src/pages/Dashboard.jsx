import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown'
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';
import JuriSelector from '../components/JuriSelector';
import PesertaSelector from '../components/PesertaSelector';
import ScoreAssignment from '../components/ScoreAssignment';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedJuri, setSelectedJuri] = useState('');
  const [selectedPeserta, setSelectedPeserta] = useState('');
  const handleJuriSelection = (juriId) => {
    setSelectedJuri(juriId);
  };

  const handlePesertaSelection = (pesertaId) => {
    setSelectedPeserta(pesertaId);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from Sanity.io or wherever it's stored after login
        // Replace 'your_user_type' with the actual type from your Sanity.io schema
        const userData = await sanityClient
          .fetch(`*[_type == 'juri'][0]`);

        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUserData();
  }, []); // Run this effect only once after the component mounts

  const handleLogout = () => {
    // Perform any logout logic (clearing tokens, etc.) if needed
    // For simplicity, we'll just navigate to the login page
    navigate('/login');
  };

  


  return (
    <div>
      <h2>Welcome {user ? user.nama : 'Guest'}!</h2>
      <JuriSelector onSelectJuri={handleJuriSelection} />
        <PesertaSelector onSelectPeserta={handlePesertaSelection} />
        {selectedJuri && selectedPeserta && (
          <ScoreAssignment juriId={selectedJuri} pesertaId={selectedPeserta} />
        )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
