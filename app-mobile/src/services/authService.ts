import axios from "axios";

interface RegisterDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  comoFicouSabendo: string;
  userType: "client" | "provider";
}

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  userType: "client" | "provider";
  token: string;
}

export async function register(data: RegisterDTO): Promise<LoginResponse> {
  console.log("authService.register chamado com:", data);

  try {
    const normalizedEmail = data.email.trim().toLowerCase();

    const response = await axios.post(
      "http://192.168.0.5:3000/auth/register",
      {
        ...data,
        email: normalizedEmail,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Erro ao registrar usuário"
    );
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    const response = await axios.post("http://192.168.0.5:3000/auth/login", {
      email: normalizedEmail,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Erro ao logar:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
  }
}
