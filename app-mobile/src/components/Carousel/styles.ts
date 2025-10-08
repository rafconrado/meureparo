import styled from "styled-components/native";

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
