import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "../../types";
import {
  CardContainer,
  ProviderImage,
  InfoContainer,
  ProviderName,
  ProviderSpecialty,
  RatingContainer,
  RatingText,
  ReviewCount,
  DiscountBadge,
  DiscountText,
} from "./style";

interface ProviderListItemProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
}
const Rating = ({ rating, reviews }: { rating?: number; reviews?: number }) => {
  if (!rating || rating === 0) {
    return null;
  }

  return (
    <RatingContainer>
      <Ionicons name="star" size={16} color="#FFD700" />
      <RatingText>{rating.toFixed(1)}</RatingText>
      <ReviewCount>({reviews || 0} avaliações)</ReviewCount>
    </RatingContainer>
  );
};

export const ProviderListItem = React.memo(
  ({ provider, onPress }: ProviderListItemProps) => {
    return (
      <CardContainer onPress={() => onPress(provider)} activeOpacity={0.8}>
        <ProviderImage
          source={{
            uri: provider.image || `https://i.pravatar.cc/150?u=${provider.id}`,
          }}
        />
        <InfoContainer>
          <ProviderName>{provider.title}</ProviderName>
          <ProviderSpecialty>{provider.providerName}</ProviderSpecialty>
          <Rating rating={provider.rating} reviews={provider.reviews} />
        </InfoContainer>

        {(provider.discount || 0) > 0 && (
          <DiscountBadge>
            <DiscountText>{provider.discount}% OFF</DiscountText>
          </DiscountBadge>
        )}
      </CardContainer>
    );
  }
);
