import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ClientStackParamList } from "../../../@types/navigation";
import { Provider, Category, Promo, Partner } from "../../../types";

export type HomeClientScreenProps = NativeStackScreenProps<
  ClientStackParamList,
  "HomeClient"
>;

export interface ApiData {
  providers: Provider[];
  categories: Category[];
  promos: Promo[];
  partners: Partner[];
}

export interface HomeClientState extends ApiData {
  isLoading?: boolean;
}
