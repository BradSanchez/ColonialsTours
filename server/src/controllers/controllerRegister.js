import sql from 'mssql';  // ← Cambiar esta línea
import { getPool } from '../config/database.js';
import bcrypt from 'bcryptjs';

const controllerRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    const pool = getPool();
    const checkEmail = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id FROM Users WHERE email = @email');

    if (checkEmail.recordset.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El email ya está registrado"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query(`
        INSERT INTO Users (name, email, password)
        OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.role, INSERTED.createdAt
        VALUES (@name, @email, @password)
      `);

    const newUser = result.recordset[0];

    console.log('✅ Usuario registrado en BD:', newUser.email);

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    return res.status(500).json({
      success: false,
      message: "Error del servidor al registrar usuario"
    });
  }
};

export default controllerRegister;