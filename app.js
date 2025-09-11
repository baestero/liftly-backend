import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao mongo com sucesso!");
  } catch (err) {
    console.log(`Erro ao se conectar ao mongo ${err}`);
    process.exit(1);
  }
};

connectMongo();

app.get("/", (req, res) => res.json({ message: "Bem vindo ao meu App" }));

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor Rodando na Porta ${process.env.PORT || 3000}`)
);
