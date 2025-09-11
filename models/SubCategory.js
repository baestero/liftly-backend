import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O nome da subcategoria é obrigatório"],
    unique: true,
    match: [
      /^[a-zA-ZÀ-ÿ0-9_\s]{3,20}$/,
      "O nome da subcategoria só pode conter letras (com acentos), números e underline, com 3 a 20 caracteres.",
    ],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("subcategories", SubCategorySchema);
