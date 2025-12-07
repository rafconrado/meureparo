import styled from "styled-components/native";
import theme from "../../theme";

export const CardWrapper = styled.View`
  padding: 8px 16px;
  justify-content: center;
`;

export const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 16px;
  overflow: hidden;
  elevation: 4;
  shadow-color: ${theme.COLORS.BLACK};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  border: 1px solid ${theme.COLORS.GRAY_200};
`;

export const ImageWrapper = styled.View`
  position: relative;
  width: 100px;
  height: 100px;
`;

export const ProviderImage = styled.Image`
  width: 100%;
  height: 100%;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
`;

export const BadgeOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  align-items: flex-start;
`;

export const PopularBadge = styled.View`
  background-color: ${theme.COLORS.ORANGE_500};
  flex-direction: row;
  padding: 5px 8px;
  border-radius: 12px;
  align-items: center;
  gap: 3px;
  shadow-color: ${theme.COLORS.ORANGE_500};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 3;
`;

export const PopularText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.XS}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  letter-spacing: 0.3px;
`;

export const DiscountBadge = styled.View`
  background-color: ${theme.COLORS.ORANGE_500};
  padding: 6px 10px;
  border-radius: 10px;
  align-items: center;
  shadow-color: ${theme.COLORS.ORANGE_500};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 3;
  border: 1.5px solid ${theme.COLORS.WHITE};
`;

export const DiscountText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.XS}px;
  font-family: ${theme.FONT_FAMILY.EXTRA_BOLD};
  letter-spacing: 0.2px;
`;

export const FavButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.85);
  justify-content: center;
  align-items: center;
  border: 1px solid ${theme.COLORS.WHITE};
  shadow-color: ${theme.COLORS.BLACK};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.15;
  shadow-radius: 3px;
  elevation: 2;
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 12px 14px;
  justify-content: space-between;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const ProviderName = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.BLACK};
  letter-spacing: -0.3px;
  flex: 1;
`;

export const ProviderSpecialty = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  color: #7a7a7a;
  margin-top: 4px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  letter-spacing: -0.2px;
`;

export const FooterRow = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  background-color: ${theme.COLORS.PRIMARY};
  padding: 5px 10px;
  border-radius: 10px;
  align-self: flex-start;
  border: 1px solid ${theme.COLORS.ORANGE_300};
`;

export const RatingText = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.ORANGE_500};
  letter-spacing: -0.2px;
`;

export const ReviewCount = styled.Text`
  font-size: ${theme.FONT_SIZE.XS}px;
  color: ${theme.COLORS.ORANGE_600};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;
