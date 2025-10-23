    // login.js
   import express from "express";
    

    const app = express();
    const router = express.Router();

    import controllerLogin from "../controllers/controllerLogin.js";



    app.use(express.json());

    // Administrador demo
   import { demoAdmin, demoUser } from "../demoUsers.js";

    // Ruta de login
    router.post("/login", controllerLogin);

    export default router;
    