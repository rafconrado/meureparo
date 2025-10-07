import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

// ============= CORES DA IDENTIDADE VISUAL =============
// Primary: #FF8724 (Laranja vibrante)
// Background: #F8F9FA (Cinza claro)
// Text Primary: #0C0C0C (Preto suave)
// Text Secondary: #6E6E6E (Cinza médio)
// White: #FFFFFF
// Accent: #FFB800 (Amarelo dourado para ratings)

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

// ============= HEADER =============
export const Title = styled.Text`
  font-size: 32px;
  color: #0c0c0c;
  font-family: "Inter-Bold";
  margin: 32px 16px 4px 16px;
  line-height: 40px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #6e6e6e;
  font-family: "Inter-Regular";
  margin: 0 16px 24px 16px;
  line-height: 24px;
`;

export const Section = styled.View`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-family: "Inter-Bold";
  color: #0c0c0c;
  margin-left: 16px;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`;

// ============= BARRA DE PESQUISA =============
export const SearchContainer = styled.View`
  flex-direction: row;
  margin: 0 16px 28px 16px;
  background-color: #fff;
  border-radius: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  font-family: "Inter-Regular";
  font-size: 15px;
  color: #0c0c0c;
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding: 14px 18px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;

// ============= CATEGORIAS =============
export const CategoryCard = styled.TouchableOpacity`
  align-items: center;
  margin-right: 16px;
  width: 90px;
`;

export const CategoryIcon = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: #f3f4f6;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

export const CategoryName = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 13px;
  color: #0c0c0c;
  text-align: center;
  line-height: 18px;
`;

// ============= CARDS DE PROMOÇÃO =============
export const PromoCard = styled(LinearGradient)`
  width: 320px;
  margin-right: 16px;
  padding: 24px;
  border-radius: 24px;
  elevation: 6;
  shadow-color: #ff8724;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
`;

export const PromoContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PromoInfo = styled.View`
  flex: 1;
  margin-right: 16px;
`;

export const PromoTitle = styled.Text`
  font-family: "Inter-Bold";
  font-size: 20px;
  color: #fff;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
`;

export const PromoDescription = styled.Text`
  font-family: "Inter-Regular";
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 10px;
  line-height: 22px;
`;

export const PromoMeta = styled.Text`
  font-family: "Inter-Medium";
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
`;

export const PromoDiscount = styled.Text`
  font-family: "Inter-Bold";
  font-size: 28px;
  color: #fff;
  padding: 10px 16px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  letter-spacing: -0.5px;
`;

// ============= CARDS DE PROVIDER =============
export const ProviderCard = styled.TouchableOpacity`
  width: 190px;
  background-color: #fff;
  border-radius: 24px;
  margin-left: 16px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  overflow: hidden;
`;

export const ProviderImage = styled.Image`
  width: 100%;
  height: 150px;
  background-color: #f0f0f0;
`;

export const ProviderInfo = styled.View`
  padding: 14px;
`;

export const ProviderName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 16px;
  color: #0c0c0c;
  letter-spacing: -0.3px;
`;

export const ProviderCategory = styled.Text`
  font-family: "Inter-Regular";
  font-size: 13px;
  color: #6e6e6e;
  margin-top: 4px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  gap: 6px;
`;

export const RatingText = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 13px;
  color: #0c0c0c;
`;

export const ProviderRating = styled.Text`
  font-family: "Inter-Bold";
  font-size: 13px;
  color: #ffb800;
`;

export const RatingReviewsText = styled(RatingText)`
  color: #999;
  font-family: "Inter-Regular";
  margin-left: 2px;
`;

export const ProviderPrice = styled.Text`
  font-family: "Inter-Bold";
  font-size: 16px;
  color: #ff8724;
  margin-top: 10px;
  letter-spacing: -0.2px;
`;

export const ProviderBadge = styled.View<{ backgroundColor?: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor || "#ff8724"};
  padding: 6px 10px;
  border-radius: 10px;
  z-index: 1;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

export const BadgeText = styled.Text`
  font-family: "Inter-Bold";
  font-size: 11px;
  color: #fff;
  letter-spacing: 0.3px;
`;

export const ProviderNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

// ============= CAROUSEL =============
export const CarouselImage = styled.Image<{ height?: number }>`
  width: 92%;
  height: ${({ height }) => (height ? `${height}px` : "200px")};
  border-radius: 24px;
  margin-left: 12px;
  elevation: 6;
  shadow-color: #000;
  shadow-opacity: 0.12;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
`;

// ============= SERVICE CARDS =============
export const ServiceCard = styled.View`
  padding: 18px;
  padding-bottom: 20px;
  border-radius: 24px;
  background-color: #fff;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  height: auto;
  justify-content: space-between;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 18px;
  background-color: #f0f0f0;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  font-family: "Inter-Bold";
  margin-top: 14px;
  color: #0c0c0c;
  line-height: 24px;
  letter-spacing: -0.3px;
`;

export const ServiceFromText = styled.Text`
  font-size: 13px;
  color: #808080;
  font-family: "Inter-Regular";
  margin-top: 8px;
`;

export const ServicePrice = styled.Text`
  font-size: 20px;
  color: #ff8724;
  font-family: "Inter-Bold";
  margin-top: 4px;
  margin-bottom: 0px;
  letter-spacing: -0.5px;
`;

export const ServiceButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
  elevation: 2;
  shadow-color: #ff8724;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: "Inter-Bold";
  text-align: center;
  letter-spacing: 0.2px;
`;

// ============= PARCEIROS =============
export const PartnerContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 110px;
  margin-left: 16px;
`;

export const PartnerLogo = styled.Image`
  width: 85px;
  height: 85px;
  border-radius: 42.5px;
  margin-bottom: 12px;
  border-width: 2.5px;
  border-color: #ff8724;
  background-color: #fff;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
`;

export const PartnerName = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 13px;
  text-align: center;
  color: #0c0c0c;
  line-height: 18px;
`;