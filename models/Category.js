import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O nome da Categoria é obrigatório"],
    unique: true,
    match: [
      /^[a-zA-ZÀ-ÿ0-9_]{3,20}$/,
      "O nome da categoria só pode conter letras (com acentos), números e underline, com 3 a 20 caracteres.",
    ],
  },
});

export default mongoose.model("categories", CategorySchema);
