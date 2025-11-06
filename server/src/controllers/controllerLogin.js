import sql from 'mssql';
import { getPool } from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { demoAdmin, demoUser } from "../demoUsers.js";

const controllerLogin = async (req, res) => {
  const { email, password } = req.body || {};

  // Validación: campos vacíos
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email y contraseña son requeridos"
    });
  }

  console.log("POST /login", email);

  try {
    // 1. Verificar usuarios demo primero (mantener funcionalidad existente)
    if (email === demoAdmin.email && password === demoAdmin.password) {
      const token = jwt.sign(
        { email: demoAdmin.email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        role: "admin",
        message: "Login administrador correcto",
        token: token
      });
    }

    if (email === demoUser.email && password === demoUser.password) {
      const token = jwt.sign(
        { email: demoUser.email, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        role: "user",
        message: "Login usuario correcto",
        token: token
      });
    }

    // 2. Si no es demo, buscar en la base de datos
    const pool = getPool();
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    // ❌ Usuario no encontrado
    if (result.recordset.length === 0) {
      console.log('❌ Usuario no encontrado:', email);
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    const user = result.recordset[0];

    // ❌ Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('❌ Contraseña incorrecta para:', email);
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas"
      });
    }

    // ✅ Login exitoso - Crear token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login exitoso desde BD:', user.email);

    return res.json({
      success: true,
      message: "Login correcto",
      role: user.role,
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    
    // Error del servidor (no de credenciales)
    return res.status(500).json({
      success: false,
      message: "Error del servidor al iniciar sesión"
    });
  }
};

export default controllerLogin;