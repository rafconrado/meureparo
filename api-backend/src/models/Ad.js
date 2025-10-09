const { db } = require("../../database");

class Ad {
  /**
   * Cria um novo anúncio no banco de dados.
   * @param {object} data - Dados do anúncio.
   * @returns {Promise<object>} O objeto do anúncio criado.
   */
  static create(data) {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        price,
        categoryId,
        providerId,
        image = null,
        rating = 0,
        reviews = 0,
        isVerified = 0,
        isPromoted = 0,
        discount = 0,
      } = data;

      const sql = `
        INSERT INTO ads (
          title, description, price, categoryId, providerId, 
          image, rating, reviews, isVerified, isPromoted, discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
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
      ];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...data });
        }
      });
    });
  }

  /**
   * Retorna anúncios com informações do prestador, com filtro opcional.
   * @param {object} [filter={}] - Objeto de filtro opcional. Ex: { categoryId: 1 }.
   * @returns {Promise<Array>} Uma lista de anúncios.
   */
  static findAll(filter = {}) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT 
        ads.id, ads.title, ads.description, ads.price, ads.categoryId, ads.providerId,
        ads.image, ads.rating, ads.reviews, ads.isVerified, ads.isPromoted, ads.discount,
        providers.name as providerName, 
        providers.email as providerEmail,
        providers.phone as providerPhone
      FROM ads
      JOIN providers ON ads.providerId = providers.id
    `;

      const conditions = [];
      const params = [];

      // Filtro por categoria (opcional)
      if (filter.categoryId) {
        conditions.push("ads.categoryId = ?");
        params.push(filter.categoryId);
      }

      // Filtro por prestador (opcional)
      if (filter.providerId) {
        conditions.push("ads.providerId = ?");
        params.push(filter.providerId);
      }

      // Adiciona o WHERE se houver condições
      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }

      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const adsWithBooleans = rows.map((ad) => ({
            ...ad,
            isVerified: !!ad.isVerified,
            isPromoted: !!ad.isPromoted,
          }));
          resolve(adsWithBooleans);
        }
      });
    });
  }

  /**
   * Encontra um anúncio específico pelo seu ID.
   * @param {number} id - O ID do anúncio.
   * @returns {Promise<object>} O objeto do anúncio encontrado.
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          ads.*, 
          providers.name as providerName 
        FROM ads 
        JOIN providers ON ads.providerId = providers.id 
        WHERE ads.id = ?
      `;
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Atualiza um anúncio no banco de dados.
   * @param {number} id - O ID do anúncio a ser atualizado.
   * @param {object} data - Os novos dados para o anúncio.
   * @returns {Promise<object>} Um objeto com o número de linhas alteradas.
   */
  static update(id, data) {
    return new Promise((resolve, reject) => {
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
      } = data;

      const sql = `
        UPDATE ads 
        SET 
          title = COALESCE(?, title), 
          description = COALESCE(?, description), 
          price = COALESCE(?, price), 
          categoryId = COALESCE(?, categoryId),
          image = COALESCE(?, image),
          rating = COALESCE(?, rating),
          reviews = COALESCE(?, reviews),
          isVerified = COALESCE(?, isVerified),
          isPromoted = COALESCE(?, isPromoted),
          discount = COALESCE(?, discount)
        WHERE id = ?
      `;
      const params = [
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
        id,
      ];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }

  /**
   * Deleta um anúncio do banco de dados.
   * @param {number} id - O ID do anúncio a ser deletado.
   * @returns {Promise<object>} Um objeto com o número de linhas alteradas.
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM ads WHERE id = ?";
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

module.exports = Ad;
