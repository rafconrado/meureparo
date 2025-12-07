import React from "react";
import { Ionicons } from "@expo/vector-icons";

import theme from "../../theme";
import { ProviderListItemProps, RatingProps } from "./types";

import {
  CardContainer,
  CardWrapper,
  ImageWrapper,
  BadgeOverlay,
  ProviderImage,
  PopularBadge,
  PopularText,
  DiscountBadge,
  DiscountText,
  InfoContainer,
  HeaderRow,
  ProviderName,
  ProviderSpecialty,
  FooterRow,
  RatingContainer,
  RatingText,
  ReviewCount,
  FavButton,
} from "./styles";

const POPULAR_THRESHOLD = 50;
const DEFAULT_AVATAR_BASE_URL = "https://i.pravatar.cc/150?u=";

const Rating = ({ rating, reviews }: RatingProps) => {
  if (!rating || rating === 0) {
    return null;
  }

  return (
    <RatingContainer>
      <Ionicons name="star" size={14} color="#FFD700" />
      <RatingText>{rating.toFixed(1)}</RatingText>
      <ReviewCount>({reviews || 0})</ReviewCount>
    </RatingContainer>
  );
};

export const ProviderListItem = React.memo(
  ({
    provider,
    onPress,
    isFavorite = false,
    onToggleFavorite,
  }: ProviderListItemProps) => {
    const isPopular = (provider.reviews || 0) > POPULAR_THRESHOLD;
    const hasDiscount = (provider.discount || 0) > 0;
    const imageUri =
      provider.image || `${DEFAULT_AVATAR_BASE_URL}${provider.id}`;

    const handlePress = () => {
      onPress(provider);
    };

    const handleToggleFavorite = () => {
      onToggleFavorite?.(provider);
    };

    return (
      <CardWrapper>
        <CardContainer onPress={handlePress} activeOpacity={0.85}>
          <ImageWrapper>
            <ProviderImage source={{ uri: imageUri }} />

            <BadgeOverlay>
              {isPopular && (
                <PopularBadge>
                  <Ionicons name="flame" size={11} color={theme.COLORS.WHITE} />
                  <PopularText>Popular</PopularText>
                </PopularBadge>
              )}

              {hasDiscount && (
                <DiscountBadge>
                  <DiscountText>{provider.discount}% OFF</DiscountText>
                </DiscountBadge>
              )}
            </BadgeOverlay>

            {onToggleFavorite && (
              <FavButton onPress={handleToggleFavorite} activeOpacity={0.6}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={
                    isFavorite ? theme.COLORS.ORANGE_500 : theme.COLORS.GRAY_200
                  }
                />
              </FavButton>
            )}
          </ImageWrapper>

          <InfoContainer>
            <HeaderRow>
              <ProviderName numberOfLines={1}>{provider.title}</ProviderName>
            </HeaderRow>

            <ProviderSpecialty numberOfLines={1}>
              {provider.providerName}
            </ProviderSpecialty>

            <FooterRow>
              <Rating rating={provider.rating} reviews={provider.reviews} />
            </FooterRow>
          </InfoContainer>
        </CardContainer>
      </CardWrapper>
    );
  }
);
