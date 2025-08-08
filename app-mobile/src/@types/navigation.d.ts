// src/@types/navigation.d.ts

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  Selection: undefined;
  LoginCliente: undefined;
  LoginProvider: undefined;
  RegisterClient: undefined;
  RegisterProvider: undefined;
  RegisterClientStep2: {
    name: string;
    cpf: string;
    email: string;
    password: string;
  };
  HomeClient: undefined;
};

export type RegisterClientStep2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RegisterClientStep2"
>;

export type RegisterClientStep2RouteProp = RouteProp<
  RootStackParamList,
  "RegisterClientStep2"
>;
