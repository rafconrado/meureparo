import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { register as registerService } from "../services/authService";

interface UserData {
  name: string;
  email: string;
  token: string;
}

type UserType = "client" | "provider";

interface AuthContextData {
  user: UserData | null;
  userType: UserType | null;
  loading: boolean;
  signIn: (data: UserData, type: UserType) => Promise<void>;
  signOut: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    type: UserType
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem("@app:user");
      const storedType = await AsyncStorage.getItem("@app:userType");
      if (storedUser && storedType) {
        setUser(JSON.parse(storedUser));
        setUserType(storedType as UserType);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  async function signIn(data: UserData, type: UserType) {
    setUser(data);
    setUserType(type);
    await AsyncStorage.setItem("@app:user", JSON.stringify(data));
    await AsyncStorage.setItem("@app:userType", type);
  }

  async function signOut() {
    setUser(null);
    setUserType(null);
    await AsyncStorage.removeItem("@app:user");
    await AsyncStorage.removeItem("@app:userType");
  }

  async function register(
    name: string,
    email: string,
    password: string,
    type: UserType
  ) {
    console.log("AuthContext.register foi chamado com:", { name, email, type });
    const newUser = await registerService({ name, email, password });
    await signIn(newUser, type);
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
