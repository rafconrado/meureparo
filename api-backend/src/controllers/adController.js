const db = require("../../database");

/**
 * Cria um novo anúncio.
 * Apenas usuários autenticados com role 'provider' podem acessar.
 */
exports.createAd = (req, res) => {
  // O ID e o tipo do usuário vêm do token JWT, injetado pelo middleware de auth
  const providerId = req.user.id;
  const userType = req.user.userType;

  // Verificação extra para garantir que apenas providers criem anúncios
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

  const sql =
    "INSERT INTO ads (title, description, price, category, providerId) VALUES (?, ?, ?, ?, ?)";
  const params = [title, description, price, category, providerId];

  db.run(sql, params, function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao criar anúncio.", error: err.message });
    }
    res.status(201).json({
      message: "Anúncio criado com sucesso!",
      ad: {
        id: this.lastID,
        title,
        description,
        price,
        category,
        providerId,
      },
    });
  });
};

/**
 * Lista todos os anúncios disponíveis.
 * Acesso público, não precisa de autenticação.
 */
exports.getAllAds = (req, res) => {
  // Usamos um JOIN para buscar os anúncios e incluir o nome do provedor
  const sql = `
    SELECT 
      ads.id, ads.title, ads.description, ads.price, ads.category,
      providers.name as providerName, 
      providers.email as providerEmail,
      providers.phone as providerPhone
    FROM ads
    JOIN providers ON ads.providerId = providers.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar anúncios.", error: err.message });
    }
    res.status(200).json(rows);
  });
};
