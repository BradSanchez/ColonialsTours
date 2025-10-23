
import { demoAdmin, demoUser } from "../demoUsers.js";


const controllerLogin = (req, res) => {
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
    }

    export default controllerLogin;