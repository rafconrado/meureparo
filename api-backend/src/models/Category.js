const { db } = require("../../database");

class Category {
  /**
   * Cria uma nova categoria no banco de dados.
   * @param {object} categoryData - Dados da categoria { name, icon }.
   * @returns {Promise<object>} O objeto da categoria criada.
   */
  static create(categoryData) {
    return new Promise((resolve, reject) => {
      const { name, icon } = categoryData;
      const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";

      db.run(sql, [name, icon], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...categoryData });
        }
      });
    });
  }

  /**
   * Busca todas as categorias no banco de dados.
   * @returns {Promise<Array>} Uma lista de todas as categorias.
   */
  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM categories";
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
   * Busca uma categoria específica pelo seu ID.
   * @param {number} id - O ID da categoria.
   * @returns {Promise<object>} O objeto da categoria encontrada.
   */
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM categories WHERE id = ?";
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
   * Atualiza uma categoria existente.
   * @param {number} id - O ID da categoria a ser atualizada.
   * @param {object} data - Os novos dados { name, icon }.
   * @returns {Promise<object>} Um objeto com o número de linhas alteradas.
   */
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const { name, icon } = data;
      const sql = "UPDATE categories SET name = ?, icon = ? WHERE id = ?";

      db.run(sql, [name, icon, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: id, changes: this.changes });
        }
      });
    });
  }

  /**
   * Deleta uma categoria do banco de dados.
   * @param {number} id - O ID da categoria a ser deletada.
   * @returns {Promise<object>} Um objeto com o número de linhas alteradas.
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM categories WHERE id = ?";
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

module.exports = Category;
