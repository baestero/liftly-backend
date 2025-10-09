import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: ["O nome da categoria é obrigório!"] });
  }

  try {
    const newCategory = await Category.create({ name });
    res
      .status(201)
      .json({ message: ["Categoria criada com sucesso!"], newCategory });
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

export const listCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ _id: 1 });
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
