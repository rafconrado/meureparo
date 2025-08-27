import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #df692b; /* fundo laranja no topo */
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 80px 30px 40px 30px;
  background-color: #df692b; /* garante o laranja também no scroll puxado pra cima */
`;

export const FormContainer = styled.View`
  flex-grow: 1;
  background-color: #fff8ec;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 40px 25px 60px; /* margem inferior maior pra rolar bem */
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 90px;
  height: 90px;
  margin-right: 15px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #fff8ec;
  font-weight: bold;
  flex-shrink: 1;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #df692b;
  border-radius: 12px;
  padding: 0 15px;
  margin-bottom: 15px;
  elevation: 3;
`;

export const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "rgba(255, 255, 255, 0.7)",
})`
  flex: 1;
  color: #fff;
  padding: 15px 10px;
  font-size: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  color: #555;
  text-align: right;
  margin-bottom: 20px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #df692b;
  padding: 15px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 25px;
  elevation: 5;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: #ccc;
`;

export const DividerText = styled.Text`
  color: #888;
  margin: 0 10px;
`;

export const SocialLoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 25px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const SignUpText = styled.Text`
  font-size: 15px;
  color: #666;
`;

export const SignUpLink = styled.Text`
  font-size: 15px;
  color: #df692b;
  font-weight: bold;
  margin-left: 5px;
`;
