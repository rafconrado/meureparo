export interface IProvider {
  id: number;
  razaoSocial?: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  senha?: string;
  telefone: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  descricaoEmpresa?: string; 
  role: string;
}

export interface ICreateProviderDTO {
  name: string; 
  cnpj: string;
  email: string;
  password: string;
  phone: string;
  servico?: string; 
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}