import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import {
  Container,
  Title,
  Subtitle,
  OptionCard,
  ClientText,
  ProviderText,
} from "./style";

import { SelectionScreenNavigationProp } from "./types";

const SelectionScreen = () => {
  const navigation = useNavigation<SelectionScreenNavigationProp>();

  return (
    <Container>
      <Title>Como deseja acessar?</Title>
      <Subtitle>Para continuar, escolha seu perfil.</Subtitle>

      <Pressable
        onPress={() => navigation.navigate("LoginClient")}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
          width: "100%",
          alignItems: "center",
        })}
      >
        <OptionCard>
          <ClientText>Sou Cliente</ClientText>
          <FontAwesome name="user" size={42} color="#df692b" />
        </OptionCard>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("LoginProvider")}
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
          width: "100%",
          alignItems: "center",
        })}
      >
        <OptionCard>
          <ProviderText>Sou Prestador</ProviderText>
          <FontAwesome5 name="tools" size={42} color="#57b2c5" />
        </OptionCard>
      </Pressable>
    </Container>
  );
};

export default SelectionScreen;
