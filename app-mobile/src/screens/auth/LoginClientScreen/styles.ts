import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #df692b;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 80px 30px 40px 30px;
  background-color: #df692b;
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

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  color: #df692b;
  text-align: right;
  margin-bottom: 25px;
  font-weight: 600;
  text-decoration-line: underline;
`;

export const LoginButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: #df692b;
  border-radius: 15px;
  margin-bottom: 30px;
  shadow-color: #df692b;
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

export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 10px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #dee2e6;
`;

export const DividerText = styled.Text`
  color: #6c757d;
  margin: 0 15px;
  font-size: 14px;
  font-weight: 500;
  background-color: #ffffff;
  padding: 0 5px;
`;

export const SocialLoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
`;

export const SocialButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #ffffff;
  border: 2px solid #f1f3f4;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 4;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
`;

export const SignUpLink = styled.Text`
  font-size: 16px;
  color: #df692b;
  font-weight: 700;
  text-decoration-line: underline;
`;
