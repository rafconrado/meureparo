import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  registerClient,
  registerProvider as registerProviderService,
} from "../services/authService";
import { updateUserById } from "../services/userService";
import {
  UserData,
  RegisterClientDTO,
  RegisterProviderDTO,
} from "../@types/auth";

interface UpdateUserData {
  name: string;
  email: string;
}

interface AuthContextData {
  user: UserData | null;
  userType: "client" | "provider" | null;
  loading: boolean;
  signIn(credentials: any, userType: "client" | "provider"): Promise<void>;
  signOut(): void;
  register(data: RegisterClientDTO): Promise<void>;
  registerProvider(data: RegisterProviderDTO): Promise<void>;
  updateUser(data: UpdateUserData): Promise<void>;
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

  async function signIn(data: UserData, type: "client" | "provider") {
    setUser(data);
    setUserType(type);
    await AsyncStorage.setItem("@app:user", JSON.stringify(data));
    await AsyncStorage.setItem("@app:userType", type);
  }

  async function signOut() {
    await AsyncStorage.multiRemove(["@app:user", "@app:userType"]);
    setUser(null);
    setUserType(null);
  }

  async function register(data: RegisterClientDTO) {
    try {
      const apiResponse = await registerClient(data);
      const userData = { ...apiResponse.user, token: apiResponse.token };
      await signIn(userData, "client");
    } catch (error) {
      console.error("Erro no contexto de registro do cliente:", error);
      throw error;
    }
  }

  async function registerProvider(data: RegisterProviderDTO) {
    try {
      const apiResponse = await registerProviderService(data);

      const userData = { ...apiResponse.user, token: apiResponse.token };

      await signIn(userData, "provider");
    } catch (error) {
      console.error("Erro no contexto de registro do prestador:", error);
      throw error;
    }
  }

  async function updateUser(data: UpdateUserData) {
    try {
      if (!user) {
        throw new Error("Não há usuário logado para atualizar.");
      }

      await updateUserById(user.id, data);

      const updatedSessionUser = {
        ...user,
        ...data,
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
        registerProvider, // <- Disponibilizada para a aplicação
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
