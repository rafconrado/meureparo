import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #0c0c0c;
  font-family: "Inter-Bold";
  margin: 32px 16px 4px 16px;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #6e6e6e;
  font-family: "Inter-Regular";
  margin: 0 16px 20px 16px;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

// Barra de Pesquisa
export const SearchContainer = styled.View`
  flex-direction: row;
  margin: 0 16px 24px 16px;
  background-color: #fff;
  border-radius: 14px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 14px 16px;
  font-family: "Inter-Regular";
  font-size: 15px;
  color: #0c0c0c;
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding: 12px 16px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
`;

// Categorias
export const CategoryCard = styled.TouchableOpacity`
  align-items: center;
  margin-right: 12px;
  width: 85px;
`;

export const CategoryIcon = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background-color: #f3f4f6;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

export const CategoryName = styled.Text`
  font-family: "Inter-Medium";
  font-size: 13px;
  color: #0c0c0c;
  text-align: center;
`;

// Cards de Promoção
export const PromoCard = styled(LinearGradient)`
  width: 300px;
  margin-right: 16px;
  padding: 20px;
  border-radius: 20px;
  elevation: 4;
  shadow-color: #667eea;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;

export const PromoContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PromoInfo = styled.View`
  flex: 1;
  margin-right: 12px;
`;

export const PromoTitle = styled.Text`
  font-family: "Inter-Bold";
  font-size: 18px;
  color: #fff;
  margin-bottom: 4px;
`;

export const PromoDescription = styled.Text`
  font-family: "Inter-Regular";
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
`;

export const PromoMeta = styled.Text`
  font-family: "Inter-Regular";
  font-size: 12px;
  color: #e0e0e0;
`;

export const PromoDiscount = styled.Text`
  font-family: "Inter-Bold";
  font-size: 24px;
  color: #fff;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
`;

// Cards de Provider
export const ProviderCard = styled.TouchableOpacity`
  width: 180px;
  background-color: #fff;
  border-radius: 20px;
  margin-left: 16px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  overflow: hidden;
`;

export const ProviderImage = styled.Image`
  width: 100%;
  height: 140px;
  background-color: #f0f0f0;
`;

export const ProviderInfo = styled.View`
  padding: 12px;
`;

export const ProviderName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 15px;
  color: #0c0c0c;
`;

export const ProviderCategory = styled.Text`
  font-family: "Inter-Regular";
  font-size: 13px;
  color: #6e6e6e;
  margin-top: 2px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
  gap: 4px;
`;

export const RatingText = styled.Text`
  font-family: "Inter-Medium";
  font-size: 13px;
  color: #0c0c0c;
`;

export const ProviderRating = styled.Text`
  font-family: "Inter-Bold";
  font-size: 13px;
  color: #ffb800;
`;

export const ProviderPrice = styled.Text`
  font-family: "Inter-Bold";
  font-size: 15px;
  color: #ff8724;
  margin-top: 8px;
`;

export const ProviderBadge = styled.View<{ backgroundColor?: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#ff8724"};
  padding: 4px 8px;
  border-radius: 8px;
  z-index: 1;
`;

export const BadgeText = styled.Text`
  font-family: "Inter-Bold";
  font-size: 10px;
  color: #fff;
`;

export const CarouselImage = styled.Image<{ height?: number }>`
  width: 92%;
  height: ${({ height }) => (height ? `${height}px` : "190px")};
  border-radius: 20px;
  margin-left: 12px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
`;

// Service Cards
export const ServiceCard = styled.View`
  padding: 16px;
  padding-bottom: 20px;
  border-radius: 20px;
  background-color: #fff;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 5px;
  height: auto;
  justify-content: space-between;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 140px;
  border-radius: 16px;
  background-color: #f0f0f0;
`;

export const ServiceTitle = styled.Text`
  font-size: 17px;
  font-family: "Inter-Bold";
  margin-top: 12px;
  color: #0c0c0c;
  line-height: 22px;
`;

export const ServiceFromText = styled.Text`
  font-size: 12px;
  color: #808080;
  font-family: "Inter-Regular";
  margin-top: 8px;
`;

export const ServicePrice = styled.Text`
  font-size: 18px;
  color: #ff8724;
  font-family: "Inter-Bold";
  margin-top: 2px;
  margin-bottom: 0px;
`;

export const ServiceButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding: 14px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "Inter-Bold";
  text-align: center;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: "Inter-Bold";
  color: #0c0c0c;
  margin-left: 16px;
  margin-bottom: 16px;
`;

// Parceiros
export const PartnerContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 120px;
  margin-left: 16px;
`;

export const PartnerLogo = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: #ff8724;
  background-color: #fff;
`;

export const PartnerName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 14px;
  text-align: center;
  color: #0c0c0c;
`;

// ProviderBadge
export const ProviderNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px; /* 'gap' é uma forma moderna de dar espaçamento */
`;

// NOVO: Um estilo específico para o texto cinza de "avaliações"
export const RatingReviewsText = styled(RatingText)`
  /* Herda o estilo de RatingText */
  color: #999;
  margin-left: 4px; /* Pequeno espaço à esquerda */
`;
