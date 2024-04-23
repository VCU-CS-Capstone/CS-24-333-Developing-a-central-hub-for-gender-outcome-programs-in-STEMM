import connectDB from './db'; 

export default async function handler(req, res) {
  let connection;
  
  try {
    
    connection = await connectDB();

    const query =  `SELECT agieCategory.categoryName, COUNT(paperCategory.categoryID) AS categoryCount
                    FROM agieCategory
                    LEFT JOIN paperCategory ON agieCategory.categoryID = paperCategory.categoryID
                    GROUP BY agieCategory.categoryID, agieCategory.categoryName
                   `;

    const [data] = await connection.query(query, []);

    //res.status(200).json(data.map(item => item.categoryName));
    res.status(200).json(data);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    connection.release();
  }

}
