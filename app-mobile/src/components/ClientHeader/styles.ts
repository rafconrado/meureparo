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
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const AvatarButton = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;
