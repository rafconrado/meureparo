import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0c0c0c;
`;

export const Card = styled.View`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 12px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
  margin-bottom: 30px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 10px;
`;

export const Value = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #0c0c0c;
  padding: 10px 0;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  color: #0c0c0c;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 8px 0;
  margin-bottom: 5px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #df692b;
  padding: 15px;
  border-radius: 12px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
