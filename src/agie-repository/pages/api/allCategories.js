import connectDB from './db'; 

export default async function handler(req, res) {

  let connection
  
  try {

    connection = await connectDB();

    const query =  `SELECT DISTINCT categoryName 
                    FROM agieCategory
                   `;

    const [data] = await connection.query(query);

    res.status(200).json(data.map(item => item.categoryName));
    
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (connection){
      connection.release();
    }
  }

}