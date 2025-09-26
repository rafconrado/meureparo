import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";

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
} from "./style";

const defaultAvatar = "https://avatars.githubusercontent.com/u/156972984?v=4";

interface ProviderHeaderProps {
  onActionPress?: () => void;
  actionIcon?: keyof typeof Feather.glyphMap;
}

export function ProviderHeader({
  onActionPress,
  actionIcon,
}: ProviderHeaderProps) {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    navigation.navigate("Perfil" as never);
  };

  return (
    <Container>
      <Content>
        <UserInfo>
          <AvatarButton onPress={handleProfileNavigation}>
            <Avatar
              source={{
                uri: user?.avatarUrl || defaultAvatar,
              }}
            />
          </AvatarButton>
          <TextContainer>
            <Greeting>Bem-vindo,</Greeting>
            <UserName>{user?.name || "Prestador"}</UserName>
          </TextContainer>
        </UserInfo>

        {onActionPress && actionIcon && (
          <ActionButton onPress={onActionPress}>
            <Feather name={actionIcon} size={26} color="#ffffff" />
          </ActionButton>
        )}
      </Content>
    </Container>
  );
}
