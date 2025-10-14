const Ad = require("../models/Ad");
const path = require("path");
const fs = require("fs").promises;
const adPresenter = require("../presenters/adPresenter");

// --- FUNÇÃO DE CRIAÇÃO COM UPLOAD DE IMAGEM ---
exports.createAd = async (req, res) => {
  try {
    const providerId = req.user.id;

    const { title, description, price, category } = req.body;

    // Validações
    if (!title || !description || !price || !category) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({
        message: "Título, descrição, preço e categoria são obrigatórios.",
      });
    }

    if (isNaN(price) || price <= 0) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res
        .status(400)
        .json({ message: "Preço deve ser um número maior que zero." });
    }

    // Processa upload de imagem se houver
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      console.log("📸 Imagem salva:", imageUrl);
    }

    // Prepara dados do anúncio
    const adData = {
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryId: category,
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

    // Remove arquivo se houver erro
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error("Erro ao deletar arquivo:", unlinkError);
      }
    }

    return res.status(500).json({
      message: "Erro ao criar anúncio.",
      error: error.message,
    });
  }
};

// --- FUNÇÃO PARA BUSCAR ANÚNCIOS DO PROVIDER ---
exports.getProviderAds = async (req, res) => {
  try {
    console.log("--- ROTA /provider/my-ads FOI ACESSADA ---");
    console.log("ID do usuário logado:", req.user.id);

    const providerId = req.user.id;
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
      error: error.message,
    });
  }
};

// --- FUNÇÃO PARA BUSCAR TODOS OS ANÚNCIOS ---
exports.getAllAds = async (req, res) => {
  try {
    const { categoryId, providerId } = req.query;

    const filter = {};
    if (categoryId) {
      filter.categoryId = parseInt(categoryId);
    }
    if (providerId) {
      filter.providerId = parseInt(providerId);
    }

    const ads = await Ad.findAll(filter);
    const formattedAds = adPresenter.formatMany(ads, req);

    return res.status(200).json({
      message: "Anúncios obtidos com sucesso",
      count: ads.length,
      data: formattedAds,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar anúncios:", error);
    return res.status(500).json({
      message: "Erro ao buscar anúncios.",
      error: error.message,
    });
  }
};

// --- FUNÇÃO PARA BUSCAR ANÚNCIO POR ID ---
exports.getAdById = async (req, res) => {
  try {
    const { id } = req.params;

    const ad = await Ad.findById(id);

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
      error: error.message,
    });
  }
};

// --- FUNÇÃO DE ATUALIZAÇÃO COM UPLOAD DE IMAGEM ---
exports.updateAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;

    // Verifica se o anúncio existe
    const ad = await Ad.findById(adId);
    if (!ad) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    // Verifica se o usuário é o dono
    if (ad.providerId !== providerIdFromToken) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para editar este anúncio.",
      });
    }

    // Prepara dados de atualização
    const updateData = {};

    if (req.body.title) updateData.title = req.body.title.trim();
    if (req.body.description)
      updateData.description = req.body.description.trim();
    if (req.body.price) {
      if (isNaN(req.body.price) || req.body.price <= 0) {
        if (req.file) {
          await fs.unlink(req.file.path);
        }
        return res.status(400).json({
          message: "Preço deve ser um número maior que zero.",
        });
      }
      updateData.price = parseFloat(req.body.price);
    }
    if (req.body.category) updateData.categoryId = req.body.category;
    if (req.body.rating !== undefined) updateData.rating = req.body.rating;
    if (req.body.reviews !== undefined) updateData.reviews = req.body.reviews;
    if (req.body.isVerified !== undefined)
      updateData.isVerified = req.body.isVerified;
    if (req.body.isPromoted !== undefined)
      updateData.isPromoted = req.body.isPromoted;
    if (req.body.discount !== undefined)
      updateData.discount = req.body.discount;

    // Se houver nova imagem, deleta a antiga
    if (req.file) {
      if (ad.imageUrl) {
        try {
          const oldImagePath = path.join(
            __dirname,
            "../../public",
            ad.imageUrl
          );
          await fs.unlink(oldImagePath);
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
      error: error.message,
    });
  }
};

// --- FUNÇÃO DE DELEÇÃO ---
exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;

    // Verifica se o anúncio existe
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    // Verifica se o usuário é o dono
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para deletar este anúncio.",
      });
    }

    // Deleta a imagem do servidor
    if (ad.imageUrl) {
      try {
        const imagePath = path.join(__dirname, "../../public", ad.imageUrl);
        await fs.unlink(imagePath);
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
      error: error.message,
    });
  }
};
