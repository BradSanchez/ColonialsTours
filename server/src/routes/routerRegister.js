import express from "express";
import controllerRegister from "../controllers/controllerRegister.js";
const router = express.Router();



router.post("/register", controllerRegister );

export default router;