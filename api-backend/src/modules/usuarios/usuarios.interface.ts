export interface IClientSummary {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface IProviderSummary {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  servico?: string;
}

export interface IUsersResponse {
  clients: IClientSummary[];
  providers: IProviderSummary[];
}