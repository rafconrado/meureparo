import React from "react";
import { TouchableOpacity } from "react-native";

import { PartnerItemProps } from "./types";
import { PartnerContainer, PartnerLogo, PartnerName } from "./styles";

export const PartnerItem = React.memo(
  ({ partner, onPress }: PartnerItemProps) => {
    const handlePress = () => {
      onPress?.(partner);
    };

    const Container = onPress ? TouchableOpacity : PartnerContainer;

    return (
      <Container
        onPress={onPress ? handlePress : undefined}
        activeOpacity={0.7}
      >
        <PartnerLogo source={partner.logo} resizeMode="contain" />
        <PartnerName>{partner.name}</PartnerName>
      </Container>
    );
  }
);

PartnerItem.displayName = "PartnerItem";
