const Ad = require("../models/Ad"); // Importa o nosso novo Model

/**
 * Cria um novo anúncio.
 * Apenas usuários autenticados com userType 'provider' podem acessar.
 */
exports.createAd = async (req, res) => {
  const providerId = req.user.id;
  const userType = req.user.userType;

  // Verificação para garantir que apenas providers criem anúncios
  if (userType !== "provider") {
    return res.status(403).json({
      message: "Acesso negado. Apenas prestadores podem criar anúncios.",
    });
  }

  const { title, description, price, category } = req.body;
  if (!title || !description || !category) {
    return res
      .status(400)
      .json({ message: "Título, descrição e categoria são obrigatórios." });
  }

  try {
    const newAd = await Ad.create({
      title,
      description,
      price,
      category,
      providerId,
    });
    res.status(201).json({ message: "Anúncio criado com sucesso!", ad: newAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar anúncio.", error: error.message });
  }
};

/**
 * Lista todos os anúncios disponíveis (acesso público).
 */
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar anúncios.", error: error.message });
  }
};

/**
 * Busca um único anúncio pelo ID (acesso público).
 */
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

/**
 * Atualiza um anúncio.
 * Apenas o provider que criou o anúncio pode atualizá-lo.
 */
exports.updateAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;

    // 1. Verificar se o anúncio existe e quem é o dono
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    // 2. Checar se o usuário logado é o dono do anúncio
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para editar este anúncio.",
      });
    }

    // 3. Se tudo estiver ok, prosseguir com a atualização
    const { title, description, price, category } = req.body;
    const result = await Ad.update(adId, {
      title,
      description,
      price,
      category,
    });

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

/**
 * Deleta um anúncio.
 * Apenas o provider que criou o anúncio pode deletá-lo.
 */
exports.deleteAd = async (req, res) => {
  try {
    const adId = req.params.id;
    const providerIdFromToken = req.user.id;

    // 1. Verificar se o anúncio existe e quem é o dono
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    // 2. Checar se o usuário logado é o dono do anúncio
    if (ad.providerId !== providerIdFromToken) {
      return res.status(403).json({
        message:
          "Acesso negado. Você não tem permissão para deletar este anúncio.",
      });
    }

    // 3. Se tudo estiver ok, prosseguir com a deleção
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
