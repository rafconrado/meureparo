import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";
import { AuthNavigationProp } from "../../@types/navigation";
import { LogoutButtonProps } from "./types";
import { styles } from "./styles";

const DEFAULT_SIZE = 20;
const DEFAULT_USER_TYPE = "client";
const ICON_NAME = "log-out";
const ICON_COLOR = "#DF692B";

export const LogoutButton = ({
  size = DEFAULT_SIZE,
  style,
  userType = DEFAULT_USER_TYPE,
  onLogoutSuccess,
  onLogoutError,
}: LogoutButtonProps) => {
  const { signOut } = useAuth();
  const navigation = useNavigation<AuthNavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut();

      const loginRoute =
        userType === "client" ? "LoginCliente" : "LoginProvider";

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: loginRoute }],
        })
      );

      onLogoutSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");

      onLogoutError?.(error as Error);
    }
  };

  const textSize = size * 0.8;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleLogout}
      activeOpacity={0.7}
    >
      <Feather name={ICON_NAME} size={size} color={ICON_COLOR} />
      <Text style={[styles.text, { fontSize: textSize }]}>Sair</Text>
    </TouchableOpacity>
  );
};
