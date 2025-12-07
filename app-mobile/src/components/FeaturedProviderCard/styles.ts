import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ProviderCard = styled(TouchableOpacity)`
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

export const ProviderNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
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
