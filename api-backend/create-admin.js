const readline = require("readline");
const bcrypt = require("bcryptjs");
const { db } = require("./database.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createAdmin = async () => {
  try {
    console.log("--- Criação de Novo Administrador ---");

    const name = await new Promise((resolve) =>
      rl.question("Nome do admin: ", resolve)
    );
    const email = await new Promise((resolve) =>
      rl.question("Email do admin: ", resolve)
    );

    const HIDE_PASS_SYMBOL = "*";
    const onDataHandler = (char) => {
      char = char + "";
      switch (char) {
        case "\n":
        case "\r":
        case "\u0004":
          process.stdin.removeListener("data", onDataHandler);
          break;
        default:
          process.stdout.write(HIDE_PASS_SYMBOL);
          break;
      }
    };
    process.stdin.on("data", onDataHandler);

    const password = await new Promise((resolve) =>
      rl.question("Senha do admin: ", resolve)
    );

    process.stdin.removeListener("data", onDataHandler);
    process.stdout.write("\n");
    rl.close();

    if (!name || !email || !password) {
      console.error("\nTodos os campos são obrigatórios.");
      db.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = "INSERT INTO ADMINS (NOME, EMAIL, SENHA, ROLE) VALUES (?, ?, ?, ?)";
    const params = [name, email, hashedPassword, "ADMIN"];

    db.run(sql, params, function (err) {
      if (err) {
        console.error("\nErro ao criar admin:", err.message);
      } else {
        console.log(
          `\n✅ Administrador '${name}' criado com sucesso! ID: ${this.lastID}`
        );
      }
      db.close((err) => {
        if (err) console.error("Erro ao fechar o banco:", err.message);
      });
    });
  } catch (error) {
    console.error("Ocorreu um erro geral:", error);
    if (db) db.close();
    if (rl) rl.close();
  }
};

createAdmin();