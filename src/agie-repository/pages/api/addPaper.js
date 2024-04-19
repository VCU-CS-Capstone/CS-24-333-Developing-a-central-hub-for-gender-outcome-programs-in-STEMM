import connectDB from './transactionDB';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const papers = req.body;
    let connection;

    try {
        connection = await connectDB();
        await connection.beginTransaction(); // Start transaction

        for (const paper of papers) {
            const { paperPMID, title, content = '', paperURL, publishedDate, authorNames = [], categoryNames = [], keywordNames = [] } = paper;

            // Check if the paper already exists
            const [existingPaper] = await connection.execute("SELECT paperPMID FROM paper WHERE paperPMID = ?", [paperPMID]);
            if (existingPaper.length > 0) {
                console.log(`Paper ${paperPMID} already exists, skipping...`);
                continue;
            }

            // Insert the paper
            await connection.execute(
                "INSERT INTO paper (paperPMID, title, content, paperURL, publishedDate) VALUES (?, ?, ?, ?, ?)",
                [paperPMID, title, content.substring(0, 65535), paperURL, publishedDate]
            );

            // Handle authors
            for (const authorName of authorNames) {
                const authorId = await getOrCreateEntity('author', 'authorID', 'authorName', authorName, connection);
                await connection.execute("INSERT INTO authorPaper (authorID, paperPMID) VALUES (?, ?)", [authorId, paperPMID]);
            }

            // Handle categories
            for (const categoryName of categoryNames) {
                const categoryId = await getOrCreateEntity('agieCategory', 'categoryID', 'categoryName', categoryName, connection);
                await connection.execute("INSERT INTO paperCategory (categoryID, paperPMID) VALUES (?, ?)", [categoryId, paperPMID]);
            }

            // Handle keywords
            for (const keywordName of keywordNames) {
                const keywordId = await getOrCreateEntity('keyword', 'keywordID', 'keywordName', keywordName, connection);
                await connection.execute("INSERT INTO paperKeyword (keywordID, paperPMID) VALUES (?, ?)", [keywordId, paperPMID]);
            }
        }

        await connection.commit(); 
        res.status(200).json({ message: 'Papers added successfully' });
    } catch (error) {
        console.error('Database or server error:', error);
        await connection.rollback(); 
        res.status(500).json({ error: 'Internal server error', details: error.message });
    } finally {
        if (connection) {
            await connection.release(); 
        }
    }
}

async function getOrCreateEntity(tableName, idField, nameField, nameValue, connection) {
  const [results] = await connection.execute(
    `SELECT ${idField} FROM ${tableName} WHERE ${nameField} = ? LIMIT 1`,
    [nameValue]
  );

  if (results.length > 0) {
    return results[0][idField];
  } else {
    await connection.execute(
      `INSERT INTO ${tableName} (${nameField}) VALUES (?)`,
      [nameValue]
    );
    const [newIdResult] = await connection.execute(`SELECT LAST_INSERT_ID() AS newId`);
    return newIdResult[0].newId;
  }
}