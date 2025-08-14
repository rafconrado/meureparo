import React from "react";
import { StatusBar } from "react-native";
import { Container, Title } from "./style";
import { LogoutButton } from "../../components/LogoutButton";

const HomeClient = () => {
  return (
    <Container>
      <LogoutButton
        size={20}
        style={{ position: "absolute", top: 40, right: 20, zIndex: 10 }}
        userType="client"
      />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8EC" />
      <Title>Bem-vindo, cliente!</Title>
    </Container>
  );
};

export default HomeClient;
