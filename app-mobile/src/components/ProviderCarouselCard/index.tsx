import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ServiceCard,
  ServiceTitle,
  ProviderCategory,
  RatingContainer,
  RatingText,
  ServiceFromText,
  ServicePrice,
  ServiceButton,
  ServiceButtonText,
} from "./style";

interface ProviderCarouselCardProps {
  provider: any;
  onPress: (provider: any) => void;
  cardWidth: number;
}

export const ProviderCarouselCard = React.memo(
  ({ provider, onPress, cardWidth }: ProviderCarouselCardProps) => {
    return (
      <ServiceCard style={{ width: cardWidth, marginRight: 8 }}>
        {provider.isVerified && (
          <View
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 1,
              backgroundColor: "#FFF",
              borderRadius: 12,
              padding: 4,
              elevation: 2,
            }}
          >
            <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
          </View>
        )}

        <View
          style={{
            width: "100%",
            height: 140,
            backgroundColor: "#f0f0f0",
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Ionicons name="image-outline" size={40} color="#cccccc" />
        </View>

        <ServiceTitle numberOfLines={1}>{provider.providerName}</ServiceTitle>
        <ProviderCategory numberOfLines={1}>
          {provider.category}
        </ProviderCategory>

        {provider.rating > 0 && provider.reviews > 0 && (
          <RatingContainer style={{ marginTop: 6, marginBottom: 4 }}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <RatingText>
              {provider.rating.toFixed(1)} • {provider.reviews} avaliações
            </RatingText>
          </RatingContainer>
        )}

        <ServiceFromText>A partir de</ServiceFromText>
        <ServicePrice>R$ {provider.price}</ServicePrice>

        <ServiceButton activeOpacity={0.8} onPress={() => onPress(provider)}>
          <ServiceButtonText>Ver Anúncio</ServiceButtonText>
        </ServiceButton>
      </ServiceCard>
    );
  }
);
