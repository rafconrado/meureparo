import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 15px; 
  min-height: 64px;
  background-color: #fff8ec;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const AvatarButton = styled.TouchableOpacity``;

export const SearchButton = styled.TouchableOpacity``;
