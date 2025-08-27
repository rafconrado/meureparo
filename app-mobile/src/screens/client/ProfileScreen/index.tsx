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

export default function ProfileScreen() {
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

      <Button>
        <ButtonText>Sair da conta</ButtonText>
      </Button>
    </Container>
  );
}
