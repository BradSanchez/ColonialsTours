
const objectEx = []

const controllerRegister = (req, res) => {
  const { name, email, password } = req.body;

 

  const newUser = {
    name,
    email,
    password,
  };

  objectEx.push(newUser);

  console.log("Usuarios registrados:", objectEx);

  return res.json({
    success: true,
    message: "Usuario registrado",
    user: newUser,
    totalUsers: objectEx.length,
  });
}

export default controllerRegister;