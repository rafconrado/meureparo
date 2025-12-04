import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const DBSOURCE = "C:/Users/Pichau/Documents/meureparo.db"; 

export const db = new sqlite.Database(DBSOURCE, (err: Error | null) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
    throw err;
  } else {
    console.log("✅ Conectado ao banco:", DBSOURCE);
  }
});