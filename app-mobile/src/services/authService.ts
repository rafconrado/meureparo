// src/services/authService.ts
import { v4 as uuidv4 } from "uuid";
import { findUserByEmail, saveUser } from "./userService";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export async function register({ name, email, password }: RegisterDTO) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("E-mail já cadastrado.");
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
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

  if (!user || user.password !== password) {
    throw new Error("E-mail ou senha inválidos.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: user.id,
  };
}
