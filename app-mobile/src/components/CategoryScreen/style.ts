import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f0f2f5;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  flex: 1;
  text-align: center;
  margin: 0 8px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 16px;
`;
