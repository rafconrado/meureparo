import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ServiceCard = styled.View`
  padding: 16px;
  border-radius: 24px;
  background-color: #fff;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
  justify-content: space-between;
`;

export const VerifiedBadge = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 4px;
  elevation: 2;
`;

export const ImagePlaceholder = styled.View`
  width: 100%;
  height: 140px;
  background-color: #f0f0f0;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 140px;
  border-radius: 16px;
  background-color: #f0f0f0;
  margin-bottom: 12px;
`;

export const ServiceTitle = styled.Text`
  font-size: 18px;
  font-family: "Inter-Bold";
  color: #0c0c0c;
  line-height: 24px;
  letter-spacing: -0.3px;
  margin-top: 4px;
`;

export const ProviderCategory = styled.Text`
  font-family: "Inter-Regular";
  font-size: 13px;
  color: #6e6e6e;
  margin-top: 2px;
`;

export const RatingWrapper = styled.View`
  margin-top: 6px;
  margin-bottom: 4px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const RatingText = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 13px;
  color: #0c0c0c;
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
  margin-top: 2px;
  letter-spacing: -0.5px;
`;

export const ServiceButton = styled(TouchableOpacity)`
  background-color: #ff8724;
  padding: 14px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 100%;
  elevation: 2;
  shadow-color: #ff8724;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "Inter-Bold";
  text-align: center;
`;
