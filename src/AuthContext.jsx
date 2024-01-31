// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // You can perform any necessary login logic here, e.g., setting user data in the context
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, e.g., clearing user data from the context
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ juri, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
