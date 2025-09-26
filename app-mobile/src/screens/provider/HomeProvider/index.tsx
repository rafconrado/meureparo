import React from "react";
import { StatusBar } from "react-native";
import { Container, Title } from "./style";

const HomeProvider = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Title>Bem-vindo, prestador!</Title>
    </Container>
  );
};

export default HomeProvider;
