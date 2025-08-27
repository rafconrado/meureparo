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

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Meu Perfil</Title>

      <Card>
        <Label>Nome:</Label>
        <Value>Rafael Conrado</Value>

        <Label>E-mail:</Label>
        <Value>rafconradoo@gmail.com</Value>

        <Label>Tipo de Usuário:</Label>
        <Value>Cliente / Prestador</Value>
      </Card>

      <Button onPress={signOut}>
        <ButtonText>Sair da conta</ButtonText>
      </Button>
    </Container>
  );
}
