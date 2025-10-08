import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "../../types";

import {
  ProviderCard,
  ProviderImage,
  ProviderInfo,
  ProviderNameContainer,
  ProviderName,
  ProviderCategory,
  RatingContainer,
  RatingText,
  RatingReviewsText,
  ProviderPrice,
  ProviderBadge,
  BadgeText,
} from "./style";

interface FeaturedProviderCardProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
}

const ProviderBadgeComponent = ({ provider }: { provider: Provider }) => {
  if (provider.discount) {
    return (
      <ProviderBadge backgroundColor="#FF4444">
        <BadgeText>{provider.discount}% OFF</BadgeText>
      </ProviderBadge>
    );
  }
  if (provider.isPromoted) {
    return (
      <ProviderBadge>
        <BadgeText>DESTAQUE</BadgeText>
      </ProviderBadge>
    );
  }
  return null; // Não mostra nada se não houver desconto ou promoção
};

export const FeaturedProviderCard = React.memo(
  ({ provider, onPress }: FeaturedProviderCardProps) => {
    return (
      <ProviderCard onPress={() => onPress(provider)} activeOpacity={0.9}>
        <ProviderBadgeComponent provider={provider} />

        <ProviderImage source={provider.image} />
        <ProviderInfo>
          <ProviderNameContainer>
            <ProviderName>{provider.name}</ProviderName>
            {provider.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#4A90E2" />
            )}
          </ProviderNameContainer>

          <ProviderCategory>{provider.category}</ProviderCategory>

          {provider.rating > 0 && (
            <RatingContainer>
              <Ionicons name="star" size={14} color="#FFB800" />
              <RatingText>{provider.rating.toFixed(1)}</RatingText>
              <RatingReviewsText>
                ({provider.reviews || 0} avaliações)
              </RatingReviewsText>
            </RatingContainer>
          )}

          <ProviderPrice>{provider.price}</ProviderPrice>
        </ProviderInfo>
      </ProviderCard>
    );
  }
);
