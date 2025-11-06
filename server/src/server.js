import app from "./app.js";
import { connectDB } from "./config/database.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Conectar a la base de datos primero
    await connectDB();
    
    // Luego iniciar el servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();