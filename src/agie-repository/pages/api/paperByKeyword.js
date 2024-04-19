import connectDB from './db';

export default async function handler(req, res) {
  let connection;

  try {
    const words = req.query.words; // Get words from query parameters
    if (!words) {
      res.status(200).json([]); // Return an empty array if no words are provided
      return;
    }

    connection = await connectDB();
    const sanitizedWords = words.split(' ').map(word => 
      word.replace(/%/g, '\\%').replace(/_/g, '\\_')
    ); // Sanitize inputs to avoid SQL injection

    const queryParts = [];
    const params = [];

    sanitizedWords.forEach((word, i) => {
      const likePattern = `%${word}%`;
      queryParts.push(`(title LIKE ? OR content LIKE ?)`);
      params.push(likePattern, likePattern); // Push pattern twice for title and content
    });

    const query = `SELECT * FROM paper WHERE ${queryParts.join(' OR ')}`;

    const [data] = await connection.query(query, params);
    res.status(200).json(data);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while fetching the papers' });
  } finally {
    connection.release();
  }
}
