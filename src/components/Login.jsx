// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { sanityClient } from '../sanity';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      // Replace 'your_user_type' with the actual type from your Sanity.io schema
      const user = await sanityClient
        .fetch(`*[_type == 'admin' && username == $username && password == $password][0]`, {
          username,
          password,
        });

      if (user) {
        // Successful login, redirect to home or another page
        history.push('/home');
      } else {
        // Incorrect username or password
        console.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
