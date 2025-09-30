// src/components/ClientHeader/index.tsx

import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Container, AvatarButton } from "./style";

export function ClientHeader() {
  const navigation = useNavigation();

  return (
    <Container>
      <AvatarButton onPress={() => navigation.navigate("Perfil" as never)}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/156972984?v=4",
          }}
          style={{ width: 36, height: 36, borderRadius: 18 }}
        />
      </AvatarButton>
    </Container>
  );
}
