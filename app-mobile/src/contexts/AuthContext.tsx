import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { registerClient } from "../services/authService";
import { updateUserById } from "../services/userService";
import { UserData, RegisterClientDTO } from "../@types/auth";

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
      console.error("Erro no contexto de registro:", error);
      throw error;
    }
  }

  // --- FUNÇÃO DE ATUALIZAÇÃO CORRIGIDA ---
  async function updateUser(data: UpdateUserData) {
    try {
      if (!user) {
        throw new Error("Não há usuário logado para atualizar.");
      }

      // 1. Chama o serviço para persistir a mudança na lista principal de usuários
      await updateUserById(user.id, data);

      // 2. Cria um NOVO objeto de sessão, mesclando o usuário ATUAL (com token)
      //    com os NOVOS dados (name, email). Isso preserva o token.
      const updatedSessionUser = {
        ...user,
        ...data,
      };

      // 3. Atualiza o estado com o objeto de sessão completo e corrigido
      setUser(updatedSessionUser);

      // 4. Atualiza o AsyncStorage com o mesmo objeto de sessão completo
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
