import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";
import { ClientNavigationProp } from "../../@types/navigation";
import { ClientHeaderProps } from "./types";
import { Container, AvatarButton, Avatar } from "./styles";

const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/156972984?v=4";

export function ClientHeader({ avatarUrl, onAvatarPress }: ClientHeaderProps) {
  const { user } = useAuth();
  const navigation = useNavigation<ClientNavigationProp>();

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else {
      navigation.navigate("ProfileScreen");
    }
  };

  const imageUri = avatarUrl || user?.avatarUrl || DEFAULT_AVATAR;

  return (
    <Container>
      <AvatarButton onPress={handleAvatarPress} activeOpacity={0.7}>
        <Avatar source={{ uri: imageUri }} />
      </AvatarButton>
    </Container>
  );
}
