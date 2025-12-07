// ==========================================
// USUÁRIO LOGADO (SESSÃO)
// ==========================================
export interface UserData {
  id: string | number;
  name: string;
  email: string;
  token: string;
  avatarUrl?: string;
  role: "client" | "provider" | "PRESTADORES" | "CLIENTES";
}

// ==========================================
// DTO DE REGISTRO - CLIENTE
// ==========================================
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

// ==========================================
// DTO DE REGISTRO - PRESTADOR
// ==========================================
export interface RegisterProviderDTO {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  password: string;
  phone: string;
  inscricaoEstadual?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  descricaoEmpresa?: string;
  logo?: string;
  comoFicouSabendo?: string;
  userType: "provider";
}

// ==========================================
// DTO DE ATUALIZAÇÃO
// ==========================================
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
  avatarUrl?: string;
}
