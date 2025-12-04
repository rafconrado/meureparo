import readline from 'readline';
import bcrypt from 'bcryptjs';
import { db } from './src/config/database'; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createAdmin = async () => {
  try {
    console.log("--- Criação de Novo Administrador ---");

    const name = await new Promise<string>((resolve) =>
      rl.question("Nome do admin: ", resolve)
    );
    const email = await new Promise<string>((resolve) =>
      rl.question("Email do admin: ", resolve)
    );

    const HIDE_PASS_SYMBOL = "*";
    
    const onDataHandler = (char: Buffer) => {
      const charStr = char.toString();
      switch (charStr) {
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

    const password = await new Promise<string>((resolve) =>
      rl.question("Senha do admin: ", resolve)
    );

    process.stdin.removeListener("data", onDataHandler);
    process.stdout.write("\n");
    rl.close();

    if (!name || !email || !password) {
      console.error("\nTodos os campos são obrigatórios.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = "INSERT INTO ADMINS (NOME, EMAIL, SENHA, ROLE) VALUES (?, ?, ?, ?)";
    const params = [name, email, hashedPassword, "ADMIN"];

    db.run(sql, params, function (this: any, err: Error | null) {
      if (err) {
        console.error("\nErro ao criar admin:", err.message);
      } else {
        console.log(
          `\n✅ Administrador '${name}' criado com sucesso! ID: ${this.lastID}`
        );
      }
      db.close((err: Error | null) => {
        if (err) console.error("Erro ao fechar o banco:", err.message);
      });
    });

  } catch (error) {
    console.error("Ocorreu um erro geral:", error);
    rl.close();
  }
};

createAdmin();