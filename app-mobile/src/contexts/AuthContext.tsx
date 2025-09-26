import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Importe seus serviços de API
import {
  loginClient,
  loginProvider,
  registerClient,
  registerProvider as registerProviderService,
  updateUser as updateUserService,
} from "../services/authService"; // Verifique o caminho

import {
  UserData,
  RegisterClientDTO,
  RegisterProviderDTO,
  UpdateUserData as UpdateUserDTO, // Renomeado para evitar conflito
} from "../@types/auth"; // Verifique o caminho

// Interface para as credenciais de login
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserData | null;
  userType: "client" | "provider" | null;
  loading: boolean;
  signIn(
    credentials: LoginCredentials,
    userType: "client" | "provider"
  ): Promise<void>;
  signOut(): void;
  register(data: RegisterClientDTO): Promise<void>;
  registerProvider(data: RegisterProviderDTO): Promise<void>;
  updateUser(data: UpdateUserDTO): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<"client" | "provider" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@app:user");
      const storagedUserType = await AsyncStorage.getItem("@app:userType");

      if (storagedUser && storagedUserType) {
        setUser(JSON.parse(storagedUser));
        setUserType(storagedUserType as "client" | "provider");
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // Função interna para salvar o estado de autenticação
  async function setAuthState(data: UserData, type: "client" | "provider") {
    setUser(data);
    setUserType(type);
    await AsyncStorage.setItem("@app:user", JSON.stringify(data));
    await AsyncStorage.setItem("@app:userType", type);
  }

  // 2. CONECTADO: Função signIn agora chama a API
  async function signIn(
    credentials: LoginCredentials,
    type: "client" | "provider"
  ) {
    try {
      const loginFunction = type === "client" ? loginClient : loginProvider;
      const apiResponse = await loginFunction(
        credentials.email,
        credentials.password
      );

      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };
      await setAuthState(userDataWithToken, type);
    } catch (error) {
      console.error("Erro no contexto de signIn:", error);
      throw error;
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      "@app:user",
      "@app:userType",
      "@app:token",
    ]);
    setUser(null);
    setUserType(null);
  }

  // 3. CONECTADO: Funções de registro já usavam o service, agora usam a função interna
  async function register(data: RegisterClientDTO) {
    try {
      const apiResponse = await registerClient(data);
      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };
      await setAuthState(userDataWithToken, "client");
    } catch (error) {
      console.error("Erro no contexto de registro do cliente:", error);
      throw error;
    }
  }

  async function registerProvider(data: RegisterProviderDTO) {
    try {
      const apiResponse = await registerProviderService(data);
      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };
      await setAuthState(userDataWithToken, "provider");
    } catch (error) {
      console.error("Erro no contexto de registro do prestador:", error);
      throw error;
    }
  }

  // 4. CONECTADO: updateUser agora chama a API e atualiza o estado local
  async function updateUser(data: UpdateUserDTO) {
    try {
      if (!user) throw new Error("Não há usuário logado para atualizar.");

      // Chama a API para atualizar o usuário no banco de dados
      const updatedUserFromApi = await updateUserService(data);

      // Atualiza o estado local e o AsyncStorage
      const updatedSessionUser = {
        ...user, // Mantém o token e outras infos da sessão
        ...updatedUserFromApi, // Atualiza com os novos dados retornados pela API
      };

      setUser(updatedSessionUser);
      await AsyncStorage.setItem(
        "@app:user",
        JSON.stringify(updatedSessionUser)
      );

      console.log("<- [CONTEXTO] Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(
        "### ERRO no CONTEXTO ao tentar atualizar o perfil ###",
        error
      );
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loading,
        signIn,
        signOut,
        register,
        updateUser,
        registerProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
