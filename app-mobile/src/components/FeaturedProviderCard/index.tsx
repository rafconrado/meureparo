import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { FeaturedProviderCardProps, ProviderBadgeProps } from "./types";
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
} from "./styles";

const BADGE_DISCOUNT_COLOR = "#FF4444";
const BADGE_DEFAULT_COLOR = "#ff8724";

const ProviderBadgeComponent = ({ provider }: ProviderBadgeProps) => {
  if (provider.discount) {
    return (
      <ProviderBadge backgroundColor={BADGE_DISCOUNT_COLOR}>
        <BadgeText>{provider.discount}% OFF</BadgeText>
      </ProviderBadge>
    );
  }

  if (provider.isPromoted) {
    return (
      <ProviderBadge backgroundColor={BADGE_DEFAULT_COLOR}>
        <BadgeText>DESTAQUE</BadgeText>
      </ProviderBadge>
    );
  }

  return null;
};

export const FeaturedProviderCard = React.memo(
  ({ provider, onPress }: FeaturedProviderCardProps) => {
    const hasRating = provider.rating > 0;

    const handlePress = () => {
      onPress(provider);
    };

    return (
      <ProviderCard onPress={handlePress} activeOpacity={0.9}>
        <ProviderBadgeComponent provider={provider} />

        <ProviderImage source={{ uri: provider.image }} />
        <ProviderInfo>
          <ProviderNameContainer>
            <ProviderName>{provider.name}</ProviderName>
            {provider.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#4A90E2" />
            )}
          </ProviderNameContainer>

          <ProviderCategory>{provider.category}</ProviderCategory>

          {hasRating && (
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
