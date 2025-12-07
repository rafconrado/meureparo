import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #57b2c5;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 80px 30px 40px 30px;
  background-color: #57b2c5;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  flex-shrink: 1;
  text-align: center;
  line-height: 26px;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const FormContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  padding: 45px 30px 60px;
  shadow-color: #000;
  shadow-offset: 0px -5px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 15;
`;

export const Subtitle = styled.Text`
  font-size: 28px;
  color: #2c2c2c;
  font-weight: 700;
  margin-bottom: 35px;
  text-align: center;
  letter-spacing: -0.5px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  padding: 0 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 3;
  min-height: 58px;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "#6c757d",
})`
  flex: 1;
  color: #2c2c2c;
  padding: 18px 15px;
  font-size: 16px;
  font-weight: 500;
`;

export const RegisterButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: #57b2c5;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
  shadow-color: #57b2c5;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 8;
  min-height: 58px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const LoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const LoginText = styled.Text`
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
`;

export const LoginLink = styled.Text`
  font-size: 16px;
  color: #57b2c5;
  font-weight: 700;
  text-decoration-line: underline;
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 20px;
`;

export const SwitchLabel = styled.Text`
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
`;
