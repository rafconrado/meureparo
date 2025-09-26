import styled from "styled-components/native";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  width: 100%;
  background-color: #57b2c5;
  padding: ${Platform.OS === "ios" ? getStatusBarHeight() + 30 : 30}px 20px 30px
    20px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvatarButton = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  border: 2px solid #ffffff;
`;

export const TextContainer = styled.View`
  margin-left: 15px;
`;

export const Greeting = styled.Text`
  color: #f0f2f5;
  font-size: 16px;
  font-weight: 400;
`;

export const UserName = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 8px;
`;
