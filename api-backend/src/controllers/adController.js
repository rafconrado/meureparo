const Ad = require("../models/Ad");

exports.createAd = async (req, res) => {
  const providerId = req.user.id;
  const role = req.user.role;

  if (role !== "provider") {
    return res.status(403).json({
      message: "Acesso negado. Apenas prestadores podem criar anúncios.",
    });
  }

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

// Busca todos os anúncios
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
    res
      .status(500)
      .json({ message: "Erro ao buscar anúncios.", error: error.message });
  }
};

// Busca um anúncio por ID
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

// Atualiza um anúncio
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

    const updateData = req.body;

    const result = await Ad.update(adId, updateData);

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

// Deleta um anúncio
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
