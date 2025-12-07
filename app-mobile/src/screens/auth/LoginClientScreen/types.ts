import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ClientStackParamList } from "../../../@types/navigation";

export interface LoginCredentials {
  email: string;
  password: string;
}

export type LoginClientNavigationProp = NativeStackNavigationProp<
  ClientStackParamList,
  "LoginClient"
>;

export type LoginClientRouteProp = RouteProp<
  ClientStackParamList,
  "LoginClient"
>;
