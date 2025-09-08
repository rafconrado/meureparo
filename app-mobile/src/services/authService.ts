import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  RegisterClientDTO,
  RegisterProviderDTO,
  UpdateUserData,
} from "./../@types/auth";
// --- CONFIGURAÇÃO DA API ---
const api = axios.create({
  baseURL: "http://192.168.1.16:3000/api-backend/auth",
});

// --- INTERCEPTOR ---
api.interceptors.request.use(async (config) => {
  try {
    const storedUser = await AsyncStorage.getItem("@app:user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const token = userData?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    console.error("Erro no interceptor do Axios:", error);
    return Promise.reject(error);
  }
});

// --- INTERFACE DE RESPOSTA ---
interface ApiResponse {
  user: {
    id: string;
    name: string;
    email: string;
    userType: "client" | "provider";
  };
  token: string;
  message?: string;
}

// --- FUNÇÕES DE SERVIÇO ---

export async function registerClient(
  data: RegisterClientDTO
): Promise<ApiResponse> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();
    // ✅ ROTA CORRIGIDA: Sem o /auth no início
    const response = await api.post("/register/client", {
      ...data,
      email: normalizedEmail,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao registrar cliente"
    );
  }
}

export async function registerProvider(
  data: RegisterProviderDTO
): Promise<ApiResponse> {
  try {
    const normalizedEmail = data.email.trim().toLowerCase();

    const response = await api.post("/register/provider", {
      ...data,
      email: normalizedEmail,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Erro ao registrar prestador"
    );
  }
}

export async function loginClient(
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    const response = await api.post("/login/client", {
      email: normalizedEmail,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Usuário ou senha inválidos."
    );
  }
}

export async function loginProvider(
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    // ✅ ROTA CORRIGIDA: Sem o /auth no início
    const response = await api.post("/login/provider", {
      email: normalizedEmail,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Usuário ou senha inválidos."
    );
  }
}

export async function updateUser(
  data: UpdateUserData
): Promise<ApiResponse["user"]> {
  try {
    // ✅ ROTA CORRIGIDA: Sem o /auth no início
    const response = await api.put("/profile", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Não foi possível conectar ao servidor."
    );
  }
}
