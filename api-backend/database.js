const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Connected to SQLite database.");

  const createTable = (tableName, docColumn) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ${docColumn} TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT,
        cep TEXT,
        logradouro TEXT,
        numero TEXT,
        complemento TEXT,
        bairro TEXT,
        cidade TEXT,
        uf TEXT,
        comoFicouSabendo TEXT,
        userType TEXT
      )`,
      (err) => {
        if (err) console.error(`Erro criando tabela ${tableName}:`, err.message);
        else console.log(`Tabela ${tableName} verificada/criada`);
      }
    );
  };

  createTable("clients", "cpf");
  createTable("providers", "cnpj");
});

module.exports = db;
