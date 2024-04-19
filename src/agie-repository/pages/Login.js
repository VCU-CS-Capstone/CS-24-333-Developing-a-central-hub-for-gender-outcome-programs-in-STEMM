import React, { useState } from 'react';
import styles from '@/styles/login.module.css'; // Importing the CSS for styling
import { useAuth } from '../Auth/AuthContext';
import { useRouter } from 'next/router';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with', email, password);
    login(email, password);
    router.push('/protected/search');
  };

  return (
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
  );
}

export default LoginForm;
