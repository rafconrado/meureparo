import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// ATUALIZADO: Importaremos duas funções de registro do seu serviço
import {
  registerClient as registerClientService,
  registerProvider as registerProviderService,
} from "../services/authService";

interface UserData {
  name: string;
  email: string;
  token: string;
}

export type UserType = "client" | "provider";

// DTO ANTIGO FOI SEPARADO EM DOIS

// NOVO DTO: Apenas para o cadastro de Cliente
export interface RegisterClientDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  comoFicouSabendo: string;
  userType: "client"; // Tipo fixo para garantir a consistência
}

// NOVO DTO: Apenas para o cadastro de Prestador
export interface RegisterProviderDTO {
  name: string;
  cnpj: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  servico: string;
  userType: "provider"; // Tipo fixo
}

// ATUALIZADO: A interface do contexto agora tem duas funções de registro
interface AuthContextData {
  user: UserData | null;
  userType: UserType | null;
  loading: boolean;
  signIn: (data: UserData, type: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  registerClient: (data: RegisterClientDTO) => Promise<void>;
  registerProvider: (data: RegisterProviderDTO) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@app:user");
        const storedType = await AsyncStorage.getItem("@app:userType");
        if (storedUser && storedType) {
          setUser(JSON.parse(storedUser));
          setUserType(storedType as UserType);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function signIn(data: UserData, type: UserType) {
    try {
      setUser(data);
      setUserType(type);
      await AsyncStorage.setItem("@app:user", JSON.stringify(data));
      await AsyncStorage.setItem("@app:userType", type);
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
      throw new Error("Falha ao salvar dados do usuário localmente.");
    }
  }

  async function signOut() {
    setUser(null);
    setUserType(null);
    try {
      await AsyncStorage.removeItem("@app:user");
      await AsyncStorage.removeItem("@app:userType");
    } catch (error) {
      console.error("Erro ao remover dados do AsyncStorage:", error);
    }
  }

  // NOVA FUNÇÃO: Específica para registrar clientes
  async function registerClient(data: RegisterClientDTO) {
    try {
      const newUser = await registerClientService(data);
      await signIn(newUser, data.userType); // Faz o login automático após o cadastro
    } catch (error: any) {
      console.error("Erro ao registrar cliente:", error.message || error);
      throw new Error(error.message || "Não foi possível concluir o cadastro.");
    }
  }

  // NOVA FUNÇÃO: Específica para registrar prestadores
  async function registerProvider(data: RegisterProviderDTO) {
    try {
      const newUser = await registerProviderService(data);
      await signIn(newUser, data.userType); // Faz o login automático após o cadastro
    } catch (error: any) {
      console.error("Erro ao registrar prestador:", error.message || error);
      throw new Error(error.message || "Não foi possível concluir o cadastro.");
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
        registerClient, // Exporta a nova função
        registerProvider, // Exporta a nova função
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
