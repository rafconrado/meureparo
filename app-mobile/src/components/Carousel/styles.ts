import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: "Inter-Bold";
  margin-bottom: 10px;
  margin-left: 8px;
  color: #0c0c0c;
`;

export const ItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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
