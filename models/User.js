import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "O nome de usuário é obrigatório!"],
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9_]{3,20}$/,
      "O nome de usuário só pode conter letras, números e underline, com 3 a 20 caracteres.",
    ],
  },
  email: {
    type: String,
    required: [true, "O email do usuário é obrigatório!"],
    unique: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "O email deve ter o formato exemplo@dominio.com.",
    ],
  },
  password: {
    type: String,
    required: [true, "A senha do usuário é obrigatória!"],
  },
});

export default mongoose.model("users", UserSchema);
