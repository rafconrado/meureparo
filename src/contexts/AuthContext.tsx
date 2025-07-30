// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await AsyncStorage.getItem("@app:user");
      if (storedUser) setUser(JSON.parse(storedUser));
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // simula um login com backend
      if (email === "teste@exemplo.com" && password === "senha123") {
        const loggedUser = { name: "Usuário Teste", email };
        setUser(loggedUser);
        await AsyncStorage.setItem("@app:user", JSON.stringify(loggedUser));
      } else {
        Alert.alert("Erro", "E-mail ou senha inválidos");
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível fazer login");
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@app:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
