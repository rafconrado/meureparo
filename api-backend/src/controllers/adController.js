const Ad = require("../models/Ad");

// --- FUNÇÃO DE CRIAÇÃO ---
exports.createAd = async (req, res) => {
  const providerId = req.user.id;

  const {
    title,
    description,
    price,
    categoryId,
    image,
    rating,
    reviews,
    isVerified,
    isPromoted,
    discount,
  } = req.body;

  if (!title || !description || !categoryId) {
    return res
      .status(400)
      .json({ message: "Título, descrição e categoria são obrigatórios." });
  }

  try {
    const adData = {
      title,
      description,
      price,
      categoryId,
      providerId,
      image,
      rating,
      reviews,
      isVerified,
      isPromoted,
      discount,
    };
    const newAd = await Ad.create(adData);
    res.status(201).json({ message: "Anúncio criado com sucesso!", ad: newAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar anúncio.", error: error.message });
  }
};

// --- NOVA FUNÇÃO PARA BUSCAR ANÚNCIOS DO PROVIDER ---
exports.getProviderAds = async (req, res) => {
  console.log("--- ROTA /provider/my-ads FOI ACESSADA ---");
  console.log("ID do usuário logado:", req.user.id);
  try {
    const providerId = req.user.id;
    const ads = await Ad.findAll({ where: filter });
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar seus anúncios.", error: error.message });
  }
};

// --- FUNÇÕES PÚBLICAS ---
exports.getAllAds = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const filter = {};
    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const ads = await Ad.findAll(filter);

    res.status(200).json(ads);
  } catch (error) {
    console.error("Erro detalhado ao buscar anúncios:", error);
    res.status(500).json({
      message: "Erro ao buscar anúncios.",
      error: error.message,
    });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }
    res.status(200).json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar o anúncio.", error: error.message });
  }
};

// --- FUNÇÕES DE ATUALIZAÇÃO E DELETE ---
exports.updateAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para editar este anúncio.",
      });
    }
    const result = await Ad.update(adId, req.body);
    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Anúncio não encontrado para atualização." });
    }
    res.status(200).json({ message: "Anúncio atualizado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o anúncio.", error: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para deletar este anúncio.",
      });
    }
    const result = await Ad.delete(adId);
    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Anúncio não encontrado para deleção." });
    }
    res.status(200).json({ message: "Anúncio deletado com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar o anúncio.", error: error.message });
  }
};
