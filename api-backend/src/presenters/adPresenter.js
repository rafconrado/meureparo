/**
 * Formata um único objeto de anúncio, adicionando a URL completa da imagem.
 * @param {object} ad - O objeto do anúncio vindo do banco de dados.
 * @param {object} req - O objeto da requisição do Express.
 * @returns {object} O anúncio formatado.
 */
const format = (ad, req) => {
  // Monta a URL base do servidor (ex: http://localhost:3000)
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Clona o objeto para evitar mutações inesperadas
  // (Se 'ad' for um objeto simples do DB, isso é seguro)
  const formattedAd = { ...ad };

  // Se o anúncio tiver um caminho de imagem, cria a URL completa
  if (formattedAd.imageUrl) {
    formattedAd.imageUrl = `${baseUrl}${formattedAd.imageUrl}`;
  }

  return formattedAd;
};

/**
 * Formata um array de anúncios.
 * @param {Array<object>} ads - O array de anúncios.
 * @param {object} req - O objeto da requisição do Express.
 * @returns {Array<object>} O array de anúncios formatados.
 */
const formatMany = (ads, req) => {
  // Garante que 'ads' seja um array antes de mapear
  if (!Array.isArray(ads)) return [];
  return ads.map((ad) => format(ad, req));
};

module.exports = {
  format,
  formatMany,
};
