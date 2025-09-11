import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-ZÀ-ÿ0-9_\s]{3,20}$/,
      "O nome da subcategoria só pode conter letras (com acentos), números e underline, com 3 a 20 caracteres.",
    ],
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
});

export default mongoose.model("exercises", ExerciseSchema);
