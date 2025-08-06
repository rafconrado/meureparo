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
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  size = 20,
  style,
}) => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginCliente" }],
      });
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
