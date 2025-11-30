const { db } = require("../../database");

exports.getAllUsers = async (req, res) => {
  try {
    const [clients, providers] = await Promise.all([
      new Promise((resolve, reject) => {
        const sql = "SELECT id, name, email, phone, role FROM clients";
        db.all(sql, [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      }),
      new Promise((resolve, reject) => {
        const sql =
          "SELECT id, name, email, phone, role, servico FROM providers";
        db.all(sql, [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      }),
    ]);

    res.status(200).json({ clients, providers });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar usuários.",
      error: error.message,
    });
  }
};
