import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ServiceCardContainer = styled.View`
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

export const ServiceButton = styled(TouchableOpacity)`
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
