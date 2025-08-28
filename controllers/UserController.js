import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    res.status(400).json({ message: ["Todos os campos são obrigatórios!"] });
  }

  if (password.length < 4) {
    return res
      .status(400)
      .json({ message: ["A senha precisa de no mínimo 4 caracteres! "] });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: ["Usuario criado com sucesso"],
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: errors });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: [`${field} já está em uso.`] });
    }

    return res.status(500).json({ message: ["Erro interno do servidor"] });
  }
};
