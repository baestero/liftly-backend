import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";

export const createExercise = async (req, res) => {
  const { name, maxWeight, reps, sets } = req.body;
  const { id: userId } = req.user;
  const { subCategoryId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: ["Usuário não autenticado"] });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: ["ID de usuário inválido"] });
  }

  if (!mongoose.Types.ObjectId.isValid(subCategoryId)) {
    return res.status(400).json({ message: ["ID da subcategoria inválido!"] });
  }

  try {
    const newExercise = await Exercise.create({
      name,
      maxWeight,
      reps,
      sets,
      subCategoryId,
      userId,
    });
    res
      .status(201)
      .json({ message: ["Exercício criado com sucesso!"], newExercise });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: errors });
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
  const { id: userId } = req.user;

  try {
    const exercises = await Exercise.find({ subCategoryId, userId });
    res.status(200).json(exercises);
  } catch (err) {
    return res.status(500).json({ err: [err.message] });
  }
};

export const updateExercise = async (req, res) => {
  const { exerciseId } = req.params;
  const { id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: ["ID do exercício inválido!"] });
  }

  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: exerciseId, userId },
      req.body,
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
  const { id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    return res.status(400).json({ message: ["ID do exercício inválido!"] });
  }

  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: exerciseId,
      userId,
    });

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
