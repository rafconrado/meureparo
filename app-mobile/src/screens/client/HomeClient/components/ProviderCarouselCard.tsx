import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from '../../../../types';
import {
  ServiceCard,
  ServiceImage,
  ServiceTitle,
  ProviderCategory,
  RatingContainer,
  RatingText,
  ServiceFromText,
  ServicePrice,
  ServiceButton,
  ServiceButtonText,
} from '../style';

interface ProviderCarouselCardProps {
  provider: Provider;
  onPress: (provider: Provider) => void;
}

export const ProviderCarouselCard = React.memo(({ provider, onPress }: ProviderCarouselCardProps) => {
  return (
    <ServiceCard>
      {provider.isVerified && (
        <View style={{ position: "absolute", top: 16, right: 16, zIndex: 1, backgroundColor: "#FFF", borderRadius: 12, padding: 4 }}>
          <Ionicons name="checkmark-circle" size={20} color="#4A90E2" />
        </View>
      )}
      <ServiceImage source={provider.image} resizeMode="cover" />
      <ServiceTitle>{provider.name}</ServiceTitle>
      <ProviderCategory>{provider.category}</ProviderCategory>
      <RatingContainer style={{ marginTop: 6 }}>
        <Ionicons name="star" size={16} color="#FFB800" />
        <RatingText>{provider.rating} • {provider.reviews} avaliações</RatingText>
      </RatingContainer>
      <ServiceFromText>A partir de</ServiceFromText>
      <ServicePrice>{provider.price}</ServicePrice>
      <ServiceButton
        activeOpacity={0.8}
        onPress={() => onPress(provider)}
      >
        <ServiceButtonText>Ver Anúncio</ServiceButtonText>
      </ServiceButton>
    </ServiceCard>
  );
});