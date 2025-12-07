import React from "react";
import { MessagesScreenProps } from "./types"; // Importado para uso futuro
import { Container, CenterContainer, Title, Subtitle } from "./styles";

export function MessagesScreen() {
  return (
    <Container>
      <CenterContainer>
        <Title>Mensagens</Title>
        <Subtitle>Você ainda não tem conversas iniciadas.</Subtitle>
      </CenterContainer>
    </Container>
  );
}
