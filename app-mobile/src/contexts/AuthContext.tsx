import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { registerClient } from "../services/authService";
import { UserData, RegisterClientDTO } from "../@types/auth";

interface AuthContextData {
  user: UserData | null;
  loading: boolean;
  signIn(credentials: any, userType: string): Promise<void>;
  signOut(): void;
  // 2. ADICIONE A FUNÇÃO REGISTER À INTERFACE
  register(data: RegisterClientDTO): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@app:user");
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // Sua função de login existente
  async function signIn(data: UserData, userType: string) {
    setUser(data);
    await AsyncStorage.setItem("@app:user", JSON.stringify(data));
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  // 3. IMPLEMENTE A FUNÇÃO REGISTER
  async function register(data: RegisterClientDTO) {
    try {
      // Chama o serviço de API para criar o usuário no backend
      const apiResponse = await registerClient(data);

      // Após o sucesso, formata os dados para o padrão do app
      const userData = {
        ...apiResponse.user,
        token: apiResponse.token,
      };

      // Efetua o login automaticamente para o usuário não precisar digitar tudo de novo
      await signIn(userData, "client");
    } catch (error) {
      console.error("Erro no contexto de registro:", error);
      // Relança o erro para que a tela de cadastro possa mostrá-lo ao usuário
      throw error;
    }
  }

  return (
    // 4. FORNEÇA A FUNÇÃO REGISTER NO VALUE DO PROVIDER
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        register,
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
