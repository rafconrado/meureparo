import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.85;

export const PromoCard = styled(LinearGradient)`
  width: ${CARD_WIDTH}px;
  min-height: 200px;
  padding: 20px;
  border-radius: 24px;
  elevation: 8;
  shadow-color: #ff8724;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  shadow-offset: 0px 6px;
`;

export const PromoContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const PromoInfo = styled.View`
  flex: 1;
  flex-shrink: 1;
  min-width: 0;
`;

export const PromoTitle = styled.Text`
  font-family: "Inter-Bold";
  font-size: 19px;
  color: #ffffff;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  flex-wrap: wrap;
`;

export const PromoDescription = styled.Text`
  font-family: "Inter-Regular";
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 10px;
  line-height: 19px;
  letter-spacing: 0.2px;
  flex-wrap: wrap;
`;

export const PromoMeta = styled.Text`
  font-family: "Inter-Medium";
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 10px;
  align-self: flex-start;
  flex-wrap: wrap;
  max-width: 100%;
`;

export const PromoDiscount = styled.Text`
  font-family: "Inter-Bold";
  font-size: 32px;
  color: #ffffff;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  letter-spacing: -1px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.3);
  min-width: 80px;
  text-align: center;
`;

export const PromoCoupon = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 6px 10px;
  border-radius: 10px;
  align-self: flex-start;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 1);
  border-style: dashed;
`;

export const CouponIcon = styled.Text`
  font-size: 14px;
  margin-right: 5px;
`;

export const CouponCode = styled.Text`
  font-family: "Inter-Bold";
  font-size: 12px;
  color: #ff6b2c;
  letter-spacing: 0.8px;
`;
