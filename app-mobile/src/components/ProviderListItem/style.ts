import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 16px;
  elevation: 4; /* Sombra para Android */
  shadow-color: #000; /* Sombra para iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ProviderImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  margin-left: 12px;
  justify-content: center;
`;

export const ProviderName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const ProviderSpecialty = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const RatingText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-left: 4px;
`;

export const ReviewCount = styled.Text`
  font-size: 12px;
  color: #888;
  margin-left: 6px;
`;

export const DiscountBadge = styled.View`
  position: absolute;
  top: -5px;
  right: 10px;
  background-color: #ff3b30;
  padding: 4px 8px;
  border-radius: 15px;
  transform: rotate(10deg);
`;

export const DiscountText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;
