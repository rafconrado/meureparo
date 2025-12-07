import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
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
  background-color: #ffffff;
  width: 85%;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  gap: 15px;

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;

  elevation: 5;
`;

export const ClientText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #df692b;
  margin-bottom: 10px;
`;

export const ProviderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #57b2c5;
  margin-bottom: 10px;
`;
