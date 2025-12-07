export interface ProviderCarouselData {
  id: string;
  providerName: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  isVerified?: boolean;
  image?: string;
}

export interface ProviderCarouselCardProps {
  provider: ProviderCarouselData;
  onPress: (provider: ProviderCarouselData) => void;
  cardWidth: number;
}
