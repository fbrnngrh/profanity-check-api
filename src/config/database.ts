import mysql from 'mysql2/promise'
import env from './env'

let pool: mysql.Pool;

try {
  pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit: 0
  });
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}

export async function validateConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

export default pool;