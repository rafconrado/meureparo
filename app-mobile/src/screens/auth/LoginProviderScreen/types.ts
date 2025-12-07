import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ProviderStackParamList } from "../../../@types/navigation"; 

export interface LoginProviderCredentials {
  email: string;
  password: string;
}

export type LoginProviderNavigationProp = NativeStackNavigationProp<
  ProviderStackParamList,
  "LoginProvider"
>;

export type LoginProviderRouteProp = RouteProp<
  ProviderStackParamList,
  "LoginProvider"
>;