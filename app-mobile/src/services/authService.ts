import axios from "axios";

import {
  RegisterClientDTO,
  RegisterProviderDTO,
} from "../contexts/AuthContext";

// A API base para evitar repetição
const api = axios.create({
  baseURL: "http://192.168.1.16:3000/api-backend", // Configure sua URL base aqui
});

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  userType: "client" | "provider";
  token: string;
}

// 2. Função específica para registrar CLIENTES
export async function registerClient(
  data: RegisterClientDTO
): Promise<LoginResponse> {
  console.log("authService.registerClient chamado com:", data);
  try {
    // Normalizar o email é uma ótima prática
    const normalizedEmail = data.email.trim().toLowerCase();

    // Chama o endpoint específico para clientes
    const response = await api.post("/auth/register/client", {
      ...data,
      email: normalizedEmail,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao registrar cliente:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao registrar cliente"
    );
  }
}

// 3. Função específica para registrar PRESTADORES
export async function registerProvider(
  data: RegisterProviderDTO
): Promise<LoginResponse> {
  console.log("authService.registerProvider chamado com:", data);
  try {
    const normalizedEmail = data.email.trim().toLowerCase();

    // Chama o endpoint específico para prestadores
    const response = await api.post("/auth/register/provider", {
      ...data,
      email: normalizedEmail,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao registrar prestador:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao registrar prestador"
    );
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    const response = await api.post("/auth/login", {
      email: normalizedEmail,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao logar:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
}
