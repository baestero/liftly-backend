import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: {
    type: String,
    required: [true, "O nome da exercicio é obrigatório"],
    lowercase: true,
    match: [
      /^[a-zA-ZÀ-ÿ0-9_\s]{3,20}$/,
      "O nome da subcategoria só pode conter letras (com acentos), números e underline, com 3 a 20 caracteres.",
    ],
  },
  maxWeight: {
    type: Number,
    required: [true, "O peso é obrigatório"],
  },
  reps: {
    type: Number,
    required: [true, "O número repetições são obrigatórias"],
  },
  sets: {
    type: Number,
    required: [true, "O número de séries são obrigatórias"],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
});

ExerciseSchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.model("exercises", ExerciseSchema);
