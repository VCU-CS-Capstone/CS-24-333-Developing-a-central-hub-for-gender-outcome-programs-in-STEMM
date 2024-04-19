import mysql from "mysql2/promise";

// Configuration for the MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to get a connection from the pool
const connectDB = async () => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    // Set up connection to use transactions
    await connection.beginTransaction();
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;  // Rethrow to handle the error externally
  }
}

export default connectDB;