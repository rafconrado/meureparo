import styled from "styled-components/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const Container = styled.View`
  flex: 1;
  background-color: #df692b;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${verticalScale(60)}px ${scale(30)}px ${verticalScale(30)}px ${scale(30)}px;
  background-color: #df692b;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  margin-right: ${scale(15)}px;
  border-radius: ${moderateScale(20)}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px; 
  elevation: 8;
`;

export const HeaderTitle = styled.Text`
  font-size: ${moderateScale(18)}px;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 1;
  text-align: center;
  line-height: ${moderateScale(24)}px;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const FormContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-left-radius: ${moderateScale(35)}px;
  border-top-right-radius: ${moderateScale(35)}px;
  padding: ${verticalScale(35)}px ${scale(30)}px;
  shadow-color: #000;
  shadow-offset: 0px -5px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 15;
`;

export const Subtitle = styled.Text`
  font-size: ${moderateScale(24)}px;
  color: #2c2c2c;
  font-weight: 700;
  margin-bottom: ${verticalScale(30)}px;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: ${moderateScale(15)}px;
  padding: 0 ${scale(20)}px;
  margin-bottom: ${verticalScale(15)}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 3;
  min-height: ${verticalScale(52)}px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: #2c2c2c;
  padding: ${verticalScale(15)}px ${scale(15)}px;
  font-size: ${moderateScale(15)}px;
  font-weight: 500;
`;

export const RegisterButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: #df692b;
  border-radius: ${moderateScale(15)}px;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(25)}px;
  shadow-color: #df692b;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 8;
  min-height: ${verticalScale(52)}px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: ${moderateScale(16)}px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(20)}px;
`;

export const LoginText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #6c757d;
  font-weight: 500;
`;

export const LoginLink = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #df692b;
  font-weight: 700;
  text-decoration-line: underline;
`;