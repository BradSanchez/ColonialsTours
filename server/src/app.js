
import express from "express";
import cors from "cors";
import routerLogin from "./routes/routerLogin.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", routerLogin);

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});




export default app;