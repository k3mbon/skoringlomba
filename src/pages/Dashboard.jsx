import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown'
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
      <h2>Welcome {user ? user.displayname : 'Guest'}!</h2>
      <Dropdown/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
