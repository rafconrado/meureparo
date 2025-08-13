import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { findUserByEmail, saveUser } from "./userService";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export async function register({ name, email, password }: RegisterDTO) {
  console.log("authService.register foi chamado");

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    console.error("Erro: E-mail já existente.");
    throw new Error("E-mail já cadastrado.");
  }

  // Define o "custo" do hashing. 10 é um valor padrão e seguro.
  const saltRounds = 10;
  // Cria o hash seguro a partir da senha digitada.
  const hashedPassword = bcrypt.hashSync(password.trim(), saltRounds);

  const newUser = {
    id: uuidv4(),
    name,
    email: normalizedEmail,
    // Salva o hash no lugar da senha em texto puro.
    password: hashedPassword,
  };

  await saveUser(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: newUser.id,
  };
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);

  // A condição agora verifica se o usuário não existe OU se a senha digitada
  // não corresponde ao hash que está salvo no banco de dados.
  if (!user || !bcrypt.compareSync(password.trim(), user.password)) {
    throw new Error("E-mail ou senha inválidos.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: user.id,
  };
}
