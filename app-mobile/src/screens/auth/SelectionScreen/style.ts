import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffffff;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 40px;
`;

export const OptionCard = styled.View`
  background-color: #ffffffff;
  width: 85%;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  /* Sombra para iOS */
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.1;
  shadow-radius: 8px;

  /* Sombra para Android */
  elevation: 5;
`;

export const ClientText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #df692b;
`;

export const ProviderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #57b2c5;
`;