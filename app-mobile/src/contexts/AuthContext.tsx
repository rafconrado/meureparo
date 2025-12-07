import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

// Services
import {
  loginClient,
  loginProvider,
  registerClient,
  registerProvider as registerProviderService,
  updateUser as updateUserService,
} from "../services/authService";

import {
  UserData,
  RegisterClientDTO,
  RegisterProviderDTO,
  UpdateUserData as UpdateUserDTO,
} from "../@types/auth";

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
        const parsedUser = JSON.parse(storagedUser);

        if (parsedUser.token) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${parsedUser.token}`;
        }

        setUser(parsedUser);
        setUserType(storagedUserType as "client" | "provider");
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  async function setAuthState(data: UserData, type: "client" | "provider") {
    setUser(data);
    setUserType(type);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    await AsyncStorage.setItem("@app:user", JSON.stringify(data));
    await AsyncStorage.setItem("@app:userType", type);
  }

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

      const fetchedUser = apiResponse.user;

      const roleMap: Record<string, string> = {
        CLIENTE: "client",
        PRESTADOR: "provider",
        client: "client",
        provider: "provider",
        ADMIN: "admin",
      };

      const userRole = roleMap[fetchedUser.role?.trim() || ""];

      // Segurança: Verifica se o usuário está tentando logar no app certo
      if (!userRole || userRole !== type) {
        throw new Error(
          `Esta conta não é de ${
            type === "client" ? "Cliente" : "Prestador"
          }. Verifique o app ou seu cadastro.`
        );
      }

      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };

      await setAuthState(userDataWithToken, type);
    } catch (error: any) {
      console.error("Erro no contexto de signIn:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Não foi possível realizar o login. Verifique suas credenciais.";

      throw new Error(message);
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove([
      "@app:user",
      "@app:userType",
      "@app:token",
    ]);

    delete api.defaults.headers.common["Authorization"];

    setUser(null);
    setUserType(null);
  }

  async function register(data: RegisterClientDTO) {
    try {
      const apiResponse = await registerClient(data);
      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };
      await setAuthState(userDataWithToken, "client");
    } catch (error: any) {
      console.error(
        "Erro no contexto de registro do cliente:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async function registerProvider(data: RegisterProviderDTO) {
    try {
      console.log("Enviando dados para API Provider:", data);

      const apiResponse = await registerProviderService(data);

      const userDataWithToken = {
        ...apiResponse.user,
        token: apiResponse.token,
      };
      await setAuthState(userDataWithToken, "provider");
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Erro no contexto de registro do prestador:", errorMsg);

      throw error;
    }
  }

  async function updateUser(data: UpdateUserDTO) {
    try {
      if (!user) throw new Error("Não há usuário logado para atualizar.");

      const updatedUserFromApi = await updateUserService(data);

      const updatedSessionUser = {
        ...user,
        ...updatedUserFromApi,
      };

      setUser(updatedSessionUser);
      await AsyncStorage.setItem(
        "@app:user",
        JSON.stringify(updatedSessionUser)
      );

      console.log("<- [CONTEXTO] Perfil atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
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
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
