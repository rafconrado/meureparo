const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "C:/Users/Pichau/Documents/meureparo.db"; 

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
    throw err;
  } else {
    console.log("✅ Conectado ao banco:", DBSOURCE);
  }
});


module.exports = { db };