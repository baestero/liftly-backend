import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";

export const createExercise = async (req, res) => {
  const { name } = req.body;
  const { subCategoryId } = req.params;

  if (!name) {
    req.status(400).json({ message: ["O nome do exercício é obrigatório!"] });
  }

  if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
    return req.status(400).json({ message: ["ID da subcategoria inválido!"] });
  }

  try {
    const newExercise = await Exercise.create({ name, subCategoryId });
    res
      .status(201)
      .json({ message: ["Exercício criado com sucesso!"], newExercise });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: [errors] });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ message: [`${field} já está em uso`] });
    }

    return res.status(500).json({ message: ["Erro interno do servidor"] });
  }
};

export const listExercise = async (req, res) => {
  const { subCategoryId } = req.params;
  try {
    const exercises = await Exercise.find({ subCategoryId });
    res.status(200).json(exercises);
  } catch (err) {
    return res.status(500).json({ err: [err.message] });
  }
};

export const updateExercise = async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: ["ID do exercício inválido!"] });
  }

  try {
    const { name } = req.body;
    const exercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { name },
      { new: true, runValidators: true }
    );

    if (!exercise) {
      return res.status(404).json({ message: ["Excercício não encontrado!"] });
    }

    res
      .status(200)
      .json({ message: ["Exercicio atualizado com sucesso!"], exercise });
  } catch (err) {
    res.status(500).json({ message: [err.message] });
  }
};

export const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: ["ID do exercício inválido!"] });
  }

  try {
    const exercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: ["Excercício não encontrado!"] });
    }

    res
      .status(200)
      .json({ message: ["Exercicio deletado com sucesso!"], exercise });
  } catch (err) {
    res.status(500).json({ err: [err.message] });
  }
};
