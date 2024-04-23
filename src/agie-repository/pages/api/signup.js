import mysql from 'mysql2/promise';
import connectDB from './db';
import bcrypt from 'bcryptjs'; 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;
  let connection;

  try {
    connection = await connectDB();

    // Check if the user already exists
    const checkUserQuery = "SELECT email FROM login WHERE email = ?";
    const [userExists] = await connection.query(checkUserQuery, [email]);

    if (userExists.length > 0) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const insertQuery = "INSERT INTO login (email, password) VALUES (?, ?)";
    await connection.query(insertQuery, [email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
