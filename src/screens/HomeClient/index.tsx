import React from "react";
import { StatusBar } from "react-native";
import { Container, Title } from "./style";

const HomeClient = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8EC" />
      <Title>Bem-vindo, cliente!</Title>
    </Container>
  );
};

export default HomeClient;
