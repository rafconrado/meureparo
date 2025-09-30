import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from '../../../../types';
import {
    ProviderCard,
    ProviderImage,
    ProviderInfo,
    ProviderName,
    ProviderCategory,
    RatingContainer,
    RatingText,
    ProviderPrice,
    ProviderBadge,
    BadgeText,
} from '../style';

interface FeaturedProviderCardProps {
    provider: Provider;
    onPress: (provider: Provider) => void;
}

export const FeaturedProviderCard = React.memo(({ provider, onPress }: FeaturedProviderCardProps) => {
    return (
        <ProviderCard onPress={() => onPress(provider)} activeOpacity={0.9}>
            {provider.discount && (
                <ProviderBadge style={{ backgroundColor: "#FF4444" }}>
                    <BadgeText>{provider.discount}% OFF</BadgeText>
                </ProviderBadge>
            )}
            {provider.isPromoted && !provider.discount && (
                <ProviderBadge>
                    <BadgeText>DESTAQUE</BadgeText>
                </ProviderBadge>
            )}
            <ProviderImage source={provider.image} />
            <ProviderInfo>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <ProviderName>{provider.name}</ProviderName>
                    {provider.isVerified && (
                        <Ionicons name="checkmark-circle" size={16} color="#4A90E2" />
                    )}
                </View>
                <ProviderCategory>{provider.category}</ProviderCategory>
                <RatingContainer>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <RatingText>{provider.rating}</RatingText>
                    <RatingText style={{ color: "#999" }}>({provider.reviews})</RatingText>
                </RatingContainer>
                <ProviderPrice>{provider.price}</ProviderPrice>
            </ProviderInfo>
        </ProviderCard>
    );
});