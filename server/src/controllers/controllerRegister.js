
const users = [];

const controllerRegister = (req, res) => {
  const { name, email, password } = req.body;

  // Campos requeridos
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos"
    });
  }

  // Password mínimo 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "La contraseña debe tener mínimo 6 caracteres"
    });
  }

  // Email ya existe
  const emailExists = users.find(user => user.email === email);
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "El email ya está registrado"
    });
  }

  // crear usuario
  const newUser = {
    id: users.length + 1,  // ID simple
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  console.log("Usuarios registrados:", users);

  // exito
  return res.status(201).json({
    success: true,
    message: "Usuario registrado exitosamente",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      
    },
    totalUsers: users.length,
  });
};

export default controllerRegister;