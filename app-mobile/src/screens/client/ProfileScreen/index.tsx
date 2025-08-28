import React from "react";
import {
  Container,
  Title,
  Card,
  Label,
  Value,
  Button,
  ButtonText,
} from "./style";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../@types/navigation";
import { Alert } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 1,
        routes: [
          { name: "Selection" as never },
          { name: "LoginCliente" as never },
        ],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Meu Perfil</Title>

      <Card>
        <Label>Nome:</Label>
        <Value>Rafael Conrado</Value>

        <Label>E-mail:</Label>
        <Value>rafconradoo@gmail.com</Value>

        <Label>Tipo de Usuário:</Label>
        <Value>Cliente</Value>
      </Card>

      <Button onPress={handleLogout}>
        <ButtonText>Sair da conta</ButtonText>
      </Button>
    </Container>
  );
}
