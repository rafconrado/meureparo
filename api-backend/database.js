const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
    throw err;
  }
});

// Função para inicializar o banco de dados e criar as tabelas se não existirem.
const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabela de Usuários: Clientes
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
          role TEXT NOT NULL DEFAULT 'client'
        )`,
        (err) => {
          if (err) return reject(err);
        }
      );

      // Tabela de Usuários: Prestadores de Serviço
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
          role TEXT NOT NULL DEFAULT 'provider'
        )`,
        (err) => {
          if (err) return reject(err);
        }
      );

      // Tabela de Categorias de Serviço
      db.run(
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          icon TEXT
        )`,
        (err) => {
          if (err) return reject(err);
        }
      );

      // Tabela de Anúncios
      db.run(
        `CREATE TABLE IF NOT EXISTS ads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          price REAL,
          categoryId INTEGER NOT NULL,
          providerId INTEGER NOT NULL,
          image TEXT,
          rating REAL DEFAULT 0,
          reviews INTEGER DEFAULT 0,
          isVerified INTEGER DEFAULT 0,
          isPromoted INTEGER DEFAULT 0,
          discount INTEGER DEFAULT 0,
          -- Chaves estrangeiras que relacionam o anúncio ao prestador e à categoria
          FOREIGN KEY (providerId) REFERENCES providers (id),
          FOREIGN KEY (categoryId) REFERENCES categories (id)
        )`,
        (err) => {
          if (err) return reject(err);
        }
      );

      // Tabela de Usuários: Administradores
      db.run(
        `CREATE TABLE IF NOT EXISTS admins (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin'
        )`,
        (err) => {
          if (err) return reject(err);
          resolve(); 
        }
      );
    });
  });
};

module.exports = { db, initDb };
