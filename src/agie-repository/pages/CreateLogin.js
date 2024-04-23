import React, { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { useRouter } from 'next/router';

function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // You can handle this more gracefully with state-based error messages
      return;
    }

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirect to a search or home page on successful signup
      router.push('/search'); // Adjust this as per your application's flow
    } else {
      const errorData = await response.json();
      console.error('Sign up error:', errorData.message);
      // Optionally set error messages in state and show in form
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}

export default CreateUserForm;
