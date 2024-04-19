import connectDB from './db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // This assumes that the category names come as a comma-separated list or a single string.
  let { categoryName } = req.query;

  if (!categoryName) {
    return res.status(400).json({ error: 'Missing categoryName query parameter' });
  }

  // Ensure that categoryName is treated as an array.
  const categories = Array.isArray(categoryName) ? categoryName : categoryName.split(',');

  let connection;

  try {
    connection = await connectDB();

    // Create placeholders for the SQL query based on the number of categories.
    const placeholders = categories.map(() => '?').join(', ');
    const query = `
      SELECT paper.*
      FROM paper
      JOIN paperCategory ON paper.paperPMID = paperCategory.paperPMID
      JOIN agieCategory ON paperCategory.categoryID = agieCategory.categoryID
      WHERE agieCategory.categoryName IN (${placeholders})
    `;

    // Execute the query with the categories array.
    const [rows] = await connection.query(query, categories);
    
    res.status(200).json(rows);

  } catch (error) {
    console.error('Failed to connect to the database:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {

    if (connection) {
      connection.release();
    }
  }
}