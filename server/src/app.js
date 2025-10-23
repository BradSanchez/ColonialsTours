
import express from "express";
import cors from "cors";
import routerLogin from "./routes/routerLogin.js";
import routerRegister from './routes/routerRegister.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", routerLogin);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

app.use("/auth", routerRegister);



export default app;