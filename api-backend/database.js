const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log("Conectado ao banco de dados SQLite.");

  // --- CRIAÇÃO DA TABELA DE CLIENTES (CLIENTS) ---
  db.run(
    `CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone TEXT,
            cep TEXT,
            logradouro TEXT,
            numero TEXT,
            complemento TEXT,
            bairro TEXT,
            cidade TEXT,
            uf TEXT,
            comoFicouSabendo TEXT,
            userType TEXT DEFAULT 'client'
        )`,
    (err) => {
      if (err) {
        console.error("Erro criando tabela clients:", err.message);
      } else {
        console.log("Tabela 'clients' verificada/criada.");
      }
    }
  );

  // --- CRIAÇÃO DA TABELA DE PRESTADORES (PROVIDERS) ---
  db.run(
    `CREATE TABLE IF NOT EXISTS providers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cnpj TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone TEXT,
            servico TEXT NOT NULL,
            cep TEXT,
            logradouro TEXT,
            numero TEXT,
            complemento TEXT,
            bairro TEXT,
            cidade TEXT,
            uf TEXT,
            userType TEXT DEFAULT 'provider'
        )`,
    (err) => {
      if (err) {
        console.error("Erro criando tabela providers:", err.message);
      } else {
        console.log("Tabela 'providers' verificada/criada.");
      }
    }
  );

  // --- CRIAÇÃO DA TABELA DE ANÚNCIOS (ADS) ---
  db.run(
    `CREATE TABLE IF NOT EXISTS ads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL,
            category TEXT NOT NULL,
            providerId INTEGER NOT NULL,
            FOREIGN KEY (providerId) REFERENCES providers (id)
        )`,
    (err) => {
      if (err) console.error("Erro criando tabela ads:", err.message);
      else console.log("Tabela ads verificada/criada");
    }
  );
});

module.exports = db;
