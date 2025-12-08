import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderStackParamList } from "../../../@types/navigation";

export interface AdFromApi {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  providerId: number;
  imageUrl?: string;
}

export interface Ad extends Omit<AdFromApi, "categoryId"> {
  categoryId: number;
  category: string;
}

export interface AdFormData {
  id?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string | null;
}

export type AdsProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "AdsProviderScreen"
>;
