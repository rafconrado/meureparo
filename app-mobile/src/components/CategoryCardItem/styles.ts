import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const CategoryCard = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  margin-bottom: 16px;
  margin-horizontal: 4px;
`;

export const CategoryIcon = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: #f3f4f6;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
`;

export const CategoryName = styled.Text`
  font-family: "Inter-SemiBold";
  font-size: 13px;
  color: #0c0c0c;
  text-align: center;
  line-height: 18px;
`;
