// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // admin = backend schema field
      const user = await sanityClient
        .fetch(`*[_type == 'juri' && email == $email && password == $password][0]`, {
          email,
          password,
        });

      if (user) {
        // Langsung masuk klo login credential = field username-pw 'juri'
        navigate('/dashboard');
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
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {/*<p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>*/}
    </div>
  );
};

export default Login;
