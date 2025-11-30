const { db } = require("../../config/database");

class Ad {
  static create(data) {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        price,
        categoryId,
        providerId,
        imageUrl = null,
        discount = 0,
      } = data;

      if (!title || !description || !categoryId || !providerId) {
        return reject(new Error("Campos obrigatórios faltando"));
      }

      const sql = `
        INSERT INTO ANUNCIOS (
          TITLE, DESCRICAO, VALOR, DESCONTO, CATEGORY_ID, ID_USUARIO, IMAGE
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        title,
        description,
        price,
        discount,
        categoryId,
        providerId,
        imageUrl,
      ];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...data });
      });
    });
  }

  static findAll(filter = {}) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT 
          a.ID, a.TITLE, a.DESCRICAO, a.VALOR, a.DESCONTO, 
          a.CATEGORY_ID, a.ID_USUARIO, a.IMAGE, 
          a.CREATED_AT, a.UPDATED_AT,
          p.NOME_FANTASIA as providerName, 
          p.EMAIL as providerEmail,
          p.TELEFONE as providerPhone
        FROM ANUNCIOS a
        JOIN PRESTADORES p ON a.ID_USUARIO = p.ID
        WHERE a.DESATIVADO = 'N'
      `;

      const conditions = [];
      const params = [];

      if (filter.categoryId) {
        conditions.push("a.CATEGORY_ID = ?");
        params.push(filter.categoryId);
      }

      if (filter.providerId) {
        conditions.push("a.ID_USUARIO = ?");
        params.push(filter.providerId);
      }

      if (conditions.length > 0) {
        sql += " AND " + conditions.join(" AND ");
      }

      sql += " ORDER BY a.CREATED_AT DESC";

      db.all(sql, params, (err, rows) => {
        if (err) {
          console.error("❌ Erro SQL no findAll:", err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          a.*, 
          p.NOME_FANTASIA as providerName,
          p.EMAIL as providerEmail,
          p.TELEFONE as providerPhone,
          p.DESCRICAO_EMPRESA as providerDescription
        FROM ANUNCIOS a 
        JOIN PRESTADORES p ON a.ID_USUARIO = p.ID 
        WHERE a.ID = ? AND a.DESATIVADO = 'N'
      `;
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { title, description, price, categoryId, imageUrl, discount } =
        data;

      const sql = `
        UPDATE ANUNCIOS 
        SET 
          TITLE = COALESCE(?, TITLE), 
          DESCRICAO = COALESCE(?, DESCRICAO), 
          VALOR = COALESCE(?, VALOR), 
          CATEGORY_ID = COALESCE(?, CATEGORY_ID),
          IMAGE = COALESCE(?, IMAGE),
          DESCONTO = COALESCE(?, DESCONTO),
          UPDATED_AT = CURRENT_TIMESTAMP
        WHERE ID = ?
      `;
      const params = [
        title,
        description,
        price,
        categoryId,
        imageUrl,
        discount,
        id,
      ];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      // Soft delete
      const sql = "UPDATE ANUNCIOS SET DESATIVADO = 'S' WHERE ID = ?";
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Ad;
