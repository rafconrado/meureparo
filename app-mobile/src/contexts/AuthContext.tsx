import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  register as registerService,
} from "../services/authService";

interface UserData {
  name: string;
  email: string;
  token: string;
}

export type UserType = "client" | "provider";

export interface RegisterDTO {
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
  userType: UserType;
}

interface AuthContextData {
  user: UserData | null;
  userType: UserType | null;
  loading: boolean;
  signIn: (data: UserData, type: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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

  async function register(data: RegisterDTO) {
    try {
      console.log("AuthContext.register chamado com:", data);
      const newUser = await registerService(data);
      await signIn(newUser, data.userType);
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error.message || error);
      throw new Error(error.message || "Não foi possível concluir o cadastro.");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, userType, loading, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
