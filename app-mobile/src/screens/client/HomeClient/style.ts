import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff8ec;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #0c0c0c;
  font-family: "Inter-Bold";
  margin: 16px;
`;

export const Section = styled.View`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const CarouselItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
`;

export const CarouselItemWrapper = styled.View`
  margin-right: 16px;
`;

export const CarouselImage = styled.Image<{ height?: number }>`
  width: 95%;
  height: ${({ height }) => (height ? `${height}px` : "180px")};
  border-radius: 12px;
`;

/* serviços */

export const ServiceCard = styled.View`
  width: 90%;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
`;

export const ServiceFromText = styled.Text`
  font-size: 12px;
  color: #0c0c0c;
  font-family: "Inter-Regular";
  margin-top: 4px;
  position: relative;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

export const ServiceTitle = styled.Text`
  font-size: 14px;
  font-family: "Inter-Bold";
  margin-top: 8px;
`;

export const ServicePrice = styled.Text`
  font-size: 12px;
  color: #57b2c5;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ServiceButton = styled.TouchableOpacity`
  background-color: #57b2c5;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  margin-top: 8px;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
  font-family: "Inter-Bold";
`;

/* parceiros */
export const PartnerContainer = styled.View`
  align-items: center;
`;

export const PartnerLogo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 8px;
`;

export const PartnerName = styled.Text`
  font-family: "Inter-Bold";
`;
