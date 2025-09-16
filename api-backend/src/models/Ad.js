const db = require("../../database");

class Ad {
  /**
   * Cria um novo anúncio no banco de dados.
   */
  static create({ title, description, price, category, providerId }) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO ads (title, description, price, category, providerId) VALUES (?, ?, ?, ?, ?)";
      const params = [title, description, price, category, providerId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          // Retorna o anúncio recém-criado com o ID
          resolve({
            id: this.lastID,
            title,
            description,
            price,
            category,
            providerId,
          });
        }
      });
    });
  }

  /**
   * Encontra todos os anúncios, incluindo informações do prestador.
   */
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          ads.id, ads.title, ads.description, ads.price, ads.category, ads.providerId,
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
          resolve(rows);
        }
      });
    });
  }

  /**
   * Encontra um anúncio específico pelo seu ID.
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM ads WHERE id = ?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row); // Retorna a linha encontrada ou 'undefined' se não encontrar
        }
      });
    });
  }

  /**
   * Atualiza um anúncio existente.
   */
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, description, price, category } = data;
      const sql =
        "UPDATE ads SET title = ?, description = ?, price = ?, category = ? WHERE id = ?";
      db.run(sql, [title, description, price, category, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes }); // Retorna o número de linhas afetadas
        }
      });
    });
  }

  /**
   * Deleta um anúncio do banco de dados.
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM ads WHERE id = ?";
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes }); // Retorna o número de linhas afetadas
        }
      });
    });
  }
}

module.exports = Ad;
