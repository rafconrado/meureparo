import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0c0c0c;
`;

export const Card = styled.View.attrs({
  style: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
})`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 12px;
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
