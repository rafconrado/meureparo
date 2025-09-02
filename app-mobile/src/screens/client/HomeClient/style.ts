import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff8ec;
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

export const ServiceCard = styled.View`
  width: 92%;
  padding: 16px;
  padding-bottom: 50px; 
  border-radius: 20px;
  background-color: #fff8ec;
  margin-left: 12px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 5px;
`;

export const ServiceImage = styled.Image`
  width: 100%;
  height: 120px;
  border-radius: 16px;
`;

export const ServiceTitle = styled.Text`
  font-size: 16px;
  font-family: "Inter-Bold";
  margin-top: 10px;
  color: #0c0c0c;
`;

export const ServiceFromText = styled.Text`
  font-size: 12px;
  color: #808080;
  font-family: "Inter-Regular";
  margin-top: 4px;
`;

export const ServicePrice = styled.Text`
  font-size: 15px;
  color: #ff8724;
  font-family: "Inter-Bold";
  margin-top: 2px;
  margin-bottom: 8px;
`;

export const ServiceButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  width: 100%;
`;

export const ServiceButtonText = styled.Text`
  color: #fff;
  font-size: 15px; 
  font-family: "Inter-Bold";
  line-height: 20px;
  text-align: center;
`;

/* parceiros */
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
`;

export const PartnerName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 14px;
  text-align: center;
  color: #0c0c0c;
`;
