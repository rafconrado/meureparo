import styled from "styled-components/native";
import { StatusBar, Platform } from "react-native";

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export const Container = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${statusBarHeight + 12}px 16px 20px;  
  min-height: 64px;
  background-color: #fff8ec;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const AvatarButton = styled.TouchableOpacity`
  margin-bottom: 6px;
  margin-left: 22px;
`;

export const SearchButton = styled.TouchableOpacity`
  margin-right: 22px;
  margin-bottom: 6px;
`;
