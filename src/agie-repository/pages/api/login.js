import mysql from "mysql2/promise";
import connectDB from './db';

export default async function handler(req, res) {

    let connection;

    const { email, password } = req.body;

  try {

    connection = await connectDB();

    const query = "SELECT password FROM Users WHERE email = ?";
    const [data] = await connection.query(query, [email]);

    // Check if a user was found
    if (data.length > 0) {
      const { password: storedPasswordHash } = data[0];

      // Compare the hashed password
      const validPassword = await bcrypt.compare(password, storedPasswordHash);

      if(validPassword){
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
    connection.release();
  }
}