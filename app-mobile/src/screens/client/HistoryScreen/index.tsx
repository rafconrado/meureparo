import React from "react";
// import { HistoryScreenProps } from "./types"; // Pronto para uso futuro
import { Container, CenterContainer, Title, Subtitle } from "./styles";

export function HistoryScreen() {
  return (
    <Container>
      <CenterContainer>
        <Title>Histórico de Serviços</Title>
        <Subtitle>Seu histórico de contratações aparecerá aqui.</Subtitle>
      </CenterContainer>
    </Container>
  );
}
