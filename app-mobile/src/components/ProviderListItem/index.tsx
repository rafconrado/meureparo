import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "../../types";
import theme from "../../theme";
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
} from "./style";

interface ProviderListItemProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (provider: Provider) => void;
}

const Rating = ({ rating, reviews }: { rating?: number; reviews?: number }) => {
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
    const isPopular = (provider.reviews || 0) > 50;

    return (
      <CardWrapper>
        <CardContainer onPress={() => onPress(provider)} activeOpacity={0.85}>
          <ImageWrapper>
            <ProviderImage
              source={{
                uri:
                  provider.image ||
                  `https://i.pravatar.cc/150?u=${provider.id}`,
              }}
            />
            <BadgeOverlay>
              {isPopular && (
                <PopularBadge>
                  <Ionicons name="flame" size={11} color={theme.COLORS.WHITE} />
                  <PopularText>Popular</PopularText>
                </PopularBadge>
              )}

              {(provider.discount || 0) > 0 && (
                <DiscountBadge>
                  <DiscountText>{provider.discount}% OFF</DiscountText>
                </DiscountBadge>
              )}
            </BadgeOverlay>

            {onToggleFavorite && (
              <FavButton
                onPress={() => onToggleFavorite(provider)}
                activeOpacity={0.6}
              >
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

ProviderListItem.displayName = "ProviderListItem";
