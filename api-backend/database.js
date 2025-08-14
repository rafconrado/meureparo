const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to SQLite database.");

  
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      userType TEXT
    )`,
    (err) => {
      if (err) console.error(err.message);
      else {
        
        const newColumns = [
          { name: "cpf", type: "TEXT" },
          { name: "phone", type: "TEXT" },
          { name: "cep", type: "TEXT" },
          { name: "logradouro", type: "TEXT" },
          { name: "numero", type: "TEXT" },
          { name: "complemento", type: "TEXT" },
          { name: "bairro", type: "TEXT" },
          { name: "cidade", type: "TEXT" },
          { name: "uf", type: "TEXT" },
          { name: "comoFicouSabendo", type: "TEXT" },
        ];

        newColumns.forEach((col) => {
          db.get(`PRAGMA table_info(users)`, [], (err, rows) => {
            if (err) console.error(err.message);
          });

          db.run(
            `ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`,
            (err) => {
              if (err && !err.message.includes("duplicate column name")) {
                console.error(err.message);
              }
            }
          );
        });
      }
    }
  );
});

module.exports = db;
