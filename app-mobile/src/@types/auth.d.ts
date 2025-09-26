export interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  avatarUrl?: string;
  userType: "client" | "provider";
}

export interface RegisterClientDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string; // Complemento é opcional
  bairro: string;
  cidade: string;
  uf: string;
  comoFicouSabendo: string;
  userType: "client";
}

export interface RegisterProviderDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}
