const db = require("../../database");
const bcrypt = require("bcryptjs");

class Provider {
  /**
   * Encontra um prestador pelo CNPJ.
   */
  static findByCnpj(cnpj) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM providers WHERE cnpj = ?";
      db.get(sql, [cnpj], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Encontra um prestador pelo Email.
   */
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM providers WHERE email = ?";
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Cria um novo prestador no banco de dados.
   */
  static create(providerData) {
    return new Promise(async (resolve, reject) => {
      const {
        name,
        cnpj,
        email,
        password,
        phone,
        servico,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
      } = providerData;

      // Criptografa a senha antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO providers (name, cnpj, email, password, phone, servico, cep, logradouro, numero, complemento, bairro, cidade, uf)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        name,
        cnpj,
        email,
        hashedPassword,
        phone,
        servico,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
      ];

      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...providerData });
      });
    });
  }
}

module.exports = Provider;
