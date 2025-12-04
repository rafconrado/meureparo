import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// --- Interfaces de DTO (Data Transfer Object) - O que vem no req.body ---

export interface IRegisterClientDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  comoFicouSabendo?: string;
}

export interface IRegisterProviderDTO {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual?: string;
  email: string;
  password: string;
  phone: string;
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
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IUpdateProfileDTO {
  name: string;
  email: string;
}

export interface IRegisterAdminDTO {
  name: string;
  email: string;
  password: string;
}

// --- Interfaces de Banco de Dados ---

export interface IDbUser {
  ID: number;
  NOME?: string;            
  NOME_FANTASIA?: string;   
  EMAIL: string;
  SENHA: string;
  ROLE: string;
}

export interface IUserPayload extends JwtPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}