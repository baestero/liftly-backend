import SubCategory from "../models/SubCategory.js";

export const createSubCategory = async (req, res) => {
  const { name } = req.body;
  const categoryId = req.params.id;

  if (!name) {
    res.status(400).json({ message: ["O nome da subcategoria é obrigório!"] });
  }

  try {
    const newSubCategory = await SubCategory.create({ name, categoryId });
    res
      .status(201)
      .json({ message: ["Subcategoria criada com sucesso!"], newSubCategory });
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

export const listSubCategory = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({
      categoryId: req.params.id,
    });
    return res.status(200).json(subcategories);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
