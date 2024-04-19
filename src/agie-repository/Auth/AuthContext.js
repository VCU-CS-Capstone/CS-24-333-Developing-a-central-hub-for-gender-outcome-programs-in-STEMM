import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = (email, password) => {
    // Mock authentication logic
    if (email === 'user@example.com' && password === 'password123') {
      console.log('User logged in:', email);
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    console.log('User logged out');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);