const Category = require("../models/Category");

// Função para buscar todas as categorias
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar categorias.",
      error: error.message,
    });
  }
};

// Função para criar uma nova categoria pelo admin
exports.createCategory = async (req, res) => {
  const { name, icon } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ message: "O nome da categoria é obrigatório." });
  }
  try {
    const newCategory = await Category.create({ name, icon });
    res
      .status(201)
      .json({
        message: "Categoria criada com sucesso!",
        category: newCategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar categoria.", error: error.message });
  }
};
