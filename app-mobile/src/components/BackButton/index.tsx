import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { BackButtonProps } from "./types";
import { ButtonContainer } from "./styles";

const DEFAULT_COLOR = "#ffffff";
const DEFAULT_SIZE = 24;

export const BackButton = ({
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
  onPress,
}: BackButtonProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <ButtonContainer onPress={handlePress} activeOpacity={0.7}>
      <Feather name="arrow-left" size={size} color={color} />
    </ButtonContainer>
  );
};
