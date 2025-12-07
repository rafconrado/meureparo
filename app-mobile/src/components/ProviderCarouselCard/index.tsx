import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { ProviderCarouselCardProps } from "./types";
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
  VerifiedBadge,
  ImagePlaceholder,
  RatingWrapper,
} from "./styles";

export const ProviderCarouselCard = React.memo(
  ({ provider, onPress, cardWidth }: ProviderCarouselCardProps) => {
    const hasRating = provider.rating > 0 && provider.reviews > 0;

    const handlePress = () => {
      onPress(provider);
    };

    return (
      <ServiceCard style={{ width: cardWidth, marginRight: 8 }}>
        {provider.isVerified && (
          <VerifiedBadge>
            <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
          </VerifiedBadge>
        )}

        <ImagePlaceholder>
          <Ionicons name="image-outline" size={40} color="#cccccc" />
        </ImagePlaceholder>

        <ServiceTitle numberOfLines={1}>{provider.providerName}</ServiceTitle>
        <ProviderCategory numberOfLines={1}>
          {provider.category}
        </ProviderCategory>

        {hasRating && (
          <RatingWrapper>
            <RatingContainer>
              <Ionicons name="star" size={16} color="#FFB800" />
              <RatingText>
                {provider.rating.toFixed(1)} • {provider.reviews} avaliações
              </RatingText>
            </RatingContainer>
          </RatingWrapper>
        )}

        <ServiceFromText>A partir de</ServiceFromText>
        <ServicePrice>R$ {provider.price}</ServicePrice>

        <ServiceButton activeOpacity={0.8} onPress={handlePress}>
          <ServiceButtonText>Ver Anúncio</ServiceButtonText>
        </ServiceButton>
      </ServiceCard>
    );
  }
);
