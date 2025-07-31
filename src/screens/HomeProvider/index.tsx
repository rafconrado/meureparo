import React from "react";
import { StatusBar } from "react-native";
import { Container, Title } from "./style";

import { BackButton } from "../../components/BackButton";

const HomeProvider = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8EC" />
      <BackButton color="#000" />
      <Title>Bem-vindo, prestador!</Title>
    </Container>
  );
};

export default HomeProvider;
