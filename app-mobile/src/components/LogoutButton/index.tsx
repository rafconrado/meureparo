import React from "react";
import {
  TouchableOpacity,
  Text,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/navigation";

import { styles } from "./style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LogoutButtonProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  userType?: "client" | "provider"; // para identificar o tipo
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  size = 20,
  style,
  userType = "client",
}) => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut();

      if (userType === "client") {
        navigation.reset({
          index: 1,
          routes: [
            { name: "Selection" as never },
            { name: "LoginCliente" as never },
          ],
        });
      } else if (userType === "provider") {
        navigation.reset({
          index: 1,
          routes: [
            { name: "Selection" as never },
            { name: "LoginProvider" as never },
          ],
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleLogout}>
      <Feather name="log-out" size={size} color="#DF692B" />
      <Text style={[styles.text, { fontSize: size * 0.8 }]}>Sair</Text>
    </TouchableOpacity>
  );
};
