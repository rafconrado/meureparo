import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

export const Container = styled.View`
  flex: 1;
  background-color: #57b2c5;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 60px 30px 30px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 70px;
  height: 70px;
  margin-right: 15px;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  color: #fff8ec;
  font-weight: bold;
  flex-shrink: 1;
  line-height: 22px;
`;

export const FormContainer = styled.View`
  flex: 1;
  background-color: #fff8ec;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px 25px;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #57b2c5;
  border-radius: 12px;
  padding: 0 15px;
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255, 248, 236, 0.7)",
})`
  flex: 1;
  color: #fff8ec;
  padding: 16px 12px;
  font-size: 16px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #57b2c5;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export const ButtonText = styled.Text`
  color: #fff8ec;
  font-size: 18px;
  font-weight: bold;
`;

export const PickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #57b2c5;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 0 15px;
`;

export const StyledPicker = styled(Picker)`
  flex: 1;
  color: #fff8ec;
  padding: 12px 0;
`;
