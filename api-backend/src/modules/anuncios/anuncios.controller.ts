import { Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { AuthRequest } from '../auth/auth.interface'; 


import Ad from './anuncios.model'; 
import * as adPresenter from './anuncios.presenter';
import { ICreateAdDTO, IUpdateAdDTO } from './anuncios.interface';

// --- FUNÇÃO DE CRIAÇÃO COM UPLOAD DE IMAGEM ---
export const createAd = async (req: AuthRequest, res: Response) => {
  try {
    const providerId = req.user?.id;
    if (!providerId) return res.status(401).json({ message: "Usuário não autenticado" });

    const { title, description, price, category } = req.body as ICreateAdDTO;

    // Validações
    if (!title || !description || !price || !category) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({
        message: "Título, descrição, preço e categoria são obrigatórios.",
      });
    }

    const priceNumber = parseFloat(price.toString());
    
    if (isNaN(priceNumber) || priceNumber <= 0) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res
        .status(400)
        .json({ message: "Preço deve ser um número maior que zero." });
    }

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      console.log("📸 Imagem salva:", imageUrl);
    }

    const adData = {
      title: title.trim(),
      description: description.trim(),
      price: priceNumber,
      categoryId: parseInt(category.toString()),
      providerId,
      imageUrl,
      rating: 0,
      reviews: 0,
      isVerified: 0,
      isPromoted: 0,
      discount: 0,
    };

    const newAd = await Ad.create(adData);

    return res.status(201).json({
      message: "Anúncio criado com sucesso!",
      data: adPresenter.format(newAd, req),
    });
  } catch (error) {
    console.error("❌ Erro ao criar anúncio:", error);

    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Erro ao deletar arquivo:", unlinkError);
      }
    }

    return res.status(500).json({
      message: "Erro ao criar anúncio.",
      error: (error as Error).message,
    });
  }
};

// --- FUNÇÃO PARA BUSCAR ANÚNCIOS DO PROVIDER ---
export const getProviderAds = async (req: AuthRequest, res: Response) => {
  try {
    const providerId = req.user?.id;
    if (!providerId) return res.status(401).json({ message: "Usuário não autenticado" });

    console.log("--- ROTA /provider/my-ads FOI ACESSADA ---");
    console.log("ID do usuário logado:", providerId);

    const ads = await Ad.findByProviderId(providerId);
    const formattedAds = adPresenter.formatMany(ads, req);

    return res.status(200).json({
      message: "Seus anúncios",
      count: ads.length,
      data: formattedAds,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar anúncios do prestador:", error);
    return res.status(500).json({
      message: "Erro ao buscar seus anúncios.",
      error: (error as Error).message,
    });
  }
};

// --- FUNÇÃO PARA BUSCAR TODOS OS ANÚNCIOS ---
export const getAllAds = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, providerId } = req.query;

    const filter: any = {};
    if (categoryId) {
      filter.categoryId = parseInt(categoryId as string);
    }
    if (providerId) {
      filter.providerId = parseInt(providerId as string);
    }

    const ads = await Ad.findAll(filter);
    const formattedAds = adPresenter.formatMany(ads, req);

    return res.status(200).json({
      success: true,
      message:
        ads.length > 0
          ? "Anúncios obtidos com sucesso"
          : "Nenhum anúncio encontrado ainda",
      count: ads.length,
      data: formattedAds || [],
    });
  } catch (error) {
    console.error("❌ Erro ao buscar anúncios:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar anúncios.",
      error: (error as Error).message,
      data: [],
    });
  }
};

// --- FUNÇÃO PARA BUSCAR ANÚNCIO POR ID ---
export const getAdById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(parseInt(id));

    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    return res.status(200).json({
      message: "Anúncio encontrado",
      data: adPresenter.format(ad, req),
    });
  } catch (error) {
    console.error("❌ Erro ao buscar anúncio:", error);
    return res.status(500).json({
      message: "Erro ao buscar o anúncio.",
      error: (error as Error).message,
    });
  }
};

// --- FUNÇÃO DE ATUALIZAÇÃO COM UPLOAD DE IMAGEM ---
export const updateAd = async (req: AuthRequest, res: Response) => {
  try {
    const adId = parseInt(req.params.id);
    const providerIdFromToken = req.user?.id;

    if (!providerIdFromToken) return res.status(401).json({ message: "Auth error" });

    const ad = await Ad.findById(adId);
    if (!ad) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    if (ad.providerId !== providerIdFromToken) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(403).json({
        message: "Acesso negado. Você não tem permissão para editar este anúncio.",
      });
    }

    // Cast do body para a interface de update
    const body = req.body as IUpdateAdDTO;
    const updateData: any = {};

    if (body.title) updateData.title = body.title.trim();
    if (body.description) updateData.description = body.description.trim();
    
    if (body.price) {
      const priceVal = parseFloat(body.price.toString());
      if (isNaN(priceVal) || priceVal <= 0) {
        if (req.file) {
          await fs.unlink(req.file.path);
        }
        return res.status(400).json({
          message: "Preço deve ser um número maior que zero.",
        });
      }
      updateData.price = priceVal;
    }

    if (body.category) updateData.categoryId = body.category;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.reviews !== undefined) updateData.reviews = body.reviews;
    if (body.isVerified !== undefined) updateData.isVerified = body.isVerified;
    if (body.isPromoted !== undefined) updateData.isPromoted = body.isPromoted;
    if (body.discount !== undefined) updateData.discount = body.discount;

    // Se houver nova imagem, deleta a antiga
    if (req.file) {
      if (ad.imageUrl) {
        try {
          // __dirname no TS (CommonJS) funciona, mas path.resolve é mais seguro
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            ad.imageUrl
          );
          // Usamos um truque aqui, pois unlink lança erro se arquivo não existir
          // Verifique se o caminho bate com a sua estrutura de pastas real
           await fs.unlink(oldImagePath).catch(e => console.log("Arquivo antigo não encontrado para deletar"));
          
          console.log("🗑️ Imagem antiga deletada:", ad.imageUrl);
        } catch (error) {
          console.error("Erro ao deletar imagem antiga:", error);
        }
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      console.log("📸 Nova imagem salva:", updateData.imageUrl);
    }

    // Atualiza no banco de dados
    const result = await Ad.update(adId, updateData);

    if (result.changes === 0) {
      return res.status(400).json({
        message: "Nenhum dado foi alterado.",
      });
    }

    // Retorna os dados atualizados
    const updatedAd = await Ad.findById(adId);

    return res.status(200).json({
      message: "Anúncio atualizado com sucesso.",
      data: adPresenter.format(updatedAd, req),
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar anúncio:", error);

    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Erro ao deletar arquivo:", unlinkError);
      }
    }

    return res.status(500).json({
      message: "Erro ao atualizar o anúncio.",
      error: (error as Error).message,
    });
  }
};

// --- FUNÇÃO DE DELEÇÃO ---
export const deleteAd = async (req: AuthRequest, res: Response) => {
  try {
    const adId = parseInt(req.params.id);
    const providerIdFromToken = req.user?.id;

    if (!providerIdFromToken) return res.status(401).json({message: "Auth error"});

    // Verifica se o anúncio existe
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    // Verifica se o usuário é o dono
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message: "Acesso negado. Você não tem permissão para deletar este anúncio.",
      });
    }

    // Deleta a imagem do servidor
    if (ad.imageUrl) {
      try {
        const imagePath = path.join(__dirname, "../../public", ad.imageUrl);
        await fs.unlink(imagePath).catch(() => {}); // Ignora se não achar
        console.log("🗑️ Imagem deletada:", ad.imageUrl);
      } catch (error) {
        console.error("Erro ao deletar imagem:", error);
      }
    }

    // Deleta do banco de dados
    const result = await Ad.delete(adId);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Anúncio não encontrado para deleção.",
      });
    }

    return res.status(200).json({
      message: "Anúncio deletado com sucesso.",
    });
  } catch (error) {
    console.error("❌ Erro ao deletar anúncio:", error);
    return res.status(500).json({
      message: "Erro ao deletar o anúncio.",
      error: (error as Error).message,
    });
  }
};