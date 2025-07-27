import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  RegisterClient: undefined;
  RegisterClientStep2: {
    name: string;
    cpf: string;
    email: string;
    password: string;
  };
};

export type RegisterClientStep2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterClientStep2"
>;

export type RegisterClientStep2RouteProp = RouteProp<
  RootStackParamList,
  "RegisterClientStep2"
>;
