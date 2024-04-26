import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../Auth/AuthContext';
import Navbar from '../components/Navbar.js'
import Footer from '../components/Footer.js'

function LoginForm() {;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
      event.preventDefault();
      login(email, password);
  };

  return (
    <div>
      <Navbar />
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder='JohnDoe@email.com'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder='******'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
    <Footer />
    </div>
  );
}

export default LoginForm;