import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getConnection() {
  for (let i = 0; i < 10; i++) {
    try {
      const connection = await pool.getConnection();
      console.log('Successfully connected to MySQL');
      connection.release();
      return pool;
    } catch (error) {
      console.error(
        `MySQL connection attempt ${i + 1} failed:`,
        (error as Error).message,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  throw new Error('Failed to connect to MySQL after retries');
}
export async function executeQuery<T>(
  query: string,
  params: any[] = [],
): Promise<T> {
  const pool = await getConnection();
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T;
  } catch (error) {
    console.error('Query execution failed:', (error as Error).message);
    throw new Error(`Database error: ${(error as Error).message}`);
  }
}


export default pool;