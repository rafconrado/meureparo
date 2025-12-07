import React from "react";
// import { InvoicesClientsProps } from "./types"; // Deixei comentado para uso futuro se precisar navegar
import { Container, CenterContainer, Title, Subtitle } from "./styles";

export function InvoicesClients() {
  return (
    <Container>
      <CenterContainer>
        <Title>Meus Pedidos</Title>
        <Subtitle>Você ainda não realizou nenhum pedido.</Subtitle>
      </CenterContainer>
    </Container>
  );
}
