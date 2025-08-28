import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { register } from "./controllers/UserController.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao mongo com sucesso!");
  } catch (err) {
    console.log(`Erro ao se conectar ao mongo ${err}`);
    process.exit(1);
  }
};

connectMongo();

app.get("/", (req, res) => res.json({ message: "Bem vindo ao meu App" }));

app.use("/user", register);

app.listen(PORT, () => console.log(`Servidor Rodando na Porta ${PORT}`));
