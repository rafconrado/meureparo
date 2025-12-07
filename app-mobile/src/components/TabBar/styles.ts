import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLORS = {
  ACTIVE: "#57B2C5",
  INACTIVE: "#0C0C0C",
  BACKGROUND: "#FFF",
  BORDER: "#D9D9D9",
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: 10px;
  background-color: ${COLORS.BACKGROUND};
  border-top-width: 1px;
  border-color: ${COLORS.BORDER};
  width: ${SCREEN_WIDTH}px;
`;

export const TabButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

export const Icon = styled.View`
  margin-bottom: -2px;
`;

export const Label = styled.Text<{ isActive: boolean }>`
  font-size: 12px;
  font-family: "Inter-Bold";
  color: ${({ isActive }) => (isActive ? COLORS.ACTIVE : COLORS.INACTIVE)};
`;
