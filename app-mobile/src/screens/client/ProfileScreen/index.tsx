import React from "react";
import { Alert } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Container,
  ContentContainer,
  Title,
  Card,
  Label,
  Value,
  Button,
  ButtonText,
} from "./styles";

export function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Erro", "Não foi possível fazer logout. Tente novamente.");
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Meu Perfil</Title>

        <Card>
          <Label>Nome:</Label>
          <Value>{user?.name || "Nome não disponível"}</Value>

          <Label>E-mail:</Label>
          <Value>{user?.email || "E-mail não disponível"}</Value>

          <Label>Tipo de Usuário:</Label>
          <Value>Cliente</Value>
        </Card>

        <Button onPress={handleLogout}>
          <ButtonText>Sair da conta</ButtonText>
        </Button>
      </ContentContainer>
    </Container>
  );
}
