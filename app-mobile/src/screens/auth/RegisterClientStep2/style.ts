import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export const Container = styled.View`
  flex: 1;
  background-color: #df692b;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${verticalScale(60)}px ${scale(30)}px ${verticalScale(30)}px ${scale(30)}px;
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
  min-height: ${verticalScale(52)}px;
  elevation: 3;
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

export const PickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: ${moderateScale(15)}px;
  padding-left: ${scale(20)}px;
  margin-bottom: ${verticalScale(15)}px;
  min-height: ${verticalScale(52)}px;
  elevation: 3;
`;

export const StyledPicker = styled(Picker)`
  flex: 1;
  color: #2c2c2c;
`;

export const RegisterButton = styled.TouchableOpacity`
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
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: ${moderateScale(16)}px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;