import { Request, Response } from 'express';
import Category from '../categorias/categorias.model';
import { ICreateCategoryDTO } from './categorias.interface';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar categorias.",
      error: (error as Error).message,
    });
  }
};

export const createCategory = async (req: Request<{}, {}, ICreateCategoryDTO>, res: Response) => {
  const { name, icon } = req.body;

  if (!name) {
    return res.status(400).json({ message: "O nome da categoria é obrigatório." });
  }

  try {
    const newCategory = await Category.create({ name, icon });
    return res.status(201).json({
      message: "Categoria criada com sucesso!",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Erro ao criar categoria.", 
      error: (error as Error).message 
    });
  }
};