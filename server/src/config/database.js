import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: process.env.DB_SERVER,        // localhost
  database: process.env.DB_DATABASE,    // colonialsTours
  user: process.env.DB_USER,            // admin
  password: process.env.DB_PASSWORD,    // Admin123!
port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

export const connectDB = async () => {
  try {
    console.log('DB CONFIG:', {
      server: config.server,
      instance: config.options.instanceName,
      database: config.database,
      user: config.user
    });

    pool = await sql.connect(config);
    console.log('✅ Conectado a SQL Server');
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar a SQL Server:', error);
    throw error;
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error('Database no conectada');
  }
  return pool;
};

export default sql;
