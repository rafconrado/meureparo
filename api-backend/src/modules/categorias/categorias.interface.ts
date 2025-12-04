export interface ICategory {
  id: number;
  name: string;
  icon?: string | null;
  desativado?: string;
  createdAt?: string; 
  updatedAt?: string;
}

export interface ICreateCategoryDTO {
  name: string;
  icon?: string;
}

export interface IDbResult {
  changes?: number;
  id?: number;
}