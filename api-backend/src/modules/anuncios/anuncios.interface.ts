export interface IAd {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  providerId: number;
  imageUrl?: string | null;
  rating?: number;
  reviews?: number;
  isVerified?: number; 
  isPromoted?: number; 
  discount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateAdDTO {
  title: string;
  description: string;
  price: number | string; 
  category: number | string;
}

export interface IUpdateAdDTO {
  title?: string;
  description?: string;
  price?: number | string;
  category?: number | string;
  rating?: number;
  reviews?: number;
  isVerified?: number;
  isPromoted?: number;
  discount?: number;
  imageUrl?: string;
}