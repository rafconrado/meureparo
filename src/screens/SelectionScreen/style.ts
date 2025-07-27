import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff8ec;
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

export const OptionCard = styled.View({
  backgroundColor: "#fff8ec",
  width: "85%",
  padding: 25,
  marginBottom: 20,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 5,

  gap: 15,
});

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
