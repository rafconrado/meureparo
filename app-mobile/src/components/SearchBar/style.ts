import styled from "styled-components/native";

export const SearchContainer = styled.View`
  flex-direction: row;
  margin: 0 16px 28px 16px;
  background-color: #fff;
  border-radius: 16px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
  shadow-offset: 0px 2px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 16px;
  font-family: "Inter-Regular";
  font-size: 15px;
  color: #0c0c0c;
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: #ff8724;
  padding: 14px 18px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;
