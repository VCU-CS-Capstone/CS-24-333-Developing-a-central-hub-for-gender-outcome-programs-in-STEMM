import mysql from "mysql2/promise";
import connectDB from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  let connection;

  try {
    connection = await connectDB();
    const query = "SELECT email, password FROM login WHERE email = ?";
    const [data] = await connection.query(query, [email]);

    if (data.length > 0) {
      const { id, password: storedPasswordHash } = data[0];
      const validPassword = await bcrypt.compare(password, storedPasswordHash);

      if (validPassword) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
