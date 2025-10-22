// login.js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// Administrador demo
const demoAdmin = {
  email: "demoadmin@email.com",
  password: "123456",
};

// Usuario demo
const demoUser = {
  email: "demouser@email.com",
  password: "654321",
};

// Ruta de login
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  console.log("POST /login", email);

  if (email === demoAdmin.email && password === demoAdmin.password) {
    return res.json({
      success: true,
      role: "admin",
      message: "Login administrador correcto",
    });
  }

  if (email === demoUser.email && password === demoUser.password) {
    return res.json({
      success: true,
      role: "user",
      message: "Login usuario correcto",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Credenciales inválidas",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor de login corriendo en http://localhost:${PORT}`);
});