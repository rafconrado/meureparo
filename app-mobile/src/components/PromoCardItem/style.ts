import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

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
