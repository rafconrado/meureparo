const { db } = require("../../database");

class Category {
  static create(data) {
    return new Promise((resolve, reject) => {
      const { name, icon } = data;

      const sql = `INSERT INTO CATEGORIAS (NOME, ICON) VALUES (?, ?)`;
      const params = [name, icon || null];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, name, icon });
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ID as id, NOME as name, ICON as icon, DESATIVADO, CREATED_AT, UPDATED_AT FROM CATEGORIAS WHERE DESATIVADO = 'N' ORDER BY NOME`;

      db.all(sql, [], (err, rows) => {
        if (err) {
          console.error("Erro ao buscar categorias:", err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT ID as id, NOME as name, ICON as icon FROM CATEGORIAS WHERE ID = ? AND DESATIVADO = 'N'`;

      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { name, icon } = data;
      const sql = `UPDATE CATEGORIAS SET NOME = ?, ICON = ?, UPDATED_AT = CURRENT_TIMESTAMP WHERE ID = ?`;

      db.run(sql, [name, icon, id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      // Soft delete
      const sql = `UPDATE CATEGORIAS SET DESATIVADO = 'S' WHERE ID = ?`;

      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Category;
