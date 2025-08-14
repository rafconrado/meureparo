import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ButtonContainer } from "./style";

export interface BackButtonProps {
  color?: string;
  size?: number;
  onPress?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  color = "#ffffff",
  size = 24,
}) => {
  const navigation = useNavigation();

  return (
    <ButtonContainer onPress={() => navigation.goBack()}>
      <Feather name="arrow-left" size={size} color={color} />
    </ButtonContainer>
  );
};
