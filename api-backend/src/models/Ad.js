const { db } = require("../../database");

class Ad {
  // Cria um novo anúncio
  static create(data) {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        price,
        category,
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
          title, description, price, category, providerId, 
          image, rating, reviews, isVerified, isPromoted, discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        title,
        description,
        price,
        category,
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

  // Retorna todos os anúncios com informações do prestador
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          ads.id, ads.title, ads.description, ads.price, ads.category, ads.providerId,
          ads.image, ads.rating, ads.reviews, ads.isVerified, ads.isPromoted, ads.discount,
          providers.name as providerName, 
          providers.email as providerEmail,
          providers.phone as providerPhone
        FROM ads
        JOIN providers ON ads.providerId = providers.id
      `;
      db.all(sql, [], (err, rows) => {
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

  // Encontra um anúncio por ID
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

  // Atualiza um anuncio no banco de dados
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        price,
        category,
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
          category = COALESCE(?, category),
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
        category,
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

  // Deleta um anuncio do banco de dados
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
