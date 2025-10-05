import api from "./api";
import { AxiosError } from "axios";
import {
  RegisterClientDTO,
  RegisterProviderDTO,
  UpdateUserData,
  UserData,
} from "./../@types/auth";

// Interface para a resposta da API de autenticação
interface ApiResponse {
  user: UserData;
  token: string;
  message?: string;
}

/**
 * Função genérica para tratar erros do Axios.
 * O tipo de retorno 'never' informa ao TypeScript que esta função SEMPRE lança um erro.
 */
const handleApiError = (error: unknown, defaultMessage: string): never => {
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    console.error(
      "### Erro da API ###:",
      JSON.stringify(axiosError.response.data, null, 2)
    );
  }

  const message = (axiosError.response?.data as any)?.message || defaultMessage;

  throw new Error(message);
};

// --- Funções de Serviço ---

export const registerClient = async (
  data: RegisterClientDTO
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/register/client", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Erro ao registrar cliente");
  }
};

export const registerProvider = async (
  data: RegisterProviderDTO
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/register/provider", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Erro ao registrar prestador");
  }
};

export const loginClient = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role: "client",
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "E-mail ou senha inválidos.");
  }
};

export const loginProvider = async (
  email: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
      role: "provider",
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "E-mail ou senha inválidos.");
  }
};

export const updateUser = async (data: UpdateUserData): Promise<UserData> => {
  try {
    const response = await api.put("/auth/profile", data);
    return response.data;
  } catch (error) {
    return handleApiError(error, "Não foi possível atualizar o perfil.");
  }
};
