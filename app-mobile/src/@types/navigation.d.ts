import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";

// ========================================
// Auth Stack (Telas de autenticação)
// ========================================
export type AuthStackParamList = {
  Splash: undefined;
  SelectionScreen: undefined;
  LoginCliente: undefined;
  LoginProvider: undefined;
  RegisterClient: undefined;
  RegisterProvider: undefined;
  RegisterClientStep2: {
    name: string;
    cpf: string;
    email: string;
    password: string;
    phone: string;
  };
  RegisterProviderStep2: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
};

// ========================================
// Client Stack (Tabs do Cliente)
// ========================================
export type ClientStackParamList = {
  HomeClient: undefined;
  CategoryScreen: {
    categoryId: string;
    categoryName: string;
  };
  ProfileScreen: undefined;
  InvoicesClients: undefined;
  MessagesScreen: undefined;
  AdvertisementDetail: {
    adId: string;
  };
  HistoryScreen: undefined;
  LoginClient: undefined;
  RegisterClient: undefined;
  RegisterClientStep2: {
    name: string;
    cpf: string;
    email: string;
    password: string;
  };
};

// ========================================
// Provider Stack (Tabs do Prestador)
// ========================================
export type ProviderStackParamList = {
  HomeProvider: undefined;
  ProfileScreen: undefined;
  MessagesProviderScreen: undefined;
  FinanceProviderScreen: undefined;
  AdsProviderScreen: undefined;
  LoginProvider: undefined;
  RegisterProviderStep1: undefined;
  RegisterProviderStep2: {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    inscricaoEstadual?: string;
    email: string;
    password: string;
  };
  ProfileProvider: undefined;
  MessagesProvider: undefined;
  ChatDetail: {
    chatId: string;
    clientName: string;
  };
};

// ========================================
// Navigation Props
// ========================================

// Auth
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// Client
export type ClientNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ClientStackParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;

// Provider
export type ProviderNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ProviderStackParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;

// ========================================
// Route Props (para useRoute)
// ========================================
export type RegisterClientStep2RouteProp = RouteProp<
  AuthStackParamList,
  "RegisterClientStep2"
>;

export type RegisterProviderStep2RouteProp = RouteProp<
  AuthStackParamList,
  "RegisterProviderStep2"
>;

export type CategoryScreenRouteProp = RouteProp<
  ClientStackParamList,
  "CategoryScreen"
>;

// ========================================
// Screen Props (navigation + route juntos)
// ========================================
export type RegisterClientStep2ScreenProps = {
  navigation: AuthNavigationProp;
  route: RegisterClientStep2RouteProp;
};

export type CategoryScreenProps = {
  navigation: ClientNavigationProp;
  route: CategoryScreenRouteProp;
};
