import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";
import { ProviderNavigationProp } from "../../@types/navigation";

import {
  Container,
  Content,
  UserInfo,
  AvatarButton,
  Avatar,
  TextContainer,
  Greeting,
  UserName,
  ActionButton,
} from "./styles";

import { ProviderHeaderProps } from "./types";

const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/156972984?v=4";

export function ProviderHeader({
  onActionPress,
  actionIcon,
  defaultAvatarUrl = DEFAULT_AVATAR,
}: ProviderHeaderProps) {
  const { user } = useAuth();
  const navigation = useNavigation<ProviderNavigationProp>();

  const handleProfileNavigation = () => {
    navigation.navigate("ProfileScreen");
  };

  const avatarUrl = user?.avatarUrl || defaultAvatarUrl;
  const userName: string = user?.name || "Prestador";
  const shouldRenderActionButton: boolean = Boolean(
    onActionPress && actionIcon
  );

  return (
    <Container>
      <Content>
        <UserInfo>
          <AvatarButton
            onPress={handleProfileNavigation}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Ir para perfil"
            accessibilityHint="Navega para a tela de perfil"
          >
            <Avatar
              source={{ uri: avatarUrl }}
              accessible
              accessibilityLabel={`Foto de ${userName}`}
            />
          </AvatarButton>

          <TextContainer>
            <Greeting>Bem-vindo,</Greeting>
            <UserName numberOfLines={1}>{userName}</UserName>
          </TextContainer>
        </UserInfo>

        {shouldRenderActionButton && (
          <ActionButton
            onPress={onActionPress}
            activeOpacity={0.7}
            accessible
            accessibilityLabel="Botão de ação"
            accessibilityHint="Pressione para executar uma ação"
          >
            <Feather name={actionIcon!} size={26} color="#ffffff" />
          </ActionButton>
        )}
      </Content>
    </Container>
  );
}
